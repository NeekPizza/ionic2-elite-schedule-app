import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import { EliteApi, UserSettings } from '../../app/shared/shared';

import * as _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetail {

  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any;
  tourneyData: any;
  teamStanding: any;
  useDateFilter: boolean = false;
  isFollowing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    public userSettings: UserSettings,){
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetail');
  }

  ionViewWillLoad(){
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                  .value();
    this.teamStanding = _.find(this.tourneyData.standings,{ 'teamId': this.team.id})
    this.allGames = this.games;
    this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if(team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push('Game', sourceGame);
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? "primary" : "danger";
  }

  dateChanged(){
    console.log(this.useDateFilter)
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteTeam(this.team);
              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() =>{
      refresher.complete();
      this.ionViewWillLoad();
    })
  }

}

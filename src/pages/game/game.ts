import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {

  game: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
      this.game = this.navParams.data;
      this.game.gameTime = Date.parse(this.game.time);

    }

  ionViewDidLoad() {

  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push('TeamHome',team);
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }

  goToMap(){
    this.navCtrl.push('Map', this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }

}

import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { EliteApi, UserSettings } from '../../app/shared/shared';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeams {

  favorites: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingController: LoadingController,
    private eliteApi: EliteApi,
    private userSettings: UserSettings) {
  }

  goToTournaments(){
    this.navCtrl.push('Tournaments')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MyTeams');
    // this.userSettings.clearAll();
    this.favorites = this.userSettings.getAllFavorites();
  }

  favoriteTapped($event, favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
    .subscribe(t => this.navCtrl.push('TeamHome', favorite.team));
  }



}

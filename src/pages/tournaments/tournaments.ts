import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class Tournaments {

  tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) { }

  itemTapped($event, tourney) {
    this.navCtrl.push('Teams', tourney)
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });
    loader.present().then(() =>{
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      })
    })

    console.log('ionViewDidLoad Tournaments');
    this.eliteApi.getTournaments().then(data => this.tournaments = data);
  }


}

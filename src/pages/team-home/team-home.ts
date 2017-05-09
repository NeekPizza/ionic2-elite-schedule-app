import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHome {

  team: any;
  teamDetailTab = 'TeamDetail';
  standingsTab = 'Standings';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log(this.navParams)
  }

  goHome(){
    // this.navCtrl.push('MyTeams')
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHome');
  }

}

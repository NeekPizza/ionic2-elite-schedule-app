import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';
import * as _ from 'lodash';


@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})

export class Teams {

  teams=[];
  private allTeams: any;
  private allTeamDivisions: any;
  queryText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteAPi: EliteApi,
    private loadingController: LoadingController,) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Teams', this.teams);
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(()=> {
      let selectedTourney = this.navParams.data;
      this.eliteAPi.getTournamentData(selectedTourney.id).subscribe(data =>{
        this.allTeams = data.teams;
        this.allTeamDivisions =
        _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
        .value();
      this.teams = this.allTeamDivisions;
      console.log('division teams', this.teams);
      loader.dismiss();
      });
    });
  }

  ionViewDidLoad(){

  }

  itemTapped($event,team){
    this.navCtrl.push('TeamHome',team)
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td =>{
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if(teams.length){
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams});
      }
    });
    this.teams = filteredTeams
  }

}

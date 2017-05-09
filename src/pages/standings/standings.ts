import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared'
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class Standings {

  allStandings: any[];
  standings: any[];
  divisionFilter = 'division';
  team: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
      console.log('ionViewDidLoad Standings');
      this.team = this.navParams.data;
      let tourneyData = this.eliteApi.getCurrentTourney();
      this.standings = tourneyData.standings;
      console.log(this.standings)
      // this.allStandings =
      // _.chain(this.standings)
      // .groupBy('division')
      // .toPairs()
      // .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      // .value();
      console.log('standings:', this.standings);
      // console.log('allStandings:', this.allStandings);

      this.allStandings = tourneyData.standings;
      this.filterDivision();

  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records){
    if(recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

  ionViewWillLoad() {

  }



}

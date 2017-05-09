import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../app/shared/shared';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class Map {

  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
      let games = this.navParams.data;
      let tourneyData = this.eliteApi.getCurrentTourney();
      let location = tourneyData.locations[games.locationId];

      this.map = {
        lat: location.latitude,
        lng: location.longitude,
        zoom: 12,
        markerLabel: games.location
      };

  }

  ionViewWillEnter() {

  }

  getDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}

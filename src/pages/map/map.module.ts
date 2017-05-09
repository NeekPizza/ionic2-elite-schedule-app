import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Map } from './map';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    Map,
  ],
  imports: [
    IonicPageModule.forChild(Map),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAsYx7nUuwGFyF37BwLHRZn6zfXmpLQcDA'}),

  ],
  exports: [
    Map
  ]
})
export class MapModule {}

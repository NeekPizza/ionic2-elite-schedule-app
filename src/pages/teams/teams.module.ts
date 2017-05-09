import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Teams } from './teams';

@NgModule({
  declarations: [
    Teams,
  ],
  imports: [
    IonicPageModule.forChild(Teams),
  ],
  exports: [
    Teams
  ]
})
export class TeamsModule {}

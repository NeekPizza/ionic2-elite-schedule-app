import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamDetail } from './team-detail';

@NgModule({
  declarations: [
    TeamDetail,
  ],
  imports: [
    IonicPageModule.forChild(TeamDetail),
  ],
  exports: [
    TeamDetail
  ]
})
export class TeamDetailModule {}

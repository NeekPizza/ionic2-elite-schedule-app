import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSettings {


  constructor(
    private events: Events,
    public storage: Storage

  ) {}

  favoriteTeam(team, tournamentId, tournamentName){
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    this.storage.set(team.id, JSON.stringify(item)).then(() => {
      this.events.publish('favorites:changed');
    });
  }

  unfavoriteTeam(team){
    this.storage.remove(team.id);
    this.events.publish('favorites:changed');

  }

  isFavoriteTeam(teamId){
    return this.storage.get(teamId).then(value => value ? true: false);
  }

  getAllFavorites(){
    let results = [];
    this.storage.forEach((value, key, index) => {
       results.push(JSON.parse(value))
   });
   return results;
  }

  clearAll(){
    this.storage.clear();
  }

}

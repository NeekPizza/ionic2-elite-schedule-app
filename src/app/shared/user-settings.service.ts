import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import * as _ from 'lodash';

@Injectable()
export class UserSettings {


  constructor(
    private events: Events,
    // private sqlite: SQLite,
    public storage: Storage

  ) {

    // this.sqlite.create({
    //   name: 'data.db',
    //   location: 'default'
    // }).then((db: SQLiteObject) => {
    //   console.log(`HERE IS THE DB: ${db}`)
    // })

  }

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

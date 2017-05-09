import { Component, ViewChild } from '@angular/core';
import { Nav, Events, LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EliteApi, UserSettings } from './shared/shared';
import { HttpModule } from '@angular/http';

@Component({
  templateUrl: 'app.html',
  providers: [
    HttpModule,
    UserSettings,
    EliteApi,
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = 'MyTeams';


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userSettings: UserSettings,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private events: Events,) {
    this.initializeApp();
    this.refreshFavorites();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  refreshFavorites(){
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }

  goHome(){
    this.nav.push('MyTeams')
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push('TeamHome', favorite.team))
  }

  goToTournaments(){
    this.nav.push('Tournaments')
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { EliteApi } from './shared/shared';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // AgmCoreModule.forRoot({apiKey: '{your-api-key-here}'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})
export class AppModule {}

import {Component, Type, provide, ViewChild, enableProdMode} from '@angular/core';
enableProdMode();
import {Platform, ionicBootstrap, Storage, SqlStorage, Nav, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';
import {StudentInfoService} from './providers/student-info-service/student-info-service';
import {GlobalOverlayProvider} from './providers/global-overlay-provider/global-overlay-provider';
import {GlobalObjectProvider} from './providers/global-object-provider/global-object-provider';
import {ErrorHandler} from './providers/error-handler/error-handler';
import {PodcastService} from './providers/podcast-service/podcast-service';
import {EventService} from './providers/event-service/event-service';

import {HomePage} from './pages/home/home';
import {EventsPage} from './pages/events/events';
import {PodcastPage} from './pages/podcast/podcast';
import {EventRegPage} from './pages/register/register';
import {SoundBar} from './pages/soundbar/soundbar';
// https://angular.io/docs/ts/latest/api/core/Type-interface.html



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  // templateUrl: 'build/app.html',
  //  providers: []
  //providers:  [provide(AudioProvider,  { useFactory: AudioProvider.factory })] // or use [WebAudioProvider] to force HTML5 Audio
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  // rootPage: any = HomePage;
  rootPage: any = TabsPage;
  pages: Array<{ title: string, component: any }>;
  navPages: any;
  storage: Storage = null;


  constructor(platform: Platform, public studentInfoService: StudentInfoService, public globalObjectProvider: GlobalObjectProvider, public globalOverlayProvider: GlobalOverlayProvider, public audioProvider: AudioProvider, public soundBar: SoundBar, public errorHandler: ErrorHandler) {

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Register', component: EventRegPage },
      { title: 'Podcast', component: PodcastPage },
      { title: 'Events', component: EventsPage },
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.storage = new Storage(SqlStorage);
      this.createTable();
      this.globalObjectProvider.loadPodcasts();
      this.globalObjectProvider.loadEvents();
    });

  }

  ngOnInit() {

  }

  createTable() {
    this.storage.query('CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, phone TEXT, year TEXT, gender TEXT, registeredevents TEXT)').then((data) => {
      console.log("STUDENT TABLE CREATED -> " + JSON.stringify(data.res));
    }, (error) => {
      console.log("STUDENT Table creation ERROR -> " + JSON.stringify(error.err));
    });
    this.studentInfoService.loadStudentInfo();
  }


}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(MyApp, [provide(AudioProvider, { useFactory: AudioProvider.factory }), StudentInfoService, GlobalOverlayProvider, SoundBar, ErrorHandler, GlobalObjectProvider, PodcastService, EventService], {
  // tabbarPlacement: 'bottom'
});

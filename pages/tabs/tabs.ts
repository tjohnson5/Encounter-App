import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {PodcastPage} from '../podcast/podcast';
import {EventRegPage} from '../register/register';
import {InAppBrowser} from 'ionic-native';
import {SoundBar} from '../soundbar/soundbar';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
   directives: [SoundBar],
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  HomeRoot: any = HomePage;
  EventsRoot: any = EventsPage;
  PodcastRoot: any = PodcastPage;
  EventRegRoot: any = EventRegPage;

  openURL(url){
      InAppBrowser.open(url,'_system');
  }
}

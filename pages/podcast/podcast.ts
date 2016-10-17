import { Page } from 'ionic-angular';
import {Component} from "@angular/core";
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {PodcastService} from '../../providers/podcast-service/podcast-service';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import {AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider} from 'ionic-audio/dist/ionic-audio';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {GlobalObjectProvider} from '../../providers/global-object-provider/global-object-provider';
import {ErrorHandler} from '../../providers/error-handler/error-handler';

/*
  Generated class for the PodcastPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/podcast/podcast.html',
  directives: [AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent],
  // providers: [PodcastService],
})
export class PodcastPage {
  public podcasts: any;
  myTracks: any[];
  allTracks: any[];
  loading: any;

  constructor(public nav: NavController, public podcastService: PodcastService, public _audioProvider: AudioProvider, public loadingCtrl: LoadingController, public globalOverlayProvider: GlobalOverlayProvider, public globalObjectProvider: GlobalObjectProvider, public errorHandler: ErrorHandler, private navParams: NavParams) {
    this.nav = nav;
    this._audioProvider = _audioProvider;
    this._audioProvider.tracks.pop[0];

  }
ngOnInit(){
  //called after the constructor and called  after the first ngOnChanges()
  this.doLoad();
}
ionViewWillEnter(){
    if(this.globalObjectProvider.playFirstPodcast == true){
        setTimeout(() => {
          this.play(0);
        }, 2000);
        this.globalObjectProvider.playFirstPodcast = false;
    }
}

doRefresh() {
  this.doLoad();
  this.nav.setRoot(PodcastPage);
  // this.nav.setRoot(EventRegPage);
}
  //
  // presentLoadingDefault() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Loading Podcast...'
  //   });
  //
  //   this.loading.present();
  //
  //   setTimeout(() => {
  //     this.loading.dismiss();
  //   }, 5000);
  // }

  // presentLoadingMessage(message) {
  //   this.loading = this.loadingCtrl.create({
  //     content: message
  //   });
  //
  //   this.loading.present();
  //
  //   setTimeout(() => {
  //       this.loading.dismiss();
  //   }, 20000);
  // }

  doLoad() {
      this.globalOverlayProvider.presentLoadingMessage("Loading Podcast...");
      this.globalObjectProvider.loadPodcasts();
      this.podcasts = this.globalObjectProvider.getPodcastsObject();
  }

  // loadPodcasts() {
  //   this.podcastService.load()
  //     .then(data => {
  //       console.log(data);
  //       this.podcasts = data.map(function(post) {
  //         // The .map lets me take the original data and map it to the format the audio player wants
  //         return {
  //           title: post.title,
  //           date: post.pubDate,
  //           description: post.description,
  //           src: post.enclosure.url
  //         }
  //       });
  //       console.log(this.podcasts);
  //       this.globalOverlayProvider.dismissLoading();
  //     }, (error) => {
  //       //if contains Error: timeout, handle
  //       console.log(error)
  //       this.globalOverlayProvider.dismissLoading();
  //     });
  // }

  trackIsLoading(index) {
    return this._audioProvider.tracks[index].isLoading;
  }
  trackIsPlaying(index) {
    return this._audioProvider.tracks[index].isPlaying;
  }
  trackHasError(index) {
    return this._audioProvider.tracks[index].error != null;
  }

  toggle(index) {
    if (this._audioProvider.tracks[index].isPlaying) {
      this._audioProvider.pause(index);
    } else {
      this._audioProvider.pause();
      this._audioProvider.play(index);
    }
  }

  pause(index){
      this._audioProvider.pause();
  }

  play(index){
      this._audioProvider.pause();
      this._audioProvider.play(index);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}

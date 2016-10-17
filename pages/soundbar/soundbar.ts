import {Component, } from "@angular/core";
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider, IAudioTrack} from 'ionic-audio/dist/ionic-audio';

@Component({
    selector: 'soundbar',
    template: `
    <ion-footer *ngIf="_audioProvider.current != null">
        <ion-toolbar no-border id="theSoundbar">
            <ion-title>
                {{_audioProvider.tracks[_audioProvider.current].title}}
            </ion-title>
            <ion-buttons start>
                <button (click)="toggle()" [disabled]="trackHasError() || trackIsLoading()">
                    <ion-icon name="pause" *ngIf="trackIsPlaying()&& !trackIsLoading()"></ion-icon>
                    <ion-icon name="play" *ngIf="!trackIsPlaying()&& !trackIsLoading()"></ion-icon>
                    <ion-spinner *ngIf="trackIsLoading() && !trackHasError()"></ion-spinner>
                </button>
            </ion-buttons>
        </ion-toolbar>
    </ion-footer>
    `,

    // <ion-footer *ngIf="_audioProvider.current != null">
    //     <ion-toolbar id="theSoundbar">
    //         <ion-title>
    //             {{_audioProvider.tracks[_audioProvider.current].title}}
    //         </ion-title>
    //         <ion-buttons start>
    //             <button (click)="toggle()" [disabled]="trackHasError() || trackIsLoading()">
    //                 <ion-icon name="pause" *ngIf="trackIsPlaying()&& !trackIsLoading()"></ion-icon>
    //                 <ion-icon name="play" *ngIf="!trackIsPlaying()&& !trackIsLoading()"></ion-icon>
    //                 <ion-spinner *ngIf="trackIsLoading() && !trackHasError()"></ion-spinner>
    //             </button>
    //         </ion-buttons>
    //     </ion-toolbar>
    // </ion-footer>


    //<audio-track-progress-bar duration progress [audioTrack]="_audioProvider.tracks[_audioProvider.current]."></audio-track-progress-bar>
})
export class SoundBar {
    time: Date;
    audioTrack: IAudioTrack;
    theHeight:any;


    constructor(public _audioProvider: AudioProvider) {
        var currentTrackIndex = this._audioProvider.current;
        this.audioTrack = this._audioProvider.tracks[this._audioProvider.current];
    }

    ngAfterViewChecked(){
        this.theHeight = document.getElementById("tab-t0-0").clientHeight;
    }

    trackIsLoading() {
        if(this._audioProvider.current != null){
            return this._audioProvider.tracks[this._audioProvider.current].isLoading;
        }else{
            return false;
        }
    }
    trackIsPlaying() {
        if(this._audioProvider.current != null){
            return this._audioProvider.tracks[this._audioProvider.current].isPlaying;
        }else{
            return false;
        }
    }
    trackHasError() {
        if(this._audioProvider.current != null){
            return this._audioProvider.tracks[this._audioProvider.current].error != null;
        }else{
            return false;
        }

    }
    getTrack(){
        // if(this._audioProvider.current != null){
            return this._audioProvider.tracks[this._audioProvider.current];
        // }else{
        //     return null;
        // }
    }

    toggle() {
      if (this._audioProvider.tracks[this._audioProvider.current].isPlaying) {
        this._audioProvider.pause(this._audioProvider.current);
      } else {
        this._audioProvider.pause();
        this._audioProvider.play(this._audioProvider.current);
      }
    }
}

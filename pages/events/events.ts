import { Page } from 'ionic-angular';
import {Component} from "@angular/core";
import { NavController, LoadingController } from 'ionic-angular';
import {EventService} from '../../providers/event-service/event-service';
import {Http, Headers} from '@angular/http';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {GlobalObjectProvider} from '../../providers/global-object-provider/global-object-provider';
import {ErrorHandler} from '../../providers/error-handler/error-handler';


/*
  Generated class for the EventsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/events/events.html',
  providers: [EventService],
})

export class EventsPage {

  public events: any;
  loading: any;

  constructor(private nav: NavController, public eventService: EventService, public loadingCtrl: LoadingController, public globalOverlayProvider: GlobalOverlayProvider, public globalObjectProvider: GlobalObjectProvider, public errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
    this.doLoad();
  }

  doRefresh() {
    this.doLoad();
    this.nav.setRoot(EventsPage);
  }

  // presentLoadingDefault() {
  //     this.loading = this.loadingCtrl.create({
  //         content: 'Loading Events...'
  //     });
  //
  //     this.loading.present();
  //
  //     setTimeout(() => {
  //         this.globalOverlayProvider.dismissLoading();
  //     }, 5000);
  // }
  //
  // presentLoadingMessage(message) {
  //     this.loading = this.loadingCtrl.create({
  //         content: message
  //     });
  //
  //     this.loading.present();
  // }

  doLoad() {
    this.globalOverlayProvider.presentLoadingMessage("Loading events...");
    this.globalObjectProvider.loadEvents();
    this.events = this.globalObjectProvider.getEventsObject();
  }

  // loadEvents() {
  //   this.eventService.load()
  //     .then(data => {
  //       console.log(data);
  //       console.log(data.items);
  //       this.events = data.items.map((resultData) => {
  //         // The .map lets me take the original data and map it to the format the audio player wants
  //
  //         if ('date' in resultData.start) {
  //           var date = resultData.start.date.split("-"); //split yyyy mm dd
  //           var startYear = date[0];
  //           var startMonth = this.globalObjectProvider.monthString(date[1]);
  //           var startDay = date[2];
  //           var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
  //           var startDayWeek = this.globalObjectProvider.dayString(startDateISO.getDay());
  //
  //           return {
  //             link: resultData.htmlLink,
  //             startDate: resultData.start.date,
  //             startYear: startYear,
  //             startMonth: startMonth,
  //             startDay: startDay,
  //             startDayWeek: startDayWeek,
  //             startHour: null,
  //             startMin: null,
  //             startTime: null,
  //             ampm: null,
  //             summary: resultData.summary,
  //             description: resultData.description
  //           }
  //         } else {
  //           var dateTime = resultData.start.dateTime.split("T"); //split date from time
  //           var date = dateTime[0].split("-"); //split yyyy mm dd
  //           var startYear = date[0];
  //           var startMonth = this.globalObjectProvider.monthString(date[1]);
  //           var startDay = date[2];
  //           var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
  //           var startDayWeek = this.globalObjectProvider.dayString(startDateISO.getDay());
  //           var time = dateTime[1].split(":"); //split hh ss etc...
  //           var startHour = this.globalObjectProvider.twelveHr(time[0]);
  //           var ampm = this.globalObjectProvider.AmPm(time[0]);
  //           var startMin = time[1];
  //
  //           return {
  //             link: resultData.htmlLink,
  //             startDate: resultData.start.dateTime,
  //             startYear: startYear,
  //             startMonth: startMonth,
  //             startDay: startDay,
  //             startDayWeek: startDayWeek,
  //             startHour: startHour,
  //             startMin: startMin,
  //             startTime: startHour + ":" + startMin + " " + ampm,
  //             ampm: ampm,
  //             summary: resultData.summary,
  //             description: resultData.description
  //           }
  //         }
  //
  //       });
  //
  //       console.log(this.events);
  //       this.globalOverlayProvider.dismissLoading();
  //
  //     }, (error) => {
  //       //if contains Error: timeout, handle
  //       console.log(error)
  //       this.globalOverlayProvider.dismissLoading();
  //     });
  // }


}

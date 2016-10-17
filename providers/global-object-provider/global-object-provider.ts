import { Injectable, Inject } from '@angular/core';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {AlertController} from 'ionic-angular';
import {PodcastService} from '../../providers/podcast-service/podcast-service';
import {EventService} from '../../providers/event-service/event-service';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GlobalObjectProvider {

    public podcastsObject:any;
    public eventsObject:any;
    private podcastService:any;
    public playFirstPodcast:Boolean;

  constructor(public globalOverlayProvider: GlobalOverlayProvider, @Inject(PodcastService) podcastService: PodcastService, public eventService: EventService){
      this.podcastService = podcastService;
  }

  getEventsObject(){
      return this.eventsObject;
  }

  getPodcastsObject(){
      return this.podcastsObject;
  }


  loadPodcasts() {
    this.podcastService.load()
      .then(data => {
        this.podcastsObject = data.map(function(post) {
          // The .map lets me take the original data and map it to the format the audio player wants
          return {
            title: post.title,
            date: post.pubDate,
            description: post.subtitle,
            src: post.enclosure.url
          }
        });
        this.globalOverlayProvider.dismissLoading();
      }, (error) => {
        this.globalOverlayProvider.dismissLoading();
      });
  }

  loadEvents() {
      this.eventService.load()
        .then(data => {
          this.eventsObject = data.items.map((resultData) => {
            // The .map lets me take the original data and map it to the format the audio player wants

            if ('date' in resultData.start) {
              var date = resultData.start.date.split("-"); //split yyyy mm dd
              var startYear = date[0];
              var startMonth = this.monthString(date[1]);
              var startDay = date[2];
              var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
              var startDayWeek = this.dayString(startDateISO.getDay());

              return {
                link: resultData.htmlLink,
                startDate: resultData.start.date,
                startYear: startYear,
                startMonth: startMonth,
                startDay: startDay,
                startDayWeek: startDayWeek,
                startHour: null,
                startMin: null,
                startTime: null,
                ampm: null,
                summary: resultData.summary,
                description: resultData.description
              }
            } else {
              var dateTime = resultData.start.dateTime.split("T"); //split date from time
              var date = dateTime[0].split("-"); //split yyyy mm dd
              var startYear = date[0];
              var startMonth = this.monthString(date[1]);
              var startDay = date[2];
              var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
              var startDayWeek = this.dayString(startDateISO.getDay());
              var time = dateTime[1].split(":"); //split hh ss etc...
              var startHour = this.twelveHr(time[0]);
              var ampm = this.AmPm(time[0]);
              var startMin = time[1];

              return {
                link: resultData.htmlLink,
                startDate: resultData.start.dateTime,
                startYear: startYear,
                startMonth: startMonth,
                startDay: startDay,
                startDayWeek: startDayWeek,
                startHour: startHour,
                startMin: startMin,
                startTime: startHour + ":" + startMin + " " + ampm,
                ampm: ampm,
                summary: resultData.summary,
                description: resultData.description
              }
            }

          });

          this.globalOverlayProvider.dismissLoading();

        }, (error) => {
          //if contains Error: timeout, handle
          console.log(error)
          this.globalOverlayProvider.dismissLoading();
        });
  }




  //--------------------- num Month to String
  public monthString(num) {
    if (num === "01") { return "January"; }
    else if (num === "02") { return "February"; }
    else if (num === "03") { return "March"; }
    else if (num === "04") { return "April"; }
    else if (num === "05") { return "May"; }
    else if (num === "06") { return "June"; }
    else if (num === "07") { return "July"; }
    else if (num === "08") { return "August"; }
    else if (num === "09") { return "September"; }
    else if (num === "10") { return "October"; }
    else if (num === "11") { return "November"; }
    else if (num === "12") { return "December"; }
  }
  //--------------------- end

  //--------------------- from num to day of week
  dayString(num) {
    if (num == "1") { return "Monday" }
    else if (num == "2") { return "Tuesday" }
    else if (num == "3") { return "Wednesday" }
    else if (num == "4") { return "Thursday" }
    else if (num == "5") { return "Friday" }
    else if (num == "6") { return "Saturday" }
    else if (num == "0") { return "Sunday" }
  }
  //--------------------- end

  //--------------------- From 24h to Am/Pm
  twelveHr(num) {
    if (num <= 12) { num }
    return this.padNum(num - 12);
  }
  //--------------------- end

  //--------------------- From 24h to Am/Pm
  AmPm(num) {
    if (num <= 12) { return "a.m." }
    return "p.m.";
  }
  //--------------------- end

  //--------------------- Add a 0 to numbers
  padNum(num) {
    if (num <= 9) {
      return "0" + num;
    }
    return num;
  }
  //--------------------- end

}

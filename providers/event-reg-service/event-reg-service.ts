import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {ErrorHandler} from '../../providers/error-handler/error-handler';


@Injectable()
export class EventRegService {
  data: any;

  constructor(private http: Http, public globalOverlayProvider: GlobalOverlayProvider, public errorHandler: ErrorHandler) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('http://www.isuencounter.org/wp-json/wp/v2/posts?filter[category_name]=app-event-reg')
        .timeout(20000)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
        err =>{
            console.log(err);
            this.globalOverlayProvider.dismissLoading();
            this.errorHandler.handleHTTPError(err);
        });
    });
  }
}

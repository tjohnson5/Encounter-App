import { Injectable } from '@angular/core';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {AlertController} from 'ionic-angular';


@Injectable()
export class ErrorHandler {

  constructor(public globalOverlayProvider: GlobalOverlayProvider){

  }

  handleHTTPError(error) {
      if(error.status != 200){
          setTimeout(() => {
            this.globalOverlayProvider.presentErrorAlertMessage("The data couldn't be loaded. Bad connection perhaps? Try to reload. Contact Michelle Walker for tech support.")
        }, 1000);
      }
  }

}

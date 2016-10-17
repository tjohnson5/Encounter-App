import { Injectable } from '@angular/core';
import {LoadingController, ToastController, ModalController, Loading, AlertController} from 'ionic-angular';

/*
  Generated class for the GlobalOverlayProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalOverlayProvider {
  loading: any;
  toast: any;
  modal: any;
  alert: any;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController, public alertCtrl: AlertController) {


  }

  presentErrorAlertMessage(message) {
    this.alert = this.alertCtrl.create({
      title: 'Oh snap!',
      subTitle: message,
      buttons: ['Alright']
    });
    this.alert.present();
  }

  presentLoadingMessage(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  }

  dismissLoading() {
      if(this.loading != null){
          this.loading.dismiss();
      }
  }

  presentToastMessage(toastMessage) {
    this.toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 2000,
      position: 'top'
    });

    this.toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    this.toast.present();
  }

  presentModalPage(className) {
    this.modal = this.modalCtrl.create(className);
    this.modal.present();
  }

}

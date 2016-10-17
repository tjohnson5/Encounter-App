import {Component} from "@angular/core";
import {FormControl} from "@angular/forms";
// import {IAudioTrack} from 'ionic-audio/dist/ionic-audio-interfaces';
import {FormBuilder, ControlGroup, Validators, AbstractControl} from '@angular/common';
import {NavController, NavParams, ToastController, ActionSheetController, ViewController, Platform, Storage, SqlStorage, ModalController, Tabs} from 'ionic-angular';
import {AudioProvider} from 'ionic-audio/dist/ionic-audio';
import {EventsPage} from '../events/events';
import {PodcastPage} from '../podcast/podcast';
import {StudentInfoService} from '../../providers/student-info-service/student-info-service';
import {Http, Headers} from '@angular/http';
import {GlobalOverlayProvider} from '../../providers/global-overlay-provider/global-overlay-provider';
import {GlobalObjectProvider} from '../../providers/global-object-provider/global-object-provider';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  platform: Platform;
  http: Http;
  student: any;
  storage: Storage;
  formValues: String;
  public latestPodcast: any;
  public nextEvent: any;

  constructor(private nav: NavController, private studentInfoService: StudentInfoService, platform: Platform, public modalCtrl: ModalController, public globalObjectProvider: GlobalObjectProvider, private tabs:Tabs, public _audioProvider: AudioProvider) {
    this.nav = nav;
    this.studentInfoService = studentInfoService;
    // this.latestPodcast = this.globalObjectProvider.getPodcastsObject();
    // this.nextEvent = this.globalObjectProvider.getEventsObject();
  }
  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
    //Wait a couple seconds, check if the pofile is blank, pop the modal if it is
    setTimeout(() => {
      this.studentInfoService.loadStudentInfo();
      if (this.studentInfoService.getGlobalStudentInfo() == "") {
        this.openModal();
      }
    }, 2000);

    setInterval(() => {
      if (this.globalObjectProvider.getPodcastsObject() != null && this.globalObjectProvider.getEventsObject()) {
        this.latestPodcast = this.globalObjectProvider.getPodcastsObject()[0];
        this.nextEvent = this.globalObjectProvider.getEventsObject()[0];
      }
    }, 1000);

  }

  getTrack(){
      return this.latestPodcast;
  }


switchTabAndPlay(tabIndex) {
    if(this._audioProvider.tracks.length == 0){
        this.globalObjectProvider.playFirstPodcast = true;
    }else{
        this._audioProvider.pause();
        this._audioProvider.play(0);
    }
    this.tabs.select(tabIndex);
}


  openModal() {
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.present();
  }
}


@Component({
  templateUrl: './build/pages/modals/info.html',
  providers: []
})
export class ModalsContentPage {

  platform: Platform;
  http: Http;
  public student: any; // This is the object used on the page
  public genderList: any;
  public yearInSchoolList: any;
  storage: Storage;
  formValues: String;


  studentForm: ControlGroup;
  formBuilder: FormBuilder;

  firstName: AbstractControl;
  lastName: AbstractControl;
  emailAddress: AbstractControl;
  phoneNumber: AbstractControl;
  yearInSchool: AbstractControl;
  gender: AbstractControl;


  constructor(private nav: NavController, private studentInfoService: StudentInfoService, platform: Platform, formBuilder: FormBuilder, http: Http, public viewCtrl: ViewController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public globalOverlayProvider: GlobalOverlayProvider) {

    this.student = {};
    this.http = http;
    this.nav = nav;
    this.platform = platform;
    this.formBuilder = formBuilder;
    this.studentInfoService = studentInfoService;
    this.platform.ready().then(() => {
      this.storage = new Storage(SqlStorage);
    });

  }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'emailAddress': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'yearInSchool': ['', this.validateNotUndefined],
      'gender': ['', this.validateNotUndefined]
    });

    this.firstName = this.studentForm.controls['firstName'];
    this.lastName = this.studentForm.controls['lastName'];
    this.emailAddress = this.studentForm.controls['emailAddress'];
    this.phoneNumber = this.studentForm.controls['phoneNumber'];
    this.yearInSchool = this.studentForm.controls['yearInSchool'];
    this.gender = this.studentForm.controls['gender'];

    this.student = this.studentInfoService.getGlobalStudentInfo();
    console.log(this.student);
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }


  presentToastMessage(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.dismissModal();
    });

    toast.present();
  }

  presentProfileWipeActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Clear all profile data from device? (Not reccommended!)',
      buttons: [
        {
          text: 'Do it',
          role: 'destructive',
          handler: () => {
            this.wipeInfo();
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  saveInfo(formData) {
    if (this.validate()) {
      this.studentInfoService.saveStudentInfo(formData);
      this.presentToastMessage("You information was updated successfully.");
    }
  }

  wipeInfo() {
    this.studentInfoService.clear();
    this.studentInfoService.loadStudentInfo();
    this.presentToastMessage("All profile data has been wiped.");
  }

  validate() {
    if (this.studentForm.valid) {
      return true;
    } else {
      this.globalOverlayProvider.presentErrorAlertMessage("Come on. Please complete the entire form...");
    }
  }

  validateNotUndefined(control: FormControl) {
    if (control.value == "undefined") {
      return {
        validateNotUndefined: {
          valid: false
        }
      };
    } else {
      return null;
    }
  }


}

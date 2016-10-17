import { Injectable } from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';

/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StudentInfoService {
    globalStudentInfo: any;
    student: any;
    storage: Storage;
    formValues: String;
    platform: Platform;
    errorString: String;

    constructor(platform: Platform) {
        this.globalStudentInfo = "";
        this.platform = platform;
        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
        });

    }

    setGlobalStudentInfo(value) {
        this.globalStudentInfo = value;
    }

    getGlobalStudentInfo() {
        return this.globalStudentInfo;
    }

    loadStudentInfo() {
        this.storage.query("SELECT * FROM student").then((data) => {
            //this.student = {};
            if (data.res.rows.length > 0) {
                for (var i = 0; i < data.res.rows.length; i++) {
                    this.setGlobalStudentInfo({
                        firstName: data.res.rows.item(i).firstname,
                        lastName: data.res.rows.item(i).lastname,
                        emailAddress: data.res.rows.item(i).email,
                        phoneNumber: data.res.rows.item(i).phone,
                        yearInSchool: data.res.rows.item(i).year,
                        gender: data.res.rows.item(i).gender,
                        registeredEvents: data.res.rows.item(i).registeredevents
                    });
                    //this.setGlobalStudentInfo(this.student);
                }
            }
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error.err));
        });
    }

    saveStudentInfo(formStudentData) {

        if (this.globalStudentInfo == "") {
            formStudentData.registeredEvents = [0];
            this.insertNewStudentInfoInStorage(formStudentData);
        } else {
            formStudentData.registeredEvents = this.getGlobalStudentInfo().registeredEvents;
            this.updateStudentInfoInStorage(formStudentData);
        }

        this.loadStudentInfo();

        //   this.storage.query("DELETE FROM student").then((data) => {
        //       console.log(JSON.stringify(data.res));
        //   }, (error) => {
        //       console.log("ERROR -> " + JSON.stringify(error.err));
        //   });

        // this.storage.query("INSERT INTO student (firstname, lastname, email, phone, year, gender) VALUES ('Travis', 'Johnson', 'biggtrav05@gmail.com', '309-826-3126', 'Senior', 'Male')").then((data) => {
        //     console.log(JSON.stringify(data.res));
        // }, (error) => {
        //     console.log("ERROR -> " + JSON.stringify(error.err));
        // });

        //   this.storage.query("INSERT INTO student (firstname, lastname, email, phone, year, gender) VALUES ('" + formData.firstName + "', '" + formData.lastName + "', '" + formData.emailAddress + "', '" + formData.phoneNumber + "', '" + formData.yearInSchool + "', '" + formData.gender + "')").then((data) => {
        //       console.log("Insert Success");
        //     //  value = "success";
        //      // this.presentSuccessToast();
        //   }, (error) => {
        //       console.log("ERROR -> " + JSON.stringify(error.err));
        //      // value = "fail";
        //   });
    }

    insertNewStudentInfoInStorage(studentInfo) {
        var queryString = "INSERT INTO student (firstname, lastname, email, phone, year, gender, registeredevents) VALUES ('" + studentInfo.firstName + "', '" + studentInfo.lastName + "', '" + studentInfo.emailAddress + "', '" + studentInfo.phoneNumber + "', '" + studentInfo.yearInSchool + "', '" + studentInfo.gender + "', '" + studentInfo.registeredEvents + "')";

        this.storage.query(queryString).then((data) => {
            console.log("Insert Success");
            //  value = "success";
            // this.presentSuccessToast();
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error.err));
            // value = "fail";
        });
    }

    updateStudentInfoInStorage(studentInfo) {
        var queryString = "UPDATE student SET firstname = '" + studentInfo.firstName + "', lastname = '" + studentInfo.lastName + "', email = '" + studentInfo.emailAddress + "', phone = '" + studentInfo.phoneNumber + "', year = '" + studentInfo.yearInSchool + "', gender = '" + studentInfo.gender + "', registeredevents = '" + studentInfo.registeredEvents + "'";

        this.storage.query(queryString).then((data) => {
            console.log("Update Success");
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error.err));
        });
    }

    clear() {
        this.storage.query("DELETE FROM student").then((data) => {
            console.log(JSON.stringify(data.res));
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error.err));
        });

        this.setGlobalStudentInfo("");
    }

    appendEventID(eventID) {
        var eventArray = [];
        var student = this.getGlobalStudentInfo();
        eventArray = student.registeredEvents.split(",");
        eventArray.push(eventID);
        student.registeredEvents = eventArray;
        this.setGlobalStudentInfo(student);
        this.saveStudentInfoToStorage();
    }

    saveStudentInfoToStorage() {
        this.updateStudentInfoInStorage(this.globalStudentInfo);
        this.loadStudentInfo();
    }

}

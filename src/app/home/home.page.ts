import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date,
  };
 
  selectedDate: Date;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalController: ModalController,
    public httpClient: HttpClient) {

    }

  ngOnInit() {
    // call api functions for events
    this.getEvents();
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    // let start = formatDate(event.startTime, 'medium', this.locale);
    // let end = formatDate(event.endTime, 'medium', this.locale);
 
    // const alert = await this.alertCtrl.create({
    //   header: event.title,
    //   subHeader: event.desc,
    //   message: 'From: ' + start + '<br><br>To: ' + end,
    //   buttons: ['OK'],
    // });
    // alert.present();

    const modal = await this.modalController.create({
      component: CalModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'eventData': event
      }
    });
    return await modal.present();
  }

  getApiEvents() {
    // fetch getEvents  
    return this.httpClient.get(`https://cors-anywhere.herokuapp.com/https://softgetix.com/projects/testApi/getEvents`);
  }

  getEvents() {
    this.getApiEvents()
    .subscribe((value: any) => {
    if (value) {
      // use data coming in value param
      for(let i = 0; i < value.length; i += 1) {
        var startNewDate = new Date(value[i].startDate);
        var startNewTime = new Date (Date.UTC(startNewDate.getFullYear(), startNewDate.getMonth(), startNewDate.getDate()));
        value[i]["startTime"] = startNewTime;
        var endNewDate = new Date(value[i].endDate);
        var endNewTime = new Date (Date.UTC(endNewDate.getFullYear(), endNewDate.getMonth(), endNewDate.getDate()));
        value[i]["endTime"] = endNewTime;
      }
      this.eventSource = value;
      this.myCal.loadEvents();
      console.log(this.eventSource);
    } else {
      // no response
    }
    }, (error) => {
      console.log('error', error);
    });
  }

}

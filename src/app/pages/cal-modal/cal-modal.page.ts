import { Component, AfterViewInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
 
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage {
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };
  eventData: any;
 
  constructor(private modalCtrl: ModalController,
    public navParam: NavParams) { 

    this.eventData = this.navParam.get('eventData');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}

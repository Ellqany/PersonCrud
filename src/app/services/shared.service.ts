import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Output() private showSpinner: EventEmitter<boolean> = new EventEmitter();

  constructor(private _notifier: NotificationsService) { }

  // Event Region
  getSpinner() {
    return this.showSpinner;
  }

  setSpinner(spinner: boolean) {
    this.showSpinner.emit(spinner);
  }

  // Notification Region
  alertDanger(message: string) {
    this._notifier.create('', message, NotificationType.Error, {
      timeOut: 5000,
      position: ['bottom', 'right'],
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'fromRight',
      rtl: false,
    });
  }

  alertSuccess(message: string) {
    this._notifier.create('', message, NotificationType.Success, {
      timeOut: 5000,
      position: ['bottom', 'right'],
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'fromRight',
      rtl: false,
    });
  }

  logError(error: any) {
    console.error(error);
    this.alertDanger('Sorry, something went wrong. Please try again later.');
    this.setSpinner(false);
  }

  generateSalt(lengthOfCode: number) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}

import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSpinner = false;
  private ngUnsubscribe: Subject<boolean | null> = new Subject();

  constructor(private _sharedServ: SharedService) { }

  ngOnInit() {
    this._sharedServ.getSpinner().pipe(takeUntil(this.ngUnsubscribe)).subscribe(model => {
      this.showSpinner = model;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}

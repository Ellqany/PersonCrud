import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { EditPersonComponent } from '../../dialogues/edit-person/edit-person.component';
import { AddPersonComponent } from '../../dialogues/add-person/add-person.component';
import { Person } from '../../models/person.model';

import { PersonService } from '../../services/person.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.scss']
})
export class ListPersonComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  people: Person[] = [];

  constructor(private _personServ: PersonService, private dialog: MatDialog, private _sharedServ: SharedService) {
    this._sharedServ.setSpinner(true);
  }

  ngOnInit(): void {
    this._personServ.getPeople().pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (data) => {
        this.people = data;
        this._sharedServ.setSpinner(false);
      },
      error: (err) => this._sharedServ.logError(err)
    });
  }

  onAddPerson() {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      maxWidth: '800px'
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((dialogResult: Person) => {
      if (dialogResult) {
        this.people.push(dialogResult);
        this._sharedServ.setSpinner(false);
      }
    });
  }

  onEdit(person: Person) {
    const dialogRef = this.dialog.open(EditPersonComponent, {
      maxWidth: '800px',
      data: person,
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((dialogResult: Person) => {
      if (dialogResult) {
        const index = this.people.findIndex((p) => p.id === dialogResult.id);
        if (index > -1) {
          this.people[index] = dialogResult;
        } else {
          this.people.push(dialogResult);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}

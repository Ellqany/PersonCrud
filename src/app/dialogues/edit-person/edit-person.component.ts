import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Md5 } from 'ts-md5/dist/md5';

import { getCountries } from '../../models/countries.model';
import { Person } from '../../models/person.model';

import { PersonService } from '../../services/person.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<number | null> = new Subject();

  countries: string[] = getCountries();
  personOld: Person | null = null;
  todaydate = new Date();
  personForm!: FormGroup;
  personFormSubmitted = false;
  get personFormControls() {
    return this.personForm.controls;
  }

  constructor(
    private _dialogRef: MatDialogRef<EditPersonComponent>, private _personServ: PersonService, @Inject(MAT_DIALOG_DATA) data: Person,
    private _formbuilder: FormBuilder, private _sharedServ: SharedService) {
    this.personOld = data;
  }

  ngOnInit(): void {
    this.personForm = this._formbuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      avatar: [''],
      dob: ['', this.dobValidator],
    });

    this.personForm.setValue({ ... this.personOld });
  }

  onCancel() {
    this._dialogRef.close(null);
  }

  onPersonEdit() {
    this.personFormSubmitted = true;
    if (this.personForm.valid) {
      this._sharedServ.setSpinner(true);
      this._personServ.updatePerson(this.personForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: () => {
          this._sharedServ.alertSuccess('Person data updated successfully');
          this._sharedServ.setSpinner(false);
          this._dialogRef.close(this.personForm.value);
        },
        error: (error) => this._sharedServ.logError(error)
      });
    }
  }

  generateAvatar() {
    const fallback = 'wavatar';

    if (!this.personFormControls['email'].value) {
      return;
    }

    const salt = this._sharedServ.generateSalt(5);

    const emailHash = Md5.hashStr(this.personFormControls['email'].value.trim().toLowerCase() + salt.trim().toLowerCase());
    this.personFormControls['avatar'].setValue(`https://www.gravatar.com/avatar/${emailHash}?d=${fallback}`);
  }

  private dobValidator(control: AbstractControl) {
    if (control.value === '' || control.value === null || control.value === 0 || control.value === " ") {
      return { empty: true };
    }

    const todaydate = new Date();
    const before18 = new Date(todaydate.getFullYear() - 18, todaydate.getMonth(), todaydate.getDate());

    if (before18 < control.value) {
      return { empty: true };
    }

    return null;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}

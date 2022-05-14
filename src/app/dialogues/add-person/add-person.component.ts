import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { Md5 } from 'ts-md5/dist/md5';

import { getCountries } from '../../models/countries.model';

import { PersonService } from '../../services/person.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<number | null> = new Subject();

  countries: string[] = getCountries();
  todaydate = new Date();
  personForm!: FormGroup;
  personFormSubmitted = false;
  get personFormControls() {
    return this.personForm.controls;
  }

  constructor(private _dialogRef: MatDialogRef<AddPersonComponent>, private _personServ: PersonService, private _formbuilder: FormBuilder, private _sharedServ: SharedService) { }

  ngOnInit(): void {
    const before18 = new Date(this.todaydate.getFullYear() - 18, this.todaydate.getMonth(), this.todaydate.getDate());

    this.personForm = this._formbuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      avatar: [''],
      dob: [before18, this.dobValidator],
    });
  }

  onCancel() {
    this._dialogRef.close();
  }

  onPersonAdd() {
    this.personFormSubmitted = true;
    if (this.personForm.valid) {
      this._sharedServ.setSpinner(true);
      if (!this.personFormControls['avatar'].value) {
        this.generateAvatar();
      }

      this._personServ.addPerson(this.personForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: (result) => {
          this._sharedServ.alertSuccess('New person added successfully');
          this._dialogRef.close(result);
        },
        error: (error) => this._sharedServ.logError(error)
      });
    }
  }

  onMailKeyUp(){
    if(!this.personFormControls['avatar'].value){
      this.generateAvatar();
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

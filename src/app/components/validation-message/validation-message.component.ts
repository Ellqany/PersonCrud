import { AbstractControl, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
  @Input() maxLength = 500
  @Input() control: AbstractControl = new FormControl('')
  @Input() isSubmitted = false
  @Input() name = ''
}

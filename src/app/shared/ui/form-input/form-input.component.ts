import {Component, computed, inject, input} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Message} from 'primeng/message';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-form-input',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Message,
    TranslatePipe
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  id = input.required<string>();
  prefix = input.required<string>();
  autocomplete = input<string>('off');
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  label = computed(() => this.prefix() + '.' + this.id());

  controlContainer = inject(ControlContainer, { optional: true });

  get formGroup(): FormGroup {
    return this.controlContainer?.control as FormGroup;
  }

  get formControl(): FormControl {
    return this.formGroup?.get(this.id()) as FormControl;
  }

  getErrorMessage() {
    if (this.formControl.errors?.['required']) return 'This field is required';
    return '';
  }
}

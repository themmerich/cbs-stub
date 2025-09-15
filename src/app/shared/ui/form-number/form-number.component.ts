import {Component, computed, inject, input} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-form-number',
  imports: [
    FloatLabel,
    Message,
    ReactiveFormsModule,
    InputNumber,
    TranslatePipe
  ],
  templateUrl: './form-number.component.html',
  styleUrl: './form-number.component.scss'
})
export class FormNumberComponent {
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

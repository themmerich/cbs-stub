import {Component, effect, input, output} from '@angular/core';
import {FormInputComponent} from '../../../shared/ui/form-input/form-input.component';
import {FormNumberComponent} from '../../../shared/ui/form-number/form-number.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {Posten} from '../../model/posten';

@Component({
  selector: 'app-posten-form',
  imports: [
    FormInputComponent,
    FormNumberComponent,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './posten-form.component.html',
  styleUrl: './posten-form.component.scss'
})
export class PostenFormComponent {
  posten = input<Posten | null>(null);
  submitPosten = output<Posten>();
  cancelPosten = output<void>();

  constructor() {
    effect(() => {
      const posten = this.posten?.();
      if (posten) {
        this.form.reset();
        this.form.patchValue(posten);
      } else {
        this.form.reset();
      }
    });
  }

  public form = new FormGroup({
    aufwand: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    ertrag: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    volumen: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    umsatz: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    kosten: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    anzahl: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    aquisitionsweg: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    erfassungsart: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    gebuehrenart: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    individualprodukt: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    isinNummer: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    ordernummer: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    provisionstyp: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    sparte: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    standardprodukt: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    tarif: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    textschluesselgruppe: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    vpPostenidentifier1: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    vpPostenidentifier2: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    vpPostenidentifier3: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    vpPostenidentifier4: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    vpPostenidentifier5: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    wertpapierkennnummer: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    zuwachsvertrag: new FormControl<string | undefined>(undefined, { nonNullable: true }),
  });

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newPosten: Posten = {
      ...formValue
    };
    this.submitPosten.emit(newPosten);
  }

  onCancel() {
    this.cancelPosten.emit();
  }
}

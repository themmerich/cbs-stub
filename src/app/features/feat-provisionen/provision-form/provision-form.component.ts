import {Component, effect, input, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {Provision} from '../../model/provision';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';

interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-provision-form',
  imports: [
    ReactiveFormsModule,
    Button,
    FloatLabel,
    Select,
    InputText,
    DatePicker
  ],
  templateUrl: './provision-form.component.html',
})
export class ProvisionFormComponent {
  provision = input<Provision>({} as Provision);
  submitProvision = output<Provision>();
  cancelProvision = output<void>();

  constructor() {
    effect(() => {
      const provision = this.provision?.();
      if (provision) {
        this.formGroup.reset();
        this.formGroup.patchValue(provision);
      } else {
        this.formGroup.reset();
      }
    });
  }

  stichtage: Option[]  = [
    { name: '31.01.2025', code: '1' },
    { name: '31.12.2024', code: '2' },
    { name: '30.11.2024', code: '3' }
  ];

  erfassungsarten: Option[] = [
    { name: 'manuell', code: '2' },
    { name: 'geliefert', code: '3' }
  ];

  bezeichnungen: Option[] = [
    { name: 'AVS', code: '2' },
    { name: 'Allianz', code: '3' },
    { name: 'BSH', code: '4' },
    { name: 'DG Hyp', code: '5' },
    { name: 'DIFA', code: '6' },
    { name: 'DZPB LuxCredit', code: '7' },
    { name: 'DZPB Private Banking', code: '8' },
  ];

  neugeschaefte: Option[]  = [
    { name: 'Bestandsgeschäft', code: '1' },
    { name: 'Neugeschäft', code: '2' },
    { name: 'Unbekannt', code: '3' }
  ];

  waehrungen: Option[]  = [
    { name: 'EUR', code: '1' },
    { name: 'USD', code: '2' },
    { name: 'CAD', code: '3' }
  ];

  formGroup = new FormGroup({
    stichtag: new FormControl<string>('', { nonNullable: true }),
    kontonummer: new FormControl<string>('', { nonNullable: true }),
    geschaeftsnummer: new FormControl<string>('', { nonNullable: true }),

    erfassungsart: new FormControl<string>('', { nonNullable: true }),
    bezeichnung: new FormControl<string>('', { nonNullable: true }),
    kundennummer: new FormControl<string>('', { nonNullable: true }),

    beraternummer: new FormControl<string>('', { nonNullable: true }),
    neugeschaeft: new FormControl<string>('', { nonNullable: true }),
    vertriebsweg: new FormControl<string>('', { nonNullable: true }),

    waehrung: new FormControl<string>('', { nonNullable: true }),
    vpProduktinfo1: new FormControl<string>('', { nonNullable: true }),
    vpProduktinfo2: new FormControl<string>('', { nonNullable: true }),

    vpProduktinfo3: new FormControl<string>('', { nonNullable: true }),
    vpProduktinfo4: new FormControl<string>('', { nonNullable: true }),
    vpProduktinfo5: new FormControl<string>('', { nonNullable: true }),
  });

  onSubmit() {
    const formValue = this.formGroup.getRawValue();
    const newProvision: Provision = {
      id: undefined,
      ...formValue,
      postenaufwand: 0,
      postenertrag: 0,
      volumen: 0,
      umsatz: 0,
      postenanzahl: 0,
      postenkosten: 0,
      posten: []
    };
    this.submitProvision.emit(newProvision);
  }

  onCancel() {
    this.cancelProvision.emit();
  }
}

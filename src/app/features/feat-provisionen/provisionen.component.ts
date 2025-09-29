import {Component, inject, signal} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent, themeBalham} from 'ag-grid-enterprise';
import {Provision} from '../model/provision';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Fieldset} from 'primeng/fieldset';
import {Router} from '@angular/router';
import {ProvisionStore} from '../data/provision.store';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Select} from 'primeng/select';
import {ProvisionEditComponent} from './provision-edit/provision-edit.component';
import {ProvisionCreate} from './provision-create/provision-create';

interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-provisionen',
  imports: [
    AgGridAngular,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Fieldset,
    Button,
    Toolbar,
    Select,
    ProvisionEditComponent,
    ProvisionCreate
  ],
  templateUrl: './provisionen.component.html',
  styleUrl: './provisionen.component.scss'
})
export class ProvisionenComponent {
  store = inject(ProvisionStore);
  router = inject(Router);

  showEditDialog = signal(false);
  showCreateDialog = signal(false);
  selectedProvision = signal<Provision>({} as Provision);
  private gridApi!: GridApi;
  dark = true;

  form = new FormGroup({
    stichtag: new FormControl<string>('', { nonNullable: true }),
    kontonummer: new FormControl<string>('', { nonNullable: true }),
    geschaeftsnummer: new FormControl<string>('', { nonNullable: true }),
    erfassungsart: new FormControl<string>('', { nonNullable: true }),
    bezeichung: new FormControl<string>('', { nonNullable: true }),

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

  rowData: Provision[] = this.store.provisionen();
  colDefs: ColDef[] = [
    { field: "stichtag", headerName: 'Stichtag' },
    { field: "kontonummer", headerName: 'Kontonummer' },
    { field: "geschaeftsnummer", headerName: 'Geschäftsnummer' },
    { field: "erfassungsart", headerName: 'Erfassungsart' },
    { field: "bezeichnung", headerName: 'Provisionsbezeichnung' },
    { field: "kundennummer", headerName: 'Kundennummer' },
    { field: "beraternummer", headerName: 'Beraternummer' },
    { field: "waehrung", headerName: 'Währung' },
    { field: "neugeschaeft", headerName: 'Bestands-/Neugeschäft' },
    { field: "vertriebsweg", headerName: 'Vertriebsweg' },
    { field: "vpProduktinfo1", headerName: 'VP Produktinfo 1' },
    { field: "vpProduktinfo2", headerName: 'VP Produktinfo 2' },
    { field: "vpProduktinfo3", headerName: 'VP Produktinfo 3' },
    { field: "vpProduktinfo4", headerName: 'VP Produktinfo 4' },
    { field: "vpProduktinfo5", headerName: 'VP Produktinfo 5' },
    { field: "postenaufwand", headerName: 'Postenaufwand' },
    { field: "postenertrag", headerName: 'Postenertrag' },
    { field: "volumen", headerName: 'Zugrunde liegendes Volumen' },
    { field: "umsatz", headerName: 'Zugrunde liegender Umsatz' },
    { field: "postenanzahl", headerName: 'Postenanzahl' },
    { field: "postenkosten", headerName: 'Postenkosten' },
  ];

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

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowDoubleClick(event: RowDoubleClickedEvent) {
    this.router.navigate(['/provision', event.data.id]);
  }

  onAddProvision() {
    this.showCreateDialog.set(true);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    const themeMode = element?.getAttribute('data-ag-theme-mode');
    element?.classList.toggle('dark');
    this.dark = !this.dark;
    if (themeMode === 'dark') {
      element?.setAttribute('data-ag-theme-mode', 'light');
    } else {
      element?.setAttribute('data-ag-theme-mode', 'dark');
    }
  }

  showMessage(event: any) {
    // TODO: this!
  }

  protected readonly themeBalham = themeBalham;
}

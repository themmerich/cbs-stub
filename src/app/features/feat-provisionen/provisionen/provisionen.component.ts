import {Component, inject} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent, themeBalham} from 'ag-grid-enterprise';
import {Provision} from '../../model/provision';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Fieldset} from 'primeng/fieldset';
import {Router} from '@angular/router';
import {ProvisionStore} from '../../data/provision.store';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';

@Component({
  selector: 'app-provisionen',
  imports: [
    AgGridAngular,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Fieldset,
    Button,
    Toolbar
  ],
  templateUrl: './provisionen.component.html',
  styleUrl: './provisionen.component.scss'
})
export class ProvisionenComponent {
  store = inject(ProvisionStore);
  router = inject(Router);

  private gridApi!: GridApi;
  dark = true;

  form = new FormGroup({
    stichtag: new FormControl<Date | undefined>(undefined),
    kontonummer: new FormControl<string>(''),
    geschaeftsnummer: new FormControl<string>(''),
    erfassungsart: new FormControl<string>(''),
    bezeichung: new FormControl<string>(''),

    kundennummer: new FormControl<string>(''),
    beraternummer: new FormControl<string>(''),
    neugeschaeft: new FormControl<string>(''),
    vertriebsweg: new FormControl<string>(''),
    waehrung: new FormControl<string>(''),

    vpProduktinfo1: new FormControl<string>(''),
    vpProduktinfo2: new FormControl<string>(''),
    vpProduktinfo3: new FormControl<string>(''),
    vpProduktinfo4: new FormControl<string>(''),
    vpProduktinfo5: new FormControl<string>(''),
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
    { field: "postenaufwand", headerName: 'Postenaufwand (EUR)' },
    { field: "postenertrag", headerName: 'Postenertrag (EUR)' },
    { field: "volumen", headerName: 'Zugrunde liegendes Volumen (EUR)' },
    { field: "umsatz", headerName: 'Zugrunde liegender Umsatz (EUR)' },
    { field: "postenanzahl", headerName: 'Postenanzahl' },
    { field: "postenkosten", headerName: 'Postenkosten (EUR)' },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowDoubleClick(event: RowDoubleClickedEvent) {
    console.log('dbClick', event);
    this.router.navigate(['/provision', event.data.id]);
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

  protected readonly themeBalham = themeBalham;
}

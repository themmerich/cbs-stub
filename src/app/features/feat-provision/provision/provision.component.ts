import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fieldset} from 'primeng/fieldset';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent, themeBalham} from 'ag-grid-enterprise';
import {Posten} from '../../model/posten';
import {ProvisionStore} from '../../data/provision.store';
import {PostenEditComponent} from '../posten-edit/posten-edit.component';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {FormInputComponent} from '../../../shared/ui/form-input/form-input.component';
import {PostenCreate} from '../posten-create/posten-create';

@Component({
  selector: 'app-provision',
  imports: [
    Fieldset,
    ReactiveFormsModule,
    AgGridAngular,
    PostenEditComponent,
    Toolbar,
    Button,
    FormInputComponent,
    PostenCreate,
  ],
  templateUrl: './provision.component.html',
  styleUrl: './provision.component.scss'
})
export class ProvisionComponent {
  route = inject(ActivatedRoute);
  store = inject(ProvisionStore);

  id = signal<string | null>(null);
  showEditDialog = signal(false);
  showCreateDialog = signal(false);
  selectedPosten = signal<Posten | null>(null);
  private gridApi!: GridApi;

  provisionForm = new FormGroup({
    stichtag: new FormControl<Date | undefined>(undefined),
    kontonummer: new FormControl<number | undefined>(undefined),
    geschaeftsnummer: new FormControl<number | undefined>(undefined),
    erfassungsart: new FormControl<string>(''),
    bezeichnung: new FormControl<string>(''),

    kundennummer: new FormControl<number | undefined>(undefined),
    beraternummer: new FormControl<number | undefined>(undefined),
    neugeschaeft: new FormControl<string>(''),
    vertriebsweg: new FormControl<string>(''),
    waehrung: new FormControl<string>(''),

    vpProduktinfo1: new FormControl<string>(''),
    vpProduktinfo2: new FormControl<string>(''),
    vpProduktinfo3: new FormControl<string>(''),
    vpProduktinfo4: new FormControl<string>(''),
    vpProduktinfo5: new FormControl<string>(''),
  });

  constructor() {
    this.id.set(this.route.snapshot.paramMap.get('id'));
    const provisionId = Number(this.id());
    const provision = this.store.getProvision(provisionId);
    if (provision) {
      this.provisionForm.patchValue(provision);
      this.rowData = provision.posten;
    }
  }

  rowData: Posten[] = [];
  colDefs: ColDef[] = [
    { field: "aufwand", headerName: 'Aufwand (EUR)' },
    { field: "ertrag", headerName: 'Ertrag (EUR)' },
    { field: "volumen", headerName: 'Volumen (EUR)' },
    { field: "umsatz", headerName: 'Umsatz (EUR)' },
    { field: "kosten", headerName: 'Kosten pro Posten (EUR)' },
    { field: "anzahl", headerName: 'Anzahl' },
    { field: "aquisitionsweg", headerName: 'Aquisitionsweg' },
    { field: "erfassungsart", headerName: 'Erfassungsart Posten' },
    { field: "gebuehrenart", headerName: 'Gebührenart' },
    { field: "individualprodukt", headerName: 'Individualprodukt' },
    { field: "isinNummer", headerName: 'ISIN-Nummer' },
    { field: "ordernummer", headerName: 'Ordernummer' },
    { field: "provisionstyp", headerName: 'Provisionstyp' },
    { field: "sparte", headerName: 'Sparte' },
    { field: "standardprodukt", headerName: 'Standardprodukt' },
    { field: "tarif", headerName: 'Tarif' },
    { field: "textschluesselgruppe", headerName: 'Textschlüsselgruppe' },
    { field: "vpPostenidentifier1", headerName: 'VP Postenidentifier 1' },
    { field: "vpPostenidentifier2", headerName: 'VP Postenidentifier 2' },
    { field: "vpPostenidentifier3", headerName: 'VP Postenidentifier 3' },
    { field: "vpPostenidentifier4", headerName: 'VP Postenidentifier 4' },
    { field: "vpPostenidentifier5", headerName: 'VP Postenidentifier 5' },
    { field: "wertpapierkennnummer", headerName: 'Wertpapierkennnumer' },
    { field: "zuwachsvertrag", headerName: 'Zuwachsvertrag' },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowDoubleClick(event: RowDoubleClickedEvent) {
    this.selectedPosten.set(event.data);
    this.showEditDialog.set(true);
  }

  onAddPosten() {
    this.showCreateDialog.set(true);
  }

  showMessage(event: any) {
    // TODO: this!
  }

  protected readonly themeBalham = themeBalham;
}

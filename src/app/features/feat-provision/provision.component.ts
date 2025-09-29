import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Fieldset} from 'primeng/fieldset';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AgGridAngular} from 'ag-grid-angular';
import {
  ColDef, DefaultMenuItem, GetContextMenuItemsParams,
  GridApi,
  GridReadyEvent, MenuItemDef,
  RowDoubleClickedEvent,
  themeBalham,
  ValueFormatterParams
} from 'ag-grid-enterprise';
import {Posten} from '../model/posten';
import {ProvisionStore} from '../data/provision.store';
import {PostenEditComponent} from './posten-edit/posten-edit.component';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {FormInputComponent} from '../../shared/ui/form-input/form-input.component';
import {PostenCreate} from './posten-create/posten-create';

function currencyFormatter(params: ValueFormatterParams) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return '';
  }
  return value.toString() + ' €';
}

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
  router = inject(Router);
  store = inject(ProvisionStore);

  id = signal<number>(0);
  provision = computed(() => this.store.getProvision(this.id()));
  showEditDialog = signal(false);
  showCreateDialog = signal(false);
  selectedPosten = signal<Posten>({});
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
    this.id.set(Number(this.route.snapshot.paramMap.get('id')));

    effect(() => {
      this.provisionForm.patchValue(this.provision() as any);
      this.rowData = this.provision()?.posten ?? [];
    });
  }

  columnTypes = {
    currency: {
      valueFormatter: currencyFormatter
    }
  };
  rowData: Posten[] = [];
  colDefs: ColDef[] = [
    { field: "aufwand", headerName: 'Aufwand', type: 'currency', editable: true },
    { field: "ertrag", headerName: 'Ertrag', type: 'currency', editable: true },
    { field: "volumen", headerName: 'Volumen', type: 'currency', editable: true },
    { field: "umsatz", headerName: 'Umsatz', type: 'currency', editable: true },
    { field: "kosten", headerName: 'Kosten pro Posten', type: 'currency', editable: true },
    { field: "anzahl", headerName: 'Anzahl', editable: true },
    { field: "aquisitionsweg", headerName: 'Aquisitionsweg', editable: true },
    { field: "erfassungsart", headerName: 'Erfassungsart Posten', editable: true },
    { field: "gebuehrenart", headerName: 'Gebührenart', editable: true },
    { field: "individualprodukt", headerName: 'Individualprodukt', editable: true },
    { field: "isinNummer", headerName: 'ISIN-Nummer', editable: true },
    { field: "ordernummer", headerName: 'Ordernummer', editable: true },
    { field: "provisionstyp", headerName: 'Provisionstyp', editable: true },
    { field: "sparte", headerName: 'Sparte', editable: true },
    { field: "standardprodukt", headerName: 'Standardprodukt', editable: true },
    { field: "tarif", headerName: 'Tarif', editable: true },
    { field: "textschluesselgruppe", headerName: 'Textschlüsselgruppe', editable: true },
    { field: "vpPostenidentifier1", headerName: 'VP Postenidentifier 1', editable: true },
    { field: "vpPostenidentifier2", headerName: 'VP Postenidentifier 2', editable: true },
    { field: "vpPostenidentifier3", headerName: 'VP Postenidentifier 3', editable: true },
    { field: "vpPostenidentifier4", headerName: 'VP Postenidentifier 4', editable: true },
    { field: "vpPostenidentifier5", headerName: 'VP Postenidentifier 5', editable: true },
    { field: "wertpapierkennnummer", headerName: 'Wertpapierkennnumer', editable: true },
    { field: "zuwachsvertrag", headerName: 'Zuwachsvertrag', editable: true },
  ];

  pinnedBottomRowData = signal([
    { aufwand: 0, ertrag: 0, volumen: 0, umsatz: 0, kosten: 0, anzahl: 0 } as Posten
  ]);

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.updateTotals();
  }

  getContextMenuItems = (params: GetContextMenuItemsParams):
    | (DefaultMenuItem | MenuItemDef)[]
    | Promise<(DefaultMenuItem | MenuItemDef)[]> => {
    const result: (DefaultMenuItem | MenuItemDef)[] = [
      {
        // custom item
        name: "Edit",
        action: () => {
          this.selectedPosten.set(params?.node?.data);
          this.showEditDialog.set(true);
        },
      }];
    return result;
  }

  updateTotals() {
    const allRows: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort(node => allRows.push(node.data));

    const aufwand = allRows.reduce((sum, r) => sum + r.aufwand, 0);
    const ertrag = allRows.reduce((sum, r) => sum + r.ertrag, 0);
    const volumen = allRows.reduce((sum, r) => sum + r.volumen, 0);
    const umsatz = allRows.reduce((sum, r) => sum + r.umsatz, 0);
    const kosten = allRows.reduce((sum, r) => sum + r.kosten, 0);
    const anzahl = allRows.reduce((sum, r) => sum + r.anzahl, 0);

   this.pinnedBottomRowData.set([
      { aufwand: aufwand, ertrag: ertrag, volumen: volumen, umsatz: umsatz, kosten: kosten, anzahl: anzahl } as Posten
    ]);
  }

  /*onRowDoubleClick(event: RowDoubleClickedEvent) {
    this.selectedPosten.set(event.data);
    this.showEditDialog.set(true);
  }*/

  onAddPosten() {
    this.showCreateDialog.set(true);
  }

  showMessage(event: any) {
    // TODO: this!
  }

  onGoBack() {
    this.router.navigate(['/provisionen']);
  }

  protected readonly themeBalham = themeBalham;
}

import {Injectable} from '@angular/core';
import {Provision} from '../model/provision';
import {Posten} from '../model/posten';

@Injectable({
  providedIn: 'root'
})
export class ProvisionService {
  provisionen: Provision[] = [{
    id: 1,
    stichtag: '',
    kontonummer: '1',
    geschaeftsnummer: '1',
    erfassungsart: 'manuell',
    bezeichnung: 'Allianz',
    kundennummer: '1',
    beraternummer: '1',
    waehrung: 'EUR',
    neugeschaeft: 'Unbekannt',
    vertriebsweg: '',
    vpProduktinfo1: '',
    vpProduktinfo2: '',
    vpProduktinfo3: '',
    vpProduktinfo4: '',
    vpProduktinfo5: '',
    postenaufwand: 0,
    postenertrag: 0,
    volumen: 0,
    umsatz: 0,
    postenanzahl: 1,
    postenkosten: 0,
    posten: [{
      id: 11,
      aufwand: 0,
      ertrag: 0,
      volumen: 0,
      umsatz: 0,
      kosten: 0,
      anzahl: 0,
      aquisitionsweg: 'keine Angabe',
      erfassungsart: 'manuell',
      gebuehrenart: 'Default',
      individualprodukt: 0,
      isinNummer: '',
      ordernummer: 0,
      provisionstyp: 'Default',
      sparte: '',
      standardprodukt: 0,
      tarif: '',
      textschluesselgruppe: 0,
      vpPostenidentifier1: '',
      vpPostenidentifier2: '',
      vpPostenidentifier3: '',
      vpPostenidentifier4: '',
      vpPostenidentifier5: '',
      wertpapierkennnummer: '',
      zuwachsvertrag: ''
    } as Posten]
  } as Provision,
    {
      id: 2,
      stichtag: '',
      kontonummer: '2',
      geschaeftsnummer: '2',
      erfassungsart: 'manuell',
      bezeichnung: 'Allianz',
      kundennummer: '2',
      beraternummer: '2',
      waehrung: 'EUR',
      neugeschaeft: 'Unbekannt',
      vertriebsweg: '',
      vpProduktinfo1: '',
      vpProduktinfo2: '',
      vpProduktinfo3: '',
      vpProduktinfo4: '',
      vpProduktinfo5: '',
      postenaufwand: 0,
      postenertrag: 0,
      volumen: 0,
      umsatz: 0,
      postenanzahl: 1,
      postenkosten: 0,
      posten: [{
        id: 21,
        aufwand: 0,
        ertrag: 0,
        volumen: 0,
        umsatz: 0,
        kosten: 0,
        anzahl: 0,
        aquisitionsweg: 'keine Angabe',
        erfassungsart: 'manuell',
        gebuehrenart: 'Default',
        individualprodukt: 0,
        isinNummer: undefined,
        ordernummer: 0,
        provisionstyp: 'Default',
        sparte: undefined,
        standardprodukt: 0,
        tarif: undefined,
        textschluesselgruppe: 0,
        vpPostenidentifier1: undefined,
        vpPostenidentifier2: undefined,
        vpPostenidentifier3: undefined,
        vpPostenidentifier4: undefined,
        vpPostenidentifier5: undefined,
        wertpapierkennnummer: undefined,
        zuwachsvertrag: undefined
      } as Posten,
        {
          id: 22,
          aufwand: 1,
          ertrag: 2,
          volumen: 3,
          umsatz: 4,
          kosten: 5,
          anzahl: 6,
          aquisitionsweg: 'keine Angabe',
          erfassungsart: 'manuell',
          gebuehrenart: 'Default',
          individualprodukt: 0,
          isinNummer: undefined,
          ordernummer: 0,
          provisionstyp: 'Default',
          sparte: undefined,
          standardprodukt: 0,
          tarif: undefined,
          textschluesselgruppe: 0,
          vpPostenidentifier1: undefined,
          vpPostenidentifier2: undefined,
          vpPostenidentifier3: undefined,
          vpPostenidentifier4: undefined,
          vpPostenidentifier5: undefined,
          wertpapierkennnummer: undefined,
          zuwachsvertrag: undefined
        } as Posten]
    } as Provision];

  getProvisionen(): Provision[] {
    return this.provisionen;
  }

  getProvision(id: number) {
    return this.provisionen.find(provision => provision.id === id);
  }

  getPostenListe(id: number) {
    return this.getProvision(id)?.posten;
  }

  getPosten(provisionId: number, postenId: number) {
    return this.getProvision(provisionId)?.posten.find(posten => posten.id === postenId);
  }
}

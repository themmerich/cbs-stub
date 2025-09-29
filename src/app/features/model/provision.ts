import {Posten} from './posten';

export interface Provision {
  id?: number,
  stichtag?: string,
  kontonummer: string,
  geschaeftsnummer: string,
  erfassungsart: string,
  bezeichnung: string,
  kundennummer: string,
  beraternummer: string,
  waehrung: string,
  neugeschaeft: string,
  vertriebsweg?: string,
  vpProduktinfo1?: string,
  vpProduktinfo2?: string,
  vpProduktinfo3?: string,
  vpProduktinfo4?: string,
  vpProduktinfo5?: string,
  postenaufwand: number,
  postenertrag: number,
  volumen: number,
  umsatz: number,
  postenanzahl: number,
  postenkosten: number
  posten: Posten[]
}

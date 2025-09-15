import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AllEnterpriseModule, ModuleRegistry} from 'ag-grid-enterprise';
import {TranslateService} from '@ngx-translate/core';

ModuleRegistry.registerModules([AllEnterpriseModule]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(['de']);
    this.translateService.use('de');
  }
}

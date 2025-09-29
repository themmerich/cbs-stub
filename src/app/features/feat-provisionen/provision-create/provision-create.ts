import {Component, inject, input, model, output, viewChild} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {TranslatePipe} from "@ngx-translate/core";
import {ProvisionStore} from '../../data/provision.store';
import {ProvisionFormComponent} from '../provision-form/provision-form.component';
import {Provision} from '../../model/provision';

@Component({
  selector: 'app-provision-create',
  imports: [
    Dialog,
    TranslatePipe,
    ProvisionFormComponent
  ],
  templateUrl: './provision-create.html',
})
export class ProvisionCreate {
  store = inject(ProvisionStore);

  visible = model.required<boolean>();
  provision = input<Provision>({} as Provision);
  formComponent = viewChild.required<ProvisionFormComponent>(ProvisionFormComponent);
  showCreateDialog = output<boolean>();
  showMessage = output<void>(); // TODO: change type

  create(provision: Provision) {
    /*this.store.createProvision(1, provision); // TODO: correct id!
    this.visible.set(false);
    this.showCreateDialog.emit(false);*/
  }

  cancel() {
    this.visible.set(false);
    this.showCreateDialog.emit(false);
  }

  resetForm() {
    this.formComponent().formGroup.reset();
  }
}

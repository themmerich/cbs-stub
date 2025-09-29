import {Component, inject, input, model, output, viewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {ProvisionStore} from '../../data/provision.store';
import {ProvisionFormComponent} from '../provision-form/provision-form.component';
import {Provision} from '../../model/provision';

@Component({
  selector: 'app-provision-edit',
  imports: [
    Dialog,
    ProvisionFormComponent,
    TranslatePipe
  ],
  templateUrl: './provision-edit.component.html',
})
export class ProvisionEditComponent {
  store = inject(ProvisionStore);

  visible = model.required<boolean>();
  provision = input.required<Provision>();
  formComponent = viewChild.required<ProvisionFormComponent>(ProvisionFormComponent);
  showEditDialog = output<boolean>();
  showMessage = output<void>(); // TODO: change type

  update(provision: Provision) {
    this.store.updateProvision(provision);
    this.visible.set(false);
    this.showEditDialog.emit(false);
  }

  cancel() {
    this.visible.set(false);
    this.showEditDialog.emit(false);
  }

  resetForm() {
    this.formComponent().formGroup.reset();
  }
}

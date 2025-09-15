import {Component, inject, input, model, output, viewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {PostenFormComponent} from '../posten-form/posten-form.component';
import {Posten} from '../../model/posten';
import {TranslatePipe} from '@ngx-translate/core';
import {ProvisionStore} from '../../data/provision.store';

@Component({
  selector: 'app-posten-edit',
  imports: [
    Dialog,
    PostenFormComponent,
    TranslatePipe
  ],
  templateUrl: './posten-edit.component.html',
  styleUrl: './posten-edit.component.scss'
})
export class PostenEditComponent {
  store = inject(ProvisionStore);

  visible = model.required<boolean>();
  posten = input<Posten | null>(null);
  formComponent = viewChild.required<PostenFormComponent>(PostenFormComponent);
  showEditDialog = output<boolean>();
  showMessage = output<void>(); // TODO: change type

  update(posten: Posten) {
    this.store.updatePosten(posten);
    this.visible.set(false);
    this.showEditDialog.emit(false);
  }

  cancel() {
    this.visible.set(false);
    this.showEditDialog.emit(false);
  }

  resetForm() {
    this.formComponent().form.reset();
  }
}

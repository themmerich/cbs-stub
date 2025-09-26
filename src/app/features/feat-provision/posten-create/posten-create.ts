import {Component, inject, input, model, output, viewChild} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {PostenFormComponent} from "../posten-form/posten-form.component";
import {TranslatePipe} from "@ngx-translate/core";
import {Posten} from '../../model/posten';
import {ProvisionStore} from '../../data/provision.store';

@Component({
  selector: 'app-posten-create',
    imports: [
        Dialog,
        PostenFormComponent,
        TranslatePipe
    ],
  templateUrl: './posten-create.html',
  styleUrl: './posten-create.scss'
})
export class PostenCreate {
  store = inject(ProvisionStore);

  visible = model.required<boolean>();
  posten = input<Posten>({});
  formComponent = viewChild.required<PostenFormComponent>(PostenFormComponent);
  showCreateDialog = output<boolean>();
  showMessage = output<void>(); // TODO: change type

  create(posten: Posten) {
    this.store.createPosten(1, posten); // TODO: correct id!
    this.visible.set(false);
    this.showCreateDialog.emit(false);
  }

  cancel() {
    this.visible.set(false);
    this.showCreateDialog.emit(false);
  }

  resetForm() {
    this.formComponent().form.reset();
  }
}

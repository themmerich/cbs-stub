import {patchState, signalStore, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {Provision} from '../model/provision';
import {inject} from '@angular/core';
import {ProvisionService} from './provision.service';
import {Posten} from '../model/posten';

interface ProvisionState {
  provisionen: Provision[]
}

const initalState: ProvisionState = {
  provisionen: []
}

export const ProvisionStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  withProps(() => ({
    _provisionService: inject(ProvisionService),
  })),
  withMethods((store) => {
    return {
      load(): void {
        const provisionen = store._provisionService.getProvisionen();
        patchState(store, { provisionen: provisionen });
      },
      getProvision(id: number) {
        return store.provisionen().find(provision => provision.id === id);
      },
      removeProvision(id: number) {
        patchState(store, {
          provisionen: store.provisionen().filter((provision) => provision.id !== id)
        });
      },
      updateProvision(updatedProvision: Provision) {
        patchState(store, {
          provisionen: store.provisionen().map((provision) => (provision.id === updatedProvision.id ? updatedProvision : provision))
        });
      },
      createPosten(id: number, newPosten: Posten) {
        const updatedProvision = store.provisionen().find(provision => provision.id = id);
        if (updatedProvision) {
          updatedProvision.posten.push(newPosten);
          this.updateProvision(updatedProvision);
        }
      },
      updatePosten(updatedPosten: Posten) {
        for (const provision of store.provisionen()) {
          provision.posten = provision.posten.map((posten) => (posten.id === updatedPosten.id ? updatedPosten : posten));
          this.updateProvision(provision);
        }
      }
    }
  }),
  withHooks({
    onInit({ load }) {
      load();
    }
  })
);

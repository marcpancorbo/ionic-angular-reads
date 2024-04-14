import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service that allows to unsubscribe from observables when the component is destroyed. Requires to be implemented into component providers
 */
@Injectable()
export class AutoDestroyService extends Subject<boolean> implements OnDestroy {
  public ngOnDestroy(): void {
    this.next(true);
    this.complete();
  }
}

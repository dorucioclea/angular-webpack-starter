import { RouterStateSerializer } from '@ngrx/router-store';
import { TransferState } from '@angular/platform-browser';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer },
  TransferState
];

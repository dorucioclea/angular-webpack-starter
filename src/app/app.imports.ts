import { ReactiveFormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { MaterialModule } from './material.module';

export const APP_IMPORTS = [
  MaterialModule,
  ReactiveFormsModule,
];

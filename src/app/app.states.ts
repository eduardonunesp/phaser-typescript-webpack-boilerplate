import { Ng2StateDeclaration, TargetStateDef } from "ui-router-ng2";

import { AppComponent } from './app.component';

/**
 * Application states.
 */
export const APP_STATES: Ng2StateDeclaration[] = [
  { name: 'app', component: AppComponent }
];

/**
 * Default state.
 */
export const DEFAULT_STATE: TargetStateDef = { state: 'app', params: {} };

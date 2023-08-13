import { Routes } from '@angular/router';
import { HomeComponent, QueryComponent, EvalHomeComponent, EvalComponent } from '@app/pages';
import { authGuard } from './guards';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: QueryComponent },
  { path: 'eval', component: EvalHomeComponent, canActivate: [authGuard] },
  { path: 'eval/results', component: EvalComponent, canActivate: [authGuard] },
];

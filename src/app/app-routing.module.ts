import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, QueryComponent, EvalHomeComponent, EvalComponent, HomeModule, ResultModule, EvalModule } from '@app/pages';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: QueryComponent },
  { path: 'eval', component: EvalHomeComponent, canActivate: [AuthGuard] },
  { path: 'eval/results', component: EvalComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    HomeModule,
    ResultModule,
    EvalModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

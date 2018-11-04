import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, QueryComponent, EvalHomeComponent, EvalComponent, HomeModule, ResultModule, EvalModule } from '@app/pages';
import { AuthGuard } from './core';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: QueryComponent },
  { path: 'eval', component: EvalHomeComponent },
  { path: 'eval/results', component: EvalComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    HomeModule,
    ResultModule,
    EvalModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

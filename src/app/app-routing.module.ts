import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, QueryComponent, EvalComponent, HomeModule, ResultModule, EvalModule } from '@app/pages';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: QueryComponent },
  { path: 'eval', component: EvalComponent }
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

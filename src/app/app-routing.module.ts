import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent, EvalComponent, QueryModule, EvalModule } from '@app/pages';

const routes: Routes = [
  { path: 'query', data: { title: 'Query' }, component: QueryComponent },
  { path: 'eval', data: { title: 'Evaluation' }, component: EvalComponent },
  { path: '', redirectTo: 'query', pathMatch: 'full' }
];

@NgModule({
  imports: [
    QueryModule,
    EvalModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

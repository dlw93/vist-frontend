import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QueryComponent} from './query/query.component';
import {EvalComponent} from './eval/eval.component';

const routes: Routes = [
  {path: 'query', data: {title: 'Query'}, component: QueryComponent},
  {path: 'eval', data: {title: 'Evaluation'}, component: EvalComponent},
  {path: '', redirectTo: 'query', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, QueryComponent, EvalComponent, HomeModule, ResultModule, EvalModule } from '@app/pages';
import { AuthGuard } from './core';
import { AuthModule, LoginComponent, RegisterComponent, AccountComponent } from './auth';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: QueryComponent },
  { path: 'eval', component: EvalComponent, canActivate: [AuthGuard] },
  { path: 'login', outlet: 'auth', component: LoginComponent },
  { path: 'register', outlet: 'auth', component: RegisterComponent },
  { path: 'account', outlet: 'auth', component: AccountComponent }
];

@NgModule({
  imports: [
    HomeModule,
    ResultModule,
    EvalModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

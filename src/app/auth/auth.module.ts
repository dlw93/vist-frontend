import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatInputModule, MatTooltipModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoginComponent,
        AccountComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatInputModule,
        MatTooltipModule
    ],
    exports: [
        AccountComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule { }

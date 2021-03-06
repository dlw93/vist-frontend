import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ResultModule } from '@app/pages/query/result.module';

@NgModule({
  imports: [
    CommonModule,
    ResultModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

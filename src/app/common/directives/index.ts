import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormPropertyField } from './formField.component';

@NgModule({
  declarations: [
    FormPropertyField
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormPropertyField
  ]
})
export class DirectivesModule {

}


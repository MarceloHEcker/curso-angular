import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form.component';

@NgModule( {
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
		HttpClientModule
	],
	declarations: [
		DataFormComponent
	]
} )
export class DataFormModule { }

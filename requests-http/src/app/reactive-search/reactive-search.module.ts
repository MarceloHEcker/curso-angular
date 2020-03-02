import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveSearchComponent } from './reactive-search/reactive-search.component';

@NgModule( {
	declarations: [ LibSearchComponent, ReactiveSearchComponent ],
	imports: [
		CommonModule,
		ReactiveSearchRoutingModule,
		ReactiveFormsModule
	]
} )
export class ReactiveSearchModule { }

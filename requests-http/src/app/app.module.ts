import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from './shared/shared.module';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule( {
  declarations: [ AppComponent, UploadFileComponent ],
  imports: [ BrowserModule, AppRoutingModule, HttpClientModule, ModalModule.forRoot(), SharedModule ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }

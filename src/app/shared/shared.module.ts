import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { FormDebugComponent } from "./form-debug/form-debug.component";
import { CampoControlErroComponent } from "./campo-control-erro/campo-control-erro.component";

import { ConsultaCepService } from "./services/consulta-cep.service";
import { DropdownService } from "./services/dropdown.service";
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule( {
  imports: [ CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
  declarations: [ FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
  ],
  providers: [ ConsultaCepService, DropdownService ]
} )
export class SharedModule { }

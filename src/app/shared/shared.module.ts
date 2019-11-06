import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormDebugComponent } from "./form-debug/form-debug.component";
import { CampoControlErroComponent } from "./campo-control-erro/campo-control-erro.component";

import { ConsultaCepService } from "./services/consulta-cep.service";
import { DropdownService } from "./services/dropdown.service";

@NgModule({
  imports: [CommonModule],
  declarations: [FormDebugComponent, CampoControlErroComponent],
  exports: [FormDebugComponent, CampoControlErroComponent],
  providers: [ConsultaCepService, DropdownService]
})
export class SharedModule {}

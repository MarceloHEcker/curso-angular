import { NgModule } from "@angular/core";
import { TemplateFormComponent } from "./template-form.component";
import { SharedModule } from "./../shared/shared.module";

@NgModule({
  declarations: [TemplateFormComponent],
  imports: [SharedModule]
})
export class TemplateFormModule {}

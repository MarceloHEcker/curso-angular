import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TemplateFormModule } from "./template-form/template-form.module";
import { DataFormModule } from "./data-form/data-form.module";
import { DropdownService } from "./shared/services/dropdown.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateFormModule,
    DataFormModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule {}

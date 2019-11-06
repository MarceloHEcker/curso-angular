import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { ConsultaCepService } from "./../shared/services/consulta-cep.service";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"]
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {}

  onSubmit(form) {
    console.log("form", form);
    console.log("usuario", this.usuario);

    this.http
      .post("https://httpbin.org/post", JSON.stringify(form.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });
  }

  verificaValidTouch(field) {
    return !field.valid && field.touched;
  }

  aplicaCssErro(field) {
    return {
      "has-error": this.verificaValidTouch(field),
      "has-feedback": this.verificaValidTouch(field)
    };
  }

  consultaCEP(cep, form) {
    // Nova variável "cep" somente com dígitos
    cep = cep.replace(/\D/g, "");
    if (cep != null && cep !== "") {
      this.cepService
        .consultaCEP(cep, this.resetaDadosForm, form)
        .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, formulario) {
    /*
    formulario.setValue( {
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    } );
    */
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //console.log(form);
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}

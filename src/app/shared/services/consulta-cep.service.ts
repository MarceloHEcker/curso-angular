import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class ConsultaCepService {
  constructor(private http: HttpClient) {}

  consultaCEP(cep, resetaFormCallback, formulario) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        resetaFormCallback(formulario);

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}

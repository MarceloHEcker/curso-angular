import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component( {
	selector: 'app-cursos-form',
	templateUrl: './cursos-form.component.html',
	styleUrls: [ './cursos-form.component.scss' ]
} )
export class CursosFormComponent implements OnInit {

	form: FormGroup;
	submitted = false;

	constructor(
		private fb: FormBuilder,
		private service: CursosService,
		private modal: AlertModalService,
		private location: Location,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {

		//const registro = null;
		// this.route.params.subscribe(
		//   (params: any) => {
		//     const id = params['id'];
		//     console.log(id);
		//     const curso$ = this.service.loadByID(id);
		//     curso$.subscribe(curso => {
		//       registro = curso;
		//       this.updateForm(curso);
		//     });
		//   }
		// );

		// console.log(registro);

		/*
		this.route.params.pipe(
			map( ( params: any ) => params[ 'id' ] ),
			switchMap( id => this.service.loadByID( id ) ),
			//switchMap(cursos => obterAulas)
		).subscribe( curso => this.updateForm( curso ) );

		*/

		const curso = this.route.snapshot.data[ 'curso' ];

		this.form = this.fb.group( {
			id: [ curso.id ],
			nome: [ curso.nome, [ Validators.required, Validators.minLength( 3 ), Validators.maxLength( 250 ) ] ]
		} );
	}

	/*
	updateForm( curso ) {
		this.form.patchValue( {
			id: curso.id,
			nome: curso.nome
		} );
	}
	*/

	hasError( field: string ) {
		return this.form.get( field ).errors;
	}

	handleSuccessMessage() {
		return this.form.value.id ? "Curso atualizado com sucesso" : "Curso criado com sucesso";
	}

	handleErrorMessage() {
		return this.form.value.id ? 'Erro ao atualizar curso, tente novamente!' : 'Erro ao criar curso, tente novamente!';

	}

	onSubmit() {
		this.submitted = true;
		console.log( this.form.value );
		if ( this.form.valid ) {
			console.log( 'submit' );

			const msgSuccess = this.handleSuccessMessage();
			const msgError = this.handleErrorMessage();

			this.service.save( this.form.value ).subscribe(
				success => {
					this.modal.showAlertSuccess( msgSuccess );
					this.location.back();
				},
				error => this.modal.showAlertDanger( msgError ),
			)
		}
	}

	onCancel() {
		this.submitted = false;
		this.form.reset();
		// console.log('onCancel');
	}
}

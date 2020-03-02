import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty, of, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from '../cursos.service';
import { Curso } from './../curso';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component( {
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: [ './cursos-lista.component.scss' ],
  preserveWhitespaces: true
} )
export class CursosListaComponent implements OnInit {

  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild( 'deleteModal', { static: false } ) deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso;

  constructor( private service: CursosService,
    private modalService: BsModalService,
    //private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      // map(), 
      // tap(), 
      // switchMap(),
      catchError( error => {
        console.error( error );
        //this.error$.next( true );
        this.handleError();
        return empty();
      } )
    );

    /*this.service.list().pipe( catchError( error => empty() ) ).subscribe(
      dados => {
        console.log( dados );
      }
    ); */
  }

  onEdit( id ) {
    this.router.navigate( [ 'editar', id ], { relativeTo: this.route } );
  }

  onDelete( curso ) {
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show( this.deleteModal, { class: 'modal-sm' } );

    const result$ = this.alertService.showConfirm( 'Confirmação', 'Tem certeza que deseja remover esse curso?' );
    result$.asObservable().pipe(
      take( 1 ),
      switchMap( result => result ? this.service.remove( curso.id ) : EMPTY )
    ).subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger( `Erro ao remover curso. Tente novamente mais tarde` );
      }
    );
  }

  onConfirmDelete() {
    this.service.remove( this.cursoSelecionado.id ).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger( `Erro ao remover curso. Tente novamente mais tarde` );
        this.deleteModalRef.hide();
      }
    )
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    // this.bsModalRef = this.modalService.show( AlertModalComponent );
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar os cursos. Tente novamente mais tarde.';
    this.alertService.showAlertDanger( 'Erro ao carregar cursos. Tente novamente mais tarde.' );
  }
}

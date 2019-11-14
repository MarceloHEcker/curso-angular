import { Component, OnInit } from '@angular/core';
import { Observable, empty, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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

  bsModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor( private service: CursosService,
    //private modalService: BsModalService,
    private alertService: AlertModalService ) { }

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

    this.service.list().pipe( catchError( error => empty() ) ).subscribe(
      dados => {
        console.log( dados );
      }
    );
  }

  handleError() {
    // this.bsModalRef = this.modalService.show( AlertModalComponent );
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar os cursos. Tente novamente mais tarde.';
    this.alertService.showAlertDanger( 'Erro ao carregar cursos. Tente novamente mais tarde.' );
  }

}

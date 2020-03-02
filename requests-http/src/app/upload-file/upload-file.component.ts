import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component( {
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [ './upload-file.component.scss' ]
} )
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  ngOnInit() {
  }

  constructor( private service: UploadFileService ) { }

  onChange( event ) {
    console.log( event );

    const selectedFiles = <FileList> event.srcEelement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for ( let index = 0; index < selectedFiles.length; index++ ) {
      fileNames.push( selectedFiles[ index ].name );
      this.files.add( selectedFiles[ index ] );
    }
    document.getElementById( 'customFileLabel' ).innerHTML = fileNames.join( ', ' );

    this.progress = 0;
  }

  onUpload() {
    if ( this.files && this.files.size > 0 ) {
      this.service.upload( this.files, `${ environment.BASE_URL }/upload` ).subscribe(
        ( event: HttpEvent<Object> ) => {
          //HttpEventType
          console.log( event );
          if ( event.type === HttpEventType.Response ) {
            console.log( 'Upload Concluído' );
          } else if ( event.type === HttpEventType.UploadProgress ) {
            const percentDone = Math.round( ( event.loaded * 100 ) / event.total );
            console.log( 'Progresso', percentDone );
            this.progress = percentDone;
          }
        }
      );
    }
  }

}

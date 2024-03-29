import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  constructor(private notesService: NotesService, private toastr: ToastrService){}

  @Input() info: Note;
  ownProfile: boolean;

  ngOnInit():void{
    const decodedToken: any = jwtDecode(localStorage.getItem('AUTH_TOKEN'));
    this.ownProfile = this.info.user == decodedToken.username;
  }

  removeNote(id: string){
    this.notesService.removeNote(id).subscribe({
      next:(result) => {
        this.toastr.show(result.msg);
      },error:(err) => {
        this.toastr.show(err);
      }
    })
  }

}

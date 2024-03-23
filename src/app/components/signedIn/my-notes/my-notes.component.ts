import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { NotesService } from '../../../services/notes.service';


@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent {
  filter={};
  notes: any[];
  loading: boolean = true;

  constructor(private notesService: NotesService, private router: Router, private profileService: UsersService, private toastr: ToastrService){

  }

  ngOnInit():void{
    try {
      const decodedToken: any = jwtDecode(localStorage.getItem('AUTH_TOKEN'));
      const username = decodedToken.username;
      this.filter = {
        username: username
      }
    } catch (error) {
      console.log(error)
    }
    this.getMyNotes(this.filter);
  }

  async getMyNotes(filter){
    const notes = await this.notesService.getNotes(filter);
    if(typeof(notes) !== 'boolean'){
      if(notes.length > 0){
        this.notes=[];
        notes.forEach(note => {
          note.updatedAt = this.formatDate(note.updatedAt);
          this.notes.push(note);
        });
      }
    }
    console.log(typeof(notes))
      this.loading = false;
  }

  formatDate(stringDate){
    const date = new Date(stringDate);
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm');
    return formattedDate;
  }

  removeNote(id: string){
    this.notesService.removeNote(id).subscribe({
      next:(result) => {
        this.toastr.show(result.msg);
        this.getMyNotes(this.filter);
        this.router.navigate(['/notes'])
      },error:(err) => {
        this.toastr.show(err);
      }
    })
  }


}

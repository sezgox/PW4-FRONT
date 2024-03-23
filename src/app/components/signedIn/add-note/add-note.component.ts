import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  note: Note;
  showMsg: boolean = false;
  msg: string;

  title: FormControl = new FormControl('',[Validators.required]);
  description: FormControl = new FormControl('',[Validators.required]);
  showAll: FormControl = new FormControl('true',[Validators.required]);
  addForm = new FormGroup({
    title: this.title,
    description: this.description,
    showAll: this.showAll
  });

  constructor(private notesService: NotesService, private router: Router, private toastr: ToastrService,private usersService: UsersService){

  }

  ngOnInit(){
    this.isAuth()
  }

  async isAuth(){
    const auth = await this.usersService.isAuth();
    if(!auth){
      this.router.navigate(['/login'])
      this.toastr.show('You must sign in first')
    }
  }

  async addNote(){
    if(!this.addForm.valid){
      alert('You must fill al the fields')
    }else{
      this.note = {
        title: this.addForm.value.title,
        description: this.addForm.value.description,
        showAll: this.addForm.value.showAll
      }
      const result = await this.notesService.addNote(this.note);
      if (result == false){
        this.toastr.show('Hubo un error al intentar crear la nota')
      }else{
        this.toastr.show(result.msg)
        this.router.navigate(['/notes'])
      }
    }
  }

}

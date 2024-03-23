import { Component } from '@angular/core';
import { format } from 'date-fns';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  filter={
    showAll: "true",
    username: undefined,
    date: undefined
  };
  notes: Note[];
  loading: boolean = true;
  username: string;
  date;

  constructor(private notesService: NotesService){

  }

  ngOnInit():void{
    this.getFeedNotes(this.filter);
  }

  save(){
    this.filter.username = this.username;
    this.filter.date = this.date;
    this.getFeedNotes(this.filter);
  }

  async getFeedNotes(filter){
    this.loading = true;
    const result = await this.notesService.getNotes(filter);
    if(result == false){
      return
    }else{
      this.notes = [];
      const notes = result as Note[];
      notes.forEach(note => {
        this.notes.push(note);
      });
      this.loading =  false;
    }
    
  }

  /* TODO: REVISAR ESTA VAINA XD */
  formatDate(stringDate){
    const date = new Date(stringDate);
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm');
    return formattedDate;
  }
}
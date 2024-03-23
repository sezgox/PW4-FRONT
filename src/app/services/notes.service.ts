import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NOTES_ENDPOINT, environment } from 'src/env';
import { Note } from '../interfaces/note';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient, private restService: RestService, private toastr: ToastrService) { }

  token: string;
  url: string = environment.apiUrl;
  notes: string = NOTES_ENDPOINT.notes;
  add: string = NOTES_ENDPOINT.add;
  edit: string = NOTES_ENDPOINT.edit;

  getToken(){
    this.token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  async getNotes(filter):Promise<Note[] | false>{
    let queryParams = '';
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        queryParams += `${key}=${filter[key]}&`;
      }
    });
  
    // Eliminamos el último '&' si existe
    if (queryParams.length > 0) {
      queryParams = queryParams.slice(0, -1);
    }
    const headers = this.getToken();
    const query = '?'.concat(queryParams);
    const path = this.url.concat(this.notes.concat(query));

    return await this.restService.get(path,headers);
  }

  async getNoteToEdit(id: string):Promise<Note | false>{
    const headers = this.getToken();
    const endpoint = this.notes.concat(this.edit)
    const path = this.url.concat(endpoint.concat(id));
    return await this.restService.get(path,headers);
  }

  async addNote(note):Promise<any | boolean>{
    const headers = this.getToken();
    const path = `${this.url}${this.notes}${this.add}`;
    return await this.restService.post(path,note,headers);
  }


  editNote(id: string, note: Note):Observable<any>{
    const headers = this.getToken();
    return this.http.put(`http://localhost:3002/notes/edit/${id}`, note, {headers});
  }

  removeNote(id: string):Observable<any>{
    const headers = this.getToken();
    return this.http.delete(`http://localhost:3002/notes/${id}`,{headers});
  }

}

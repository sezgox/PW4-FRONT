import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  ownProfile: boolean;
  loading: boolean = true;
  
  filter: any = {};

  username: string;
  profileInfo = {
    username: '',
    description: '',
    memberSince: '',
  }
  notes: any[];

  constructor(private userProfile: UsersService,private notesService: NotesService,private route: ActivatedRoute,private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const newUsername = params['user'];
        if (this.username !== newUsername) {
          this.username = newUsername;
          this.filter.username = this.username;
          this.ownProfile = this.username == localStorage.getItem('USERNAME');
        }
        this.loadProfile();
      }
    });
  }

  private async loadProfile() {
    const profile = await this.userProfile.getProfile(this.username)
    if(profile == false){
      this.router.navigate(['/feed']);
      return
    }
    this.profileInfo.username = profile.username;
    this.profileInfo.description = profile.description ? profile.description : 'Nothing yet...';
    this.profileInfo.memberSince = profile.createdAt;
    const result = await this.notesService.getNotes(this.filter);
    if(result == false){
      return
    }
    const notes = result as Note[];
    if(notes.length > 0){
      this.notes = [];
      notes.forEach(note => {
        this.notes.push(note);
      });
    }
    this.loading = false;
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './components/signedIn/add-note/add-note.component';
import { EditComponent } from './components/signedIn/edit/edit.component';
import { FeedComponent } from './components/signedIn/feed/feed.component';
import { MyNotesComponent } from './components/signedIn/my-notes/my-notes.component';
import { ProfileComponent } from './components/signedIn/profile/profile.component';
import { LoginComponent } from './components/signedOut/login/login.component';
import { RegisterComponent } from './components/signedOut/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'feed',  component: FeedComponent },
  { path: 'notes',  component: MyNotesComponent },
  { path: 'profile/:user', component: ProfileComponent },
  { path: 'notes/add', component: AddNoteComponent},
  { path: 'notes/edit/:id', component: EditComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

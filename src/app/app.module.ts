import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './components/signedIn/add-note/add-note.component';
import { EditComponent } from './components/signedIn/edit/edit.component';
import { FeedComponent } from './components/signedIn/feed/feed.component';
import { MyNotesComponent } from './components/signedIn/my-notes/my-notes.component';
import { NavbarComponent } from './components/signedIn/navbar/navbar.component';
import { ProfileComponent } from './components/signedIn/profile/profile.component';
import { LoginComponent } from './components/signedOut/login/login.component';
import { RegisterComponent } from './components/signedOut/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyNotesComponent,
    EditComponent,
    NavbarComponent,
    ProfileComponent,
    AddNoteComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'top',
      preventDuplicates: true,
      timeOut: 2000
    }),
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

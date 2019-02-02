import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {
  MatInputModule,
   MatCardModule,
   MatButtonModule,
   MatToolbarModule,
   MatExpansionModule,
   MatProgressSpinnerModule,
   MatPaginatorModule
} from '@angular/material';


import {ReactiveFormsModule, FormsModule,  NgModel} from '@angular/forms';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './post-list/post-list.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';

// need to import nested components to add it in ng module declarations to be able to use them

// Angular thinks in modules/applcaitions, which define components of app

@NgModule({
  //declaring app component to register it with angular
  //App component is our root component, others are nested into it
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    ChatComponent
  ],
  //imports more modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule


  ],
  providers: [],
  //Tell angular to search index html file, lets it find selectors

  bootstrap: [AppComponent]
})
export class AppModule { }

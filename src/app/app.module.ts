import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { PlayeroneComponent } from './playerone/playerone.component';
import { PlayertwoComponent } from './playertwo/playertwo.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr'; 

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PlayeroneComponent,
    PlayertwoComponent,
    NavComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule, 
    ToastModule.forRoot(),
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

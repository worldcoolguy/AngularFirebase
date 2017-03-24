import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components that we want to route
import { PlayeroneComponent } from './playerone/playerone.component';
import { PlayertwoComponent } from './playertwo/playertwo.component';
import { ContentComponent } from './content/content.component'; 

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'  },
    { path: 'playerone', component: PlayeroneComponent },
    { path: 'playertwo', component: PlayertwoComponent },
    { path: 'home', component: ContentComponent },
    { path: '**', component: ContentComponent}
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})

export class AppRoutingModule {}

export const routingComponents = [ PlayeroneComponent, PlayertwoComponent, ContentComponent]
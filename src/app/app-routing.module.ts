import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsListComponent } from './events-list/events-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';
import { ParticipantAddEditComponent } from './participant-add-edit/participant-add-edit.component';
import { GenerateMatchesComponent } from './generate-matches/generate-matches.component';


const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'events/add-edit', component: EventAddEditComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'participants/add-edit', component: ParticipantAddEditComponent },
  { path: 'participants/:id', component: ParticipantDetailsComponent },
  { path: 'events/:id/generate-matches', component: GenerateMatchesComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SecretSantaApiService } from './shared/secret-santa-api.service';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { EventsListComponent } from './events-list/events-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';
import { FormsModule } from '@angular/forms';
import { ParticipantAddEditComponent } from './participant-add-edit/participant-add-edit.component';
import { MatchesGeneratedComponent } from './matches-generated/matches-generated.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDetailComponent,
    PageNotFoundComponent,
    EventsListComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    ParticipantDetailsComponent,
    EventAddEditComponent,
    ParticipantAddEditComponent,
    MatchesGeneratedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    SecretSantaApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

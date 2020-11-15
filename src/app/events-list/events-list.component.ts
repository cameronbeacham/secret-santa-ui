import { Component, OnInit, Input } from '@angular/core';
import { SecretSantaEvent } from '../shared/models/event.model';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent {
  public loading: boolean;
  public events: SecretSantaEvent[];

  constructor(secretSantaService: SecretSantaApiService) {
    this.loading = true;
    secretSantaService.getEvents().subscribe((res) => {
      this.events = res;
      this.loading = false;
    })
  }
}

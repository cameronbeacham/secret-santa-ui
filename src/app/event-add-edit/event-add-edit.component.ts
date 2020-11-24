import { Component, OnInit } from '@angular/core';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretSantaEvent } from '../shared/models/event.model';

@Component({
  selector: 'event-add-edit',
  templateUrl: './event-add-edit.component.html',
  styleUrls: ['./event-add-edit.component.scss']
})
export class EventAddEditComponent {

  public loading: boolean;
  public eventId: string;
  public event: SecretSantaEvent;

  constructor(private secretSantaService: SecretSantaApiService, 
    route: ActivatedRoute,
    private router: Router) {
      this.loading = true;
    route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];

      if (this.eventId) {
        secretSantaService.getEventById(this.eventId).subscribe(evt => {
          this.event = evt;
          this.loading = false;
        })
      }
      else {
        this.event = {
          disableReply: true
        } as SecretSantaEvent;
        this.loading = false;
      }
    })
   }

   saveEvent() {
    if (this.eventId) {
      this.secretSantaService.editEvent(this.eventId, this.event).subscribe(
        res => {
          this.router.navigate(['/events', this.eventId]);
        }
      )
    }
    else {
      this.secretSantaService.createEvent(this.event).subscribe(res => {
        this.router.navigate(['']);
      })
    }
   }
}

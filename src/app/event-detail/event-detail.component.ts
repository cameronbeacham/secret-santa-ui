import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { SecretSantaEvent } from '../shared/models/event.model';
import { forkJoin } from 'rxjs';
import { SecretSantaParticipant } from '../shared/models/participant.model';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public eventId: string;
  public event: SecretSantaEvent;
  public participants: SecretSantaParticipant[]
  public loading: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private secretSantaService: SecretSantaApiService) {
      this.loading = true;
      this.route.params.subscribe(params => {
        this.eventId = params['id'];
      });
      forkJoin(
        this.secretSantaService.getEventById(this.eventId),
        this.secretSantaService.getParticipants(this.eventId)
      )
      .subscribe((res) => {
        this.event = res[0];
        this.participants = res[1];
        this.loading = false;
      }, (error) => {
        this.router.navigate(['not-found']);
      })
    }

  deleteEvent() {
    this.secretSantaService.deleteEvent(this.eventId).subscribe(res => {
      this.router.navigate(['']);
    })
  }

  generateMatches() {
    this.secretSantaService.generateMatches(this.eventId).subscribe(res => {
      this.router.navigate(['/matches-generated'], { queryParams: { 'eventId': this.event.id, 'eventName': this.event.name }});
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { SecretSantaParticipant } from '../shared/models/participant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SecretSantaEvent } from '../shared/models/event.model';

declare var $: any;

@Component({
  selector: 'participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent {
  public participant: SecretSantaParticipant;
  public restrictions: SecretSantaParticipant[];
  public participantId: string;
  public loading: boolean;
  public matchesSent: boolean;
  public successfullyResent: boolean;
  public resendLoading: boolean;
  public event: SecretSantaEvent;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private secretSantaService: SecretSantaApiService) {
      this.loading = true;
      this.route.params.subscribe(params => {
        this.participantId = params['id'];
      });

      this.secretSantaService.getParticipantById(this.participantId).subscribe((res) => {
        this.participant = res;

        this.secretSantaService.getEventById(this.participant.eventId).subscribe((evt) => {
          this.matchesSent = evt.matchesGenerated;
          if (this.participant.restrictions.length > 0) {
            let restrictionsObs: Observable<SecretSantaParticipant>[] = [];
            this.participant.restrictions.forEach((restriction) => {
              let participant: Observable<SecretSantaParticipant> = this.secretSantaService.getParticipantById(restriction);
              restrictionsObs.push(participant);
            });
            forkJoin(restrictionsObs).subscribe((restrictions) => {
              this.restrictions = restrictions;
              this.loading = false;
            });
          }
          else {
            this.loading = false;
          }
        })
        
      });
    }

    public resendMatch() {
      this.resendLoading = true;
      this.secretSantaService.resendMatch(this.participantId).subscribe((res) => {
        this.successfullyResent = true;
        $(document).ready(function(){
          $("#myToast").toast('show');
        });
        this.resendLoading = false;
      });
    }

    public loadRestriction(participantId: string) {
      this.router.navigateByUrl(`/participants/${participantId}`);
    }

    deleteParticipant() {
      this.secretSantaService.deleteParticipant(this.participantId).subscribe(res => {
        this.router.navigate(['/events', this.participant.eventId ]);
      })
    }
}

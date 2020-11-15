import { Component, OnInit } from '@angular/core';
import { SecretSantaParticipant } from '../shared/models/participant.model';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-participant-add-edit',
  templateUrl: './participant-add-edit.component.html',
  styleUrls: ['./participant-add-edit.component.scss']
})
export class ParticipantAddEditComponent {

  public loading: boolean;
  public eventId: string;
  public participantId: string;
  public participant: SecretSantaParticipant;
  public currentRestrictions: SecretSantaParticipant[];
  public availableRestrictions: SecretSantaParticipant[];
  public newRestriction: string;
  public newGiftLink: string;

  constructor(private secretSantaService: SecretSantaApiService, 
    route: ActivatedRoute,
    private router: Router) {
      this.loading = true;
    route.queryParams.subscribe(params => {
      this.participantId = params['participantId'];
      this.eventId = params['eventId'];

      if (this.participantId) {
        secretSantaService.getParticipantById(this.participantId).subscribe(p => {
          this.participant = p;
          this.eventId = p.eventId;

          this.getOtherParticipants(this.eventId);
        })
      }
      else {
        this.participant = {
          eventId: this.eventId
        } as SecretSantaParticipant;

        this.getOtherParticipants(this.eventId);
      }
    })
   }

   getOtherParticipants(eventId: string) {
    this.secretSantaService.getParticipants(this.eventId).subscribe(res => {
      this.availableRestrictions = res;
      if (this.participantId) {
        let index = this.availableRestrictions.findIndex(p => p.id === this.participantId);
        this.availableRestrictions.splice(index, 1);
      }
      this.loading = false;
      this.getRestrictions();
    });
   }

   getRestrictions() {
     this.currentRestrictions = [] as SecretSantaParticipant[];
     if (this.participant.restrictions && this.participant.restrictions.length > 0)
      this.participant.restrictions.forEach(r => 
        this.currentRestrictions.push(this.availableRestrictions.find(p => p.id === r))
      );
   }

   removeRestriction(participantId: string) {
     if (this.currentRestrictions || this.currentRestrictions.length > 0) {
       let restrictionToRemove = this.currentRestrictions.findIndex(r => r.id === participantId);
       if (restrictionToRemove > -1) {
         this.currentRestrictions.splice(restrictionToRemove, 1);
         this.participant.restrictions.splice(this.participant.restrictions.findIndex(r => r === participantId), 1);
       }
     }
   }

   addRestriction() {
     if (!(this.currentRestrictions && this.currentRestrictions.length > 0) || this.currentRestrictions.find(r => r.id !== this.newRestriction)) {
      this.currentRestrictions.push(this.availableRestrictions.find(p => p.id == this.newRestriction))
      this.participant.restrictions.push(this.newRestriction);
     }
   }

   addGiftLink() {
    if (this.participant.giftLinks && this.participant.giftLinks.length > 0) {
      this.participant.giftLinks.push(this.newGiftLink);
    }
    else {
      this.participant.giftLinks = [ this.newGiftLink ];
    }
   }

   removeGiftLink(link: string) {
     if (this.participant.giftLinks && this.participant.giftLinks.length > 0) {
       let index = this.participant.giftLinks.findIndex(l => l === link);
       if (index > -1) {
         this.participant.giftLinks.splice(index, 1);
       }
     }
   }

   saveEvent() {
    if (this.participantId) {
      this.secretSantaService.editParticipant(this.participantId, this.participant).subscribe(
        res => {
          this.router.navigate(['/participants', this.participantId]);
        }
      )
    }
    else {
      this.secretSantaService.createParticipant(this.participant).subscribe(res => {
        this.router.navigate(['/events', this.eventId]);
      })
    }
   }
}

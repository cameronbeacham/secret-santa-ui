import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretSantaApiService } from '../shared/secret-santa-api.service';
import { forkJoin } from 'rxjs';
import { SecretSantaEvent } from '../shared/models/event.model';

declare var $: any;

@Component({
  selector: 'app-generate-matches',
  templateUrl: './generate-matches.component.html',
  styleUrls: ['./generate-matches.component.scss']
})
export class GenerateMatchesComponent {
  public eventId: string;
  public event: SecretSantaEvent;
  public loading: boolean;
  public generateLoading: boolean;
  public successfullyGenerated: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private secretSantaService: SecretSantaApiService) {
      this.loading = true;
      this.route.params.subscribe(params => {
        this.eventId = params['id'];
      });
      this.secretSantaService.getEventById(this.eventId).subscribe((res) => {
        this.event = res;
        this.loading = false;
      }, (error) => {
        this.router.navigate(['not-found']);
      });
    }

  generateMatches() {
    this.generateLoading = true;
    this.secretSantaService.generateMatches(this.eventId).subscribe(res => {
      this.successfullyGenerated = true;
      $(document).ready(function(){
        $("#myToast").toast('show');
      });
      this.generateLoading = false;
    })
  }
}

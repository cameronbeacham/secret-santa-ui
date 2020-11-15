import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matches-generated',
  templateUrl: './matches-generated.component.html',
  styleUrls: ['./matches-generated.component.scss']
})
export class MatchesGeneratedComponent {
  public eventName: string;
  public eventId: string;

  constructor(private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.eventName = params['eventName'];
        this.eventId = params['eventId'];
        debugger;
      });
    }

}

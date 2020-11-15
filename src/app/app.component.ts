import { Component } from '@angular/core';
import { SecretSantaApiService } from './shared/secret-santa-api.service';
import { SecretSantaEvent } from './shared/models/event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'secret-santa-ui';
}

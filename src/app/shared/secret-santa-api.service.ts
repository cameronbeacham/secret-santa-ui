import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SecretSantaEvent } from './models/event.model';
      
import { Observable } from 'rxjs';
import { SecretSantaParticipant } from './models/participant.model';

@Injectable()
export class SecretSantaApiService {
  private baseUrl: string = 'https://secret-santa-app.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<SecretSantaEvent[]> {
    return this.http.get<SecretSantaEvent[]>(`${this.baseUrl}/secretsanta/events`);
  }

  getEventById(id: string): Observable<SecretSantaEvent> {
    return this.http.get<SecretSantaEvent>(`${this.baseUrl}/secretsanta/events/${id}`);
  }

  createEvent(event: SecretSantaEvent): Observable<any> {
    return this.http.post(`${this.baseUrl}/secretsanta/events`, event);
  }

  editEvent(eventId: string, event: SecretSantaEvent): Observable<any> {
    return this.http.put(`${this.baseUrl}/secretsanta/events/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/secretsanta/events/${eventId}`);
  }

  getParticipants(eventId: string): Observable<SecretSantaParticipant[]> {
    return this.http.get<SecretSantaParticipant[]>(`https://localhost:5001/secretsanta/events/${eventId}/participants`);
  }

  getParticipantById(participantId: string): Observable<SecretSantaParticipant> {
    return this.http.get<SecretSantaParticipant>(`https://localhost:5001/secretsanta/participants/${participantId}`);
  }

  createParticipant(participant: SecretSantaParticipant): Observable<any> {
    return this.http.post(`${this.baseUrl}/secretsanta/participants`, participant);
  }

  editParticipant(participantId: string, participant: SecretSantaParticipant): Observable<any> {
    return this.http.put(`${this.baseUrl}/secretsanta/participants/${participantId}`, participant);
  }

  deleteParticipant(participantId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/secretsanta/participants/${participantId}`);
  }

  generateMatches(eventId: string) {
    return this.http.post(`${this.baseUrl}/secretsanta/generatematches/${eventId}`, undefined);
  }
}
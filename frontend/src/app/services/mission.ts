import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8000/api';
  private wsUrl = 'ws://localhost:8000/ws';
  private socket$!: WebSocketSubject<any>;

  constructor(private http: HttpClient) {}

  deployMission(topic: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/mission`, { topic });
  }

  getMissionUpdates(): Observable<any> {
    this.socket$ = webSocket({
      url: this.wsUrl,
      openObserver: {
        next: () => console.log('WebSocket connection opened')
      }
    });
    return this.socket$.asObservable();
  }

  sendCommand(command: any) {
    if (this.socket$) {
      this.socket$.next(command);
    }
  }

  disconnect() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<any>(null);
  message$ = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
    this.startConnection();
    this.addMessageListener();
  }

  private startConnection(): void {
    const token = localStorage.getItem('jwtToken') || ''; // Default to an empty string if token is null

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7232/chathub', {
        accessTokenFactory: () => token // Pass token with the connection
      })
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected');
    });
  }

  private addMessageListener(): void {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string, read: boolean) => {
      this.messageSource.next({ user, message, read });
    });
  }

  sendMessage(user: string, message: string): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMessage', user, message)
        .catch(err => console.error('Error while sending message: ' + err));
    }
  }

  markMessageAsRead(user: string, message: string): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('MessageSeen', user, message)
        .catch(err => console.error('Error while marking message as read: ' + err));
    }
  }
}

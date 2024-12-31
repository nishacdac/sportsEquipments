import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {

  user: string = '';
  message: string = '';
  messages: { user: string, message: string, read: boolean }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('firstName');
    this.user = storedUsername ? storedUsername.replace(/['"]+/g, '') : 'Unknown User';

    // Subscribe to message observable
    this.chatService.message$.subscribe(msg => {
      if (msg && msg.user && msg.message) { // Null-check for msg
        this.messages.push({ user: msg.user, message: msg.message, read: false });
      }
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.user, this.message);
      this.message = ''; // Clear the message input
    }
  }

  markMessageAsRead(msg: { user: string, message: string, read: boolean }): void {
    msg.read = true; // Mark the message as read locally
    this.chatService.markMessageAsRead(msg.user, msg.message);
  }
}

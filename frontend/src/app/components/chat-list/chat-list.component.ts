import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { ChatSession } from '../../models/chat.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: ChatSession[] = [];
  newChatTitle: string = '';

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chatService.getChatSessions().subscribe(chats => {
      this.chats = chats;
    });
  }

  createChat() {
    if (this.newChatTitle.trim()) {
      this.chatService.createChatSession(this.newChatTitle).subscribe(chat => {
        this.chats.push(chat);
        this.newChatTitle = '';
      });
    }
  }

  deleteChat(id: string) {
    this.chatService.deleteChatSession(id).subscribe(() => {
      this.chats = this.chats.filter(chat => chat._id !== id);
    });
  }
}
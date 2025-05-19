import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { SearchService } from '../../services/search.service';
import { ChatSession, ChatMessage } from '../../models/chat.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.css']
})
export class ChatSessionComponent implements OnInit {
  chat: ChatSession | null = null;
  languages: string[] = [];
  newMessage: ChatMessage = { message: '', language: 'python', timestamp: new Date() };

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadChatSession(id);
    }
    this.loadLanguages();
  }

  loadChatSession(id: string) {
    this.chatService.getChatSession(id).subscribe(chat => {
      this.chat = chat;
    });
  }

  loadLanguages() {
    this.searchService.getSupportedLanguages().subscribe(languages => {
      this.languages = languages['languages'];
      if (this.languages.length) {
        this.newMessage.language = this.languages[0];
      }
    });
  }

  sendMessage() {
    if (this.chat && this.newMessage.message.trim()) {
      this.chatService.addMessage(this.chat._id, this.newMessage).subscribe(updatedChat => {
        this.chat = updatedChat;
        this.newMessage = { message: '', language: this.newMessage.language, timestamp: new Date() };
      });
    }
  }
}
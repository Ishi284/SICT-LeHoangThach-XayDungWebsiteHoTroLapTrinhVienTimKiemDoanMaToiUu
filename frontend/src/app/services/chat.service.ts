import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ChatSession, ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  createChatSession(title: string): Observable<ChatSession> {
    return this.http.post<ChatSession>(`${environment.apiUrl}/chat`, { title });
  }

  getChatSessions(): Observable<ChatSession[]> {
    return this.http.get<ChatSession[]>(`${environment.apiUrl}/chat`);
  }

  getChatSession(id: string): Observable<ChatSession> {
    return this.http.get<ChatSession>(`${environment.apiUrl}/chat/${id}`);
  }

  updateChatSession(id: string, title: string): Observable<ChatSession> {
    return this.http.patch<ChatSession>(`${environment.apiUrl}/chat/${id}`, { title });
  }

  deleteChatSession(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/chat/${id}`);
  }

  addMessage(sessionId: string, message: ChatMessage): Observable<ChatSession> {
    return this.http.post<ChatSession>(`${environment.apiUrl}/chat/${sessionId}/messages`, message);
  }
}
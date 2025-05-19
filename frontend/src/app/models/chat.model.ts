export interface ChatSession {
  _id: string;
  title: string;
  messages: ChatMessage[];
  created_at: Date;
  updated_at: Date;
  user_id?: string;
}

export interface ChatMessage {
  message: string;
  language: string;
  timestamp: Date;
  results?: CodeSearchResult[];
}

export interface CodeSearchResult {
  code: string;
  similarity: number;
  distance: number;
}
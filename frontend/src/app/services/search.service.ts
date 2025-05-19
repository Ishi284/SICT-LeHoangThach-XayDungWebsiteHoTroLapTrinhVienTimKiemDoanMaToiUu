import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SearchQuery } from '../models/search.model';
import { CodeSearchResult } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchCode(query: SearchQuery): Observable<CodeSearchResult[]> {
    return this.http.post<CodeSearchResult[]>(`${environment.apiUrl}/search`, query);
  }

  getSupportedLanguages(): Observable<{ languages: string[] }> {
    return this.http.get<{ languages: string[] }>(`${environment.apiUrl}/search/languages`);
  }
}
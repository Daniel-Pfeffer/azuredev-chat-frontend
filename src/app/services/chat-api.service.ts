import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {CreateChatDto} from '../data/CreateChatDto';
import {CacheService} from './cache.service';
import {ChatDto} from '../data/ChatDto';
import {MessageDto} from '../data/MessageDto';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private apiUrl = 'https://chat-app-bccjajayepe9gnek.germanywestcentral-01.azurewebsites.net/api/chat';

  constructor(private http: HttpClient, private cacheService: CacheService) {
  }

  getChats(): Observable<ChatDto[]> {
    const cacheKey = 'getChats';
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    return this.http.get<ChatDto[]>(`${this.apiUrl}`).pipe(
      tap(data => this.cacheService.set(cacheKey, data))
    );
  }

  createChat(dto: CreateChatDto): Observable<string> {
    this.cacheService.clear(); // Clear cache on data modification
    return this.http.post<string>(`${this.apiUrl}`, dto, {responseType: 'text' as 'json'});
  }

  inviteUserToChat(chatId: string, userId: string): Observable<void> {
    this.cacheService.clear(); // Clear cache on data modification
    return this.http.post<void>(`${this.apiUrl}/${chatId}/member/${userId}`, {});
  }

  removeUserFromChat(chatId: string, userId: string): Observable<void> {
    this.cacheService.clear(); // Clear cache on data modification
    return this.http.delete<void>(`${this.apiUrl}/${chatId}/member/${userId}`);
  }

  deleteChat(chatId: string): Observable<void> {
    this.cacheService.clear(); // Clear cache on data modification
    return this.http.delete<void>(`${this.apiUrl}/${chatId}`);
  }

  updateChat(chatId: string, dto: CreateChatDto): Observable<void> {
    this.cacheService.clear(); // Clear cache on data modification
    return this.http.put<void>(`${this.apiUrl}/${chatId}`, dto);
  }

  getChat(chatId: string): Observable<ChatDto> {
    const cacheKey = `getChat-${chatId}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    return this.http.get<ChatDto>(`${this.apiUrl}/${chatId}`).pipe(
      tap(data => this.cacheService.set(cacheKey, data))
    );
  }

  getMessages(chatId: string): Observable<MessageDto[]> {
    const cacheKey = `getMessages-${chatId}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    return this.http.get<MessageDto[]>(`${this.apiUrl}/${chatId}/messages`).pipe(
      tap(data => this.cacheService.set(cacheKey, data))
    );
  }

  getMessage(messageId: string): Observable<MessageDto> {
    const cacheKey = "getMessage-" + messageId;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    return this.http.get<MessageDto>(`${this.apiUrl}/message/${messageId}`);
  }
}


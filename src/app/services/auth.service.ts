import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USERNAME_KEY = 'username';

  login(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USERNAME_KEY);
  }

  currentUser(): string {
    return localStorage.getItem(this.USERNAME_KEY)!;
  }

  clear(): void {
    localStorage.removeItem(this.USERNAME_KEY);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authTokenKey: string = 'auth_token';
  private usernameKey: string = 'username';

  constructor() {}

  isAuthenticatedUser(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((user: any) => user.username === username);
    if (existingUser) {
      return false;
    }

    const newUser = { username, password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    return true;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.authTokenKey, 'User ' + username);
      localStorage.setItem(this.usernameKey, username);
      return true;
    } else {
      return false;
    }
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey) || '';
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.usernameKey);
  }
}

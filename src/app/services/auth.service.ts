import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, JwtAuthenticationResponse, UserInfo, UserRole } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'user_info';

  private currentUserSubject = new BehaviorSubject<UserInfo | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.accessToken && response.userInfo) {
            this.setToken(response.accessToken);
            this.setUser(response.userInfo);
            this.currentUserSubject.next(response.userInfo);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getCurrentUser(): UserInfo | null {
    // First try to get from BehaviorSubject
    let user = this.currentUserSubject.value;
    
    // If not found, try to get from localStorage
    if (!user) {
      user = this.getUserFromStorage();
      if (user) {
        this.currentUserSubject.next(user);
      }
    }
    
    return user;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  isMedico(): boolean {
    return this.hasRole(UserRole.MEDICO);
  }

  isPaciente(): boolean {
    return this.hasRole(UserRole.PACIENTE);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setUser(user: UserInfo): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  private getUserFromStorage(): UserInfo | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
}
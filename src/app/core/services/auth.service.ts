import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { INITIAL_USERS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_STORAGE_KEY = 'urlms_users';
  private readonly CURRENT_USER_KEY = 'urlms_current_user';

  private usersSignal = signal<User[]>(this.loadUsers());
  private currentUserSignal = signal<User | null>(this.loadCurrentUser());

  public currentUser = computed(() => this.currentUserSignal());
  public users = computed(() => this.usersSignal());
  public isAuthenticated = computed(() => !!this.currentUserSignal());
  public currentRole = computed(() => this.currentUserSignal()?.role || null);

  constructor(private router: Router) {}

  private loadUsers(): User[] {
    const saved = localStorage.getItem(this.USERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved users', e);
      }
    }
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return [...INITIAL_USERS];
  }

  private loadCurrentUser(): User | null {
    const saved = localStorage.getItem(this.CURRENT_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current user', e);
      }
    }
    // Default to Dr. Arthur Vance (ADMIN) or Dr. Elena Sharma (PI)
    const defaultUser = INITIAL_USERS[0];
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }

  public login(email: string): boolean {
    const found = this.usersSignal().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      this.setCurrentUser(found);
      return true;
    }
    return false;
  }

  public switchRole(role: UserRole): void {
    const targetUser = this.usersSignal().find(u => u.role === role);
    if (targetUser) {
      this.setCurrentUser(targetUser);
    }
  }

  public setCurrentUser(user: User): void {
    this.currentUserSignal.set(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  public logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  public hasRole(roles: UserRole[]): boolean {
    const current = this.currentUserSignal();
    if (!current) return false;
    return roles.includes(current.role);
  }

  public addUser(user: User): void {
    const updated = [...this.usersSignal(), user];
    this.usersSignal.set(updated);
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(updated));
  }

  public updateUser(user: User): void {
    const updated = this.usersSignal().map(u => u.id === user.id ? user : u);
    this.usersSignal.set(updated);
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(updated));
    if (this.currentUserSignal()?.id === user.id) {
      this.currentUserSignal.set(user);
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    }
  }
}

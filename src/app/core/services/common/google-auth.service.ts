import { Injectable, signal, WritableSignal } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { from, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { USER_STORAGE_KEY } from '../../constants/user-storage-key';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  $user: WritableSignal<User | null> = signal(null);
  constructor(private readonly storageService: StorageService) {}

  singIn(): Observable<User> {
    return from(GoogleAuth.signIn());
  }

  loadUserFromStorage(): Observable<User | null> {
    return new Observable((observer) => {
      observer.next(this.storageService.getItem(USER_STORAGE_KEY));
      observer.complete();
    });
  }

  setUser(user: User | null): void {
    this.$user.set(user);
  }
}

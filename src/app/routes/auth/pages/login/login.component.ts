import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  catchError,
  concatMap,
  EMPTY,
  exhaustMap,
  from,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/core/constants/user-storage-key';
import { GoogleAuthService } from 'src/app/core/services/common/google-auth.service';
import { StorageService } from 'src/app/core/services/common/storage.service';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonAlert, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
  providers: [AutoDestroyService],
  standalone: true,
})
export class LoginComponent implements OnInit {
  login$: Subject<void> = new Subject<void>();
  constructor(
    private readonly gAuthService: GoogleAuthService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly destroy$: AutoDestroyService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.subscribeToLoginClicked();
  }

  subscribeToLoginClicked(): void {
    this.login$
      .pipe(
        exhaustMap(() =>
          this.gAuthService.singIn().pipe(
            catchError(() => {
              this.showLoginError();
              return EMPTY;
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((user) => {
        if (!user) return;
        this.storageService.setItem(USER_STORAGE_KEY, user);
        this.gAuthService.setUser(user);
        this.router.navigate(['']);
      });
  }

  showLoginError(): void {
    from(
      this.alertController.create({
        header: 'Error',
        message: 'An error occurred while trying to sign in. Try again.',
      })
    )
      .pipe(
        concatMap((alert) => alert.present()),
        take(1)
      )
      .subscribe();
  }
}

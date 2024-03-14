import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ILogin } from '../../shared/interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ISession } from '../../shared/interfaces/session.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject();

  showSignup: boolean = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  showSignupForm(): void {
    this.showSignup = !this.showSignup;
  }

  login(user: ILogin): void {
    this.authService.getUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          const userFound = res.find((u: ILogin) => {
            return u.email === user.email && u.password === user.password;
          });

          if (userFound) {
            this.sessionService.save({
              accessToken: userFound.email,
            });
            this.router.navigate(['/', 'home']);
          } else {
            this.openSnackBar('Usuário não existe');
          }
        },
        error: () => {
          this.openSnackBar('Usuário ou Senha inválido(s)!');
        }
      })
  }

  openSnackBar(text: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1500,
      data: text
    });
  }

  create(user: ILogin): void {
    this.authService.createUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.openSnackBar('Usuário criado com sucesso');
        },
        error: () => {
          this.openSnackBar('Houve um erro ao criar o usuário, tente novamente!');
        }
      })
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}

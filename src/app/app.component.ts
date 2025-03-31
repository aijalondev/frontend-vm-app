// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from "./components/notification/notification.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  exibirHeader(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

  logout(): void {
    this.authService.logout();
  }
}
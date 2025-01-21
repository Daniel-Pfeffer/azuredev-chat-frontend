import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatListComponent} from './chat-list/chat-list.component';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [ChatListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.dialog.open(LoginComponent);
    }
  }
}

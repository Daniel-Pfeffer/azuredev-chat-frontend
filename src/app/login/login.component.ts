import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../services/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';

  constructor(private authService: AuthService, private ref: MatDialogRef<LoginComponent>) {
  }

  onSubmit(): void {
    this.authService.login(this.username);
    this.ref.close();
  }
}

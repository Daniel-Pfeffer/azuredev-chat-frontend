import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-new-chat',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatInput,
    MatButton
  ],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.css'
})
export class NewChatComponent {
  chatName: string = '';

  constructor(public dialogRef: MatDialogRef<NewChatDialogComponent>) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.chatName);
  }
}

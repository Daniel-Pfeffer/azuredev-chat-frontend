import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MessageDto} from '../data/MessageDto';

@Component({
  selector: 'app-message',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() message: MessageDto | undefined;
}

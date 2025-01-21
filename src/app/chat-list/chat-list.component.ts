import {ChangeDetectorRef, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ChatApiService} from '../services/chat-api.service';
import {MatList, MatListItem} from '@angular/material/list';
import {ChatComponent} from '../chat/chat.component';
import {NgForOf, NgIf} from '@angular/common';
import {ChatDto} from '../data/ChatDto';
import {MatIcon} from '@angular/material/icon';
import {MatLine} from '@angular/material/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {NewChatComponent} from './new-chat/new-chat.component';

@Component({
  selector: 'app-chat-list',
  imports: [
    MatList,
    MatListItem,
    ChatComponent,
    NgForOf,
    MatIcon,
    MatLine,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    NgIf,
    MatButton
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit {
  chats: ChatDto[] = [];
  selectedChat: WritableSignal<ChatDto | undefined> = signal(undefined);

  constructor(private chatApiService: ChatApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.chatApiService.getChats().subscribe(chats => this.chats = chats);
  }

  selectChat(chat: ChatDto): void {
    this.selectedChat.set(chat);
  }

  createNewChat() {
    const dialogRef = this.dialog.open(NewChatComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.chatApiService.createChat({
          name: result,
          creatorId: 'me'
        }).subscribe(externalId => {
          this.chatApiService.getChat(externalId).subscribe(chat => {
            this.chats.push(chat);
          });
        });
      }
    })
  }
}

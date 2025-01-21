import {Component, input} from '@angular/core';
import {MessageComponent} from '../message/message.component';
import {NgClass, NgForOf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ChatApiService} from '../services/chat-api.service';
import {SendMessageDto} from '../data/SendMessage';
import {ChatDto} from '../data/ChatDto';
import {MessageDto} from '../data/MessageDto';
import {AuthService} from '../services/auth.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  imports: [
    MessageComponent,
    NgClass,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    NgForOf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  chat = input.required<ChatDto>();
  oldChatAtBeginning: ChatDto | undefined;

  messages: MessageDto[] = [];
  message: string | null = null;
  currentUser: string | undefined;

  private hubConnection: HubConnection | undefined;

  constructor(private chatApiService: ChatApiService, private authService: AuthService) {
    toObservable(this.chat).subscribe(chat => {
      this.chatApiService.getMessages(chat.externalId)
        .subscribe(messages => this.messages = messages);
      this.currentUser = this.authService.currentUser();
      if (!this.hubConnection || this.hubConnection.state === HubConnectionState.Disconnected) {
        this.startSignalRConnection()
      } else {
        this.disconnectFromChat(this.oldChatAtBeginning!.externalId);
        this.connectToChat();
      }
      this.oldChatAtBeginning = chat;
    });
  }

  private connectToChat(): void {
    this.hubConnection!.send("JoinChat", this.chat().externalId).then(() => console.log("Joined chat"));
  }

  private disconnectFromChat(chatExternal: string): void {
    this.hubConnection!.send("LeaveChat", chatExternal).then(() => console.log("Left chat"));
  }

  private startSignalRConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://chat-app-bccjajayepe9gnek.germanywestcentral-01.azurewebsites.net/chat")
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log("SignalR connection started");
        this.connectToChat();
      })
      .catch(err => console.error("Error while starting SignalR connection: " + err));

    this.hubConnection.on("message", (message: string) => {
      console.log("Received message: " + message);
      this.chatApiService.getMessage(message).subscribe(msg => {
        this.messages.push(msg)
      });
    })
  }

  public sendMessage(): void {
    if (!this.message) {
      return;
    }

    const sendMessageDto: SendMessageDto =
      {
        text: this.message,
        senderId: this.authService.currentUser()
      }

    this.hubConnection!.send("SendMessage", this.chat().externalId, sendMessageDto)
      .then(() => console.log("Message sent"))
      .catch(err => console.error("Error while sending message: " + err));
  }

  getMessageType(msg: MessageDto): string {
    return this.currentUser === msg.senderId ? 'own-message' : '';
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css'
})
export class DialogueComponent {
  currentMessage = '';
  allMessages: string[] = [];

  sendMessage(){
    if(this.currentMessage.trim() === '') return;
    this.allMessages.push(this.currentMessage);
    this.currentMessage = '';
  }
}

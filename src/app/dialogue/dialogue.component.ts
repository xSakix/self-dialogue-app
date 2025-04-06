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
  leftMessages: string[] = [];
  rightMessages: string[] = [];
  currentSide: 'left' | 'right' = 'left';

  sendMessage(){
    if(this.currentMessage.trim() === '') return;
    if(this.currentSide === 'left') {
      this.leftMessages.push(this.currentMessage);
      this.currentSide = 'right';
    } else {
      this.rightMessages.push(this.currentMessage);
      this.currentSide = 'left';
    }
    this.currentMessage = '';
  }
}

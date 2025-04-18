import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DialogueMessage{
  text: string;
  actor: 'left' | 'right';
}

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css'
})
export class DialogueComponent implements AfterViewChecked {
  
  newMessage= '';
  currentMessage: string = '';
  currentActor: 'left' | 'right' = 'right';
  allMessages: DialogueMessage[] = [];

  @ViewChild('messagesContainer') private messageContainerRef!: ElementRef<HTMLDivElement>;
  private shouldScrollToTheBottom: boolean = false;

  ngAfterViewChecked(): void {
    if(this.shouldScrollToTheBottom && this.messageContainerRef){
      this.scrollToBottom();
      this.shouldScrollToTheBottom = false;
    }
  }

  private scrollToBottom(): void {
    try{
      
      const element = this.messageContainerRef.nativeElement;
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);
    } catch(err){
      console.log("Could not scroll to the bottom:",err);
    }
  }
  

  sendMessage(){
    const textToSend = this.newMessage.trim();
    if(textToSend === '') return;
    const messageToSend:DialogueMessage = {
      text: textToSend,
      actor: this.currentActor
    }
    this.allMessages.push(messageToSend);
    this.newMessage = '';
    this.currentActor = this.currentActor === 'left' ? 'right' : 'left';
    this.shouldScrollToTheBottom = true;
  }

  setActor(actor: 'left' | 'right'){
    this.currentActor = actor;
  }
}

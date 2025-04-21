import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message{
  text: string;
  actor: 'left-actor' | 'right-actor';
}

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogueComponent implements OnInit,AfterViewChecked {
  
  @ViewChild('messagesContainer') private messageContainerRef!: ElementRef<HTMLDivElement>;

  messages: Message[] = [];
  newMessage: string = '';
  private shouldScrollToBottom: boolean = false;
  private currentActor: 'left-actor' | 'right-actor'= 'left-actor';

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if(this.shouldScrollToBottom && this.messageContainerRef){
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }


  private triggerScrollToBottom(){
    this.shouldScrollToBottom = true;
    this.cdr.detectChanges();
  }

  private scrollToBottom(): void {
    if (!this.messageContainerRef) {
        console.error('messageContainerRef is not defined');
        return;
    }
    // Use setTimeout to defer scroll until after the current browser repaint cycle
    setTimeout(() => {
        try {
            const element = this.messageContainerRef.nativeElement;
            console.log(`Scrolling: scrollTop=${element.scrollTop}, scrollHeight=${element.scrollHeight}`); // Add log
            element.scrollTop = element.scrollHeight;
            console.log(`After scroll: scrollTop=${element.scrollTop}`); // Add log
        } catch (err) {
            console.error("Could not scroll to the bottom:", err);
        }
    }, 0); // 0ms timeout is often enough
  }
  

  sendMessage(){
    const textToSend = this.newMessage.trim();
    if(textToSend === '') return;
    const messageToSend:Message = {
      text: textToSend,
      actor: this.currentActor
    }
    this.messages.push(messageToSend);
    this.newMessage = '';
    this.currentActor = this.currentActor === 'left-actor' ? 'right-actor' : 'left-actor';

    this.triggerScrollToBottom();
  }
  
}

import { Component } from '@angular/core';
import { DialogueComponent } from './dialogue/dialogue.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'self-dialogue-app';
}

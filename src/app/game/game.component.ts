import { WordService } from './../word.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { WORDS } from '../words';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  squares = [
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
    [{ class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }, { class: '', key: '' }],
  ];

  // keyboard = [
  //   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  //   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  //   ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  // ];

  keyboard = [
    { class: '', key: 'Q' }, { class: '', key: 'W' }, { class: '', key: 'E' },
    { class: '', key: 'R' }, { class: '', key: 'T' }, { class: '', key: 'Y' },
    { class: '', key: 'U' }, { class: '', key: 'I' }, { class: '', key: 'O' },
    { class: '', key: 'P' },
    { class: '', key: 'A' }, { class: '', key: 'S' }, { class: '', key: 'D' },
    { class: '', key: 'F' }, { class: '', key: 'G' }, { class: '', key: 'H' },
    { class: '', key: 'J' }, { class: '', key: 'K' }, { class: '', key: 'L' },
    { class: '', key: 'Enter' }, { class: '', key: 'Z' }, { class: '', key: 'X' },
    { class: '', key: 'C' }, { class: '', key: 'V' }, { class: '', key: 'B' },
    { class: '', key: 'N' }, { class: '', key: 'M' }, { class: '', key: 'Backspace' }
  ];

  currRowIndex = 0;
  currColIndex = 0;
  targetWord = '';
  won = false;
  done = false;
  notAWord = false;

  constructor(private service: WordService) { }

  ngOnInit(): void {
    this.targetWord = this.service.generateTargetWord();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.handleClick(event.key);
  }

  handleClick(key: string): void {
    if (key === 'Backspace') {
      if (this.currColIndex > 0) {
        this.squares[this.currRowIndex][--this.currColIndex] = { class: '', key: '' };
      }
    }
    else if (key === 'Enter') {
      this.pressedEnter();
    }
    else if (this.currColIndex < 5 && this.currRowIndex < 6) {
      this.squares[this.currRowIndex][this.currColIndex++] = { class: '', key: key };
    }

  }

  pressedEnter(): void {

    let word = this.squares[this.currRowIndex].map(k => {
      return k.key;
    }).join('').toUpperCase();

    if (!this.service.checkIfWord(word)) {
      this.notAWord = true;
      setTimeout(() => {
        this.notAWord = false;
      }, 3500);
      // deleting the wrong input from the screen
      // for (let i = 0; i < 5; i++) {
      //   this.squares[this.currRowIndex][i]['key'] = '';
      // }
      // this.currColIndex = 0;
    }
    else {
      for (let i = 0; i < 5; i++) {
        let guessLetter = this.squares[this.currRowIndex][i]['key'];
        let targetLetter = this.targetWord.charAt(i);
        let index = this.keyboard.findIndex(k => {
          return k.key == guessLetter.toUpperCase()
        }
        );
        if (guessLetter.toUpperCase() == targetLetter) {
          this.squares[this.currRowIndex][i]['class'] = 'green';
          this.keyboard[index].class = 'green';

        }
        else if (this.targetWord.indexOf(guessLetter.toUpperCase()) != -1) {
          this.squares[this.currRowIndex][i]['class'] = 'yellow';
          this.keyboard[index].class = 'yellow';

        }
        else {
          this.squares[this.currRowIndex][i]['class'] = 'gray';
          this.keyboard[index].class = 'gray';
        }
      }
      this.checkGameStatus();
      this.currRowIndex++;
      this.currColIndex = 0;
    }

  }

  checkGameStatus(): void {
    let counter = 0;
    for (let i = 0; i < 5; i++) {
      if (this.squares[this.currRowIndex][i]['class'] == 'green') {
        counter++;
      }
      else {
        break;
      }
    }
    if (counter == 5) {
      this.won = true;
    }
    else if (counter < 5 && this.currRowIndex == 5) {
      this.done = true;
    }
  }

  newGame(): void {
    location.reload();
  }
}



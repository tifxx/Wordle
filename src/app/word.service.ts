import { Injectable } from '@angular/core';
import { WORDS } from './words';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  generateTargetWord(): string {
    let index = Math.floor(Math.random() * WORDS.length);
    let targetWord = WORDS[index];
    console.log(targetWord);
    return targetWord;
  }

  checkIfWord(word: string): boolean {
    if (WORDS.includes(word))
      return true;
    else return false;
  }

}

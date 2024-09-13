import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PreventCharactersService {

  constructor() { }
  preventInvalidCharactersfromkeyboard(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
  
    if (
      !(charCode >= 65 && charCode <= 90) && // Uppercase letters
      !(charCode >= 97 && charCode <= 122) && // Lowercase letters
      charCode !== 32 && // Space
      charCode !== 45 && // Dash (-)
      charCode !== 39 // Apostrophe (')
    ) {
      event.preventDefault(); // Prevent the character from being entered
    }
  }
}

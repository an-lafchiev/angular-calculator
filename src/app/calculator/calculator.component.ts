import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../services/calculator.service';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  title = 'calculator';

  calculatorService = inject(CalculatorService);
  activeKey = signal<string | null>(null);

  get display() {
    return this.calculatorService.display;
  }

  buttonRows = [
    [
      { value: '%', type: 'function' },
      { value: 'CE', type: 'function' },
      { value: 'C', type: 'function' },
      { value: '⌫', type: 'function' },
    ],
    [
      { value: '¹⁄ₓ', type: 'function' },
      { value: 'x²', type: 'function' },
      { value: '²√x', type: 'function' },
      { value: '÷', type: 'operator' },
    ],
    [
      { value: '7', type: 'number' },
      { value: '8', type: 'number' },
      { value: '9', type: 'number' },
      { value: '×', type: 'operator' },
    ],
    [
      { value: '4', type: 'number' },
      { value: '5', type: 'number' },
      { value: '6', type: 'number' },
      { value: '-', type: 'operator' },
    ],
    [
      { value: '1', type: 'number' },
      { value: '2', type: 'number' },
      { value: '3', type: 'number' },
      { value: '+', type: 'operator' },
    ],
    [
      { value: '±', type: 'function' },
      { value: '0', type: 'number' },
      { value: '.', type: 'number' },
      { value: '=', type: 'equals' },
    ],
  ];

  private keyAliases: Record<string, string> = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': '+',
    '-': '-',
    '*': '×',
    x: '×',
    '/': '÷',
    Enter: '=',
    '=': '=',
    Escape: 'C',
    c: 'C',
    Backspace: '⌫',
    Delete: 'CE',
    '.': '.',
    '%': '%',
  };

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent): void {
    const buttonValue = this.keyAliases[event.key] ?? event.key;

    const button = this.buttonRows.flat().find((b) => b.value === buttonValue);

    if (button) {
      event.preventDefault();
      event.stopPropagation();
      this.activeKey.set(button.value);
      this.calculatorService.handleInput(button.value, button.type);

      setTimeout(() => this.activeKey.set(null), 150);
    }
  }

  handleButtonClick(button: any): void {
    this.calculatorService.handleInput(button.value, button.type);
  }
}

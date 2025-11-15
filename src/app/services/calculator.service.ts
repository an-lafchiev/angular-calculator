import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  display = signal('0');
  previousValue = signal<number | null>(null);
  operator = signal<string | null>(null);
  shouldResetDisplay = signal(false);

  constructor() {}

  handleInput(value: string, type: string): void {
    switch (type) {
      case 'number':
        this.handleNumber(value);
        break;
      case 'operator':
        this.handleOperator(value);
        break;
      case 'equals':
        this.handleEquals();
        break;
      case 'function':
        this.handleFunction(value);
        break;
    }
  }

  private handleNumber(num: string): void {
    if (num === '.') {
      this.handleDecimal();
      return;
    }

    if (this.shouldResetDisplay()) {
      this.display.set(num);
      this.shouldResetDisplay.set(false);
    } else {
      this.display.update((current) => (current === '0' ? num : current + num));
    }
  }

  private handleOperator(op: string): void {
    if (this.operator() && !this.shouldResetDisplay()) {
      this.handleEquals();
    }

    const current = parseFloat(this.display());
    this.previousValue.set(current);
    this.operator.set(op);
    this.shouldResetDisplay.set(true);
  }

  private handleEquals(): void {
    const prev = this.previousValue();
    const current = parseFloat(this.display());
    const op = this.operator();

    if (prev === null || op === null) return;

    const calculations: Record<string, number> = {
      '+': prev + current,
      '-': prev - current,
      '×': prev * current,
      '÷': current !== 0 ? prev / current : 0,
    };

    const result = calculations[op] ?? 0;
    this.display.set(result.toString());
    this.previousValue.set(null);
    this.operator.set(null);
    this.shouldResetDisplay.set(true);
  }

  private handleFunction(func: string): void {
    const functions: Record<string, () => void> = {
      C: () => this.clear(),
      CE: () => this.clearEntry(),
      '⌫': () => this.backspace(),
      '±': () => this.toggleSign(),
      '%': () => this.handlePercent(),
    };

    functions[func]();
  }

  private clear(): void {
    this.display.set('0');
    this.previousValue.set(null);
    this.operator.set(null);
    this.shouldResetDisplay.set(false);
  }

  private clearEntry(): void {
    this.display.set('0');
    this.shouldResetDisplay.set(false);
  }

  private backspace(): void {
    const current = this.display();
    this.display.set(current.length > 1 ? current.slice(0, -1) : '0');
  }

  private handleDecimal(): void {
    if (this.shouldResetDisplay()) {
      this.display.set('0.');
      this.shouldResetDisplay.set(false);
    } else if (!this.display().includes('.')) {
      this.display.update((current) => current + '.');
    }
  }

  private toggleSign(): void {
    const current = parseFloat(this.display());
    this.display.set((current * -1).toString());
  }

  private handlePercent(): void {
    const current = parseFloat(this.display());
    this.display.set((current / 100).toString());
  }
}

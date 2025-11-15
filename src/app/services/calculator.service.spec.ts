import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with display value of "0"', () => {
      expect(service.display()).toBe('0');
    });

    it('should initialize with null previous value', () => {
      expect(service.previousValue()).toBeNull();
    });

    it('should initialize with null operator', () => {
      expect(service.operator()).toBeNull();
    });

    it('should initialize with shouldResetDisplay as false', () => {
      expect(service.shouldResetDisplay()).toBe(false);
    });
  });

  describe('Number Input', () => {
    it('should replace "0" with first number input', () => {
      service.handleInput('5', 'number');
      expect(service.display()).toBe('5');
    });

    it('should append numbers to existing display', () => {
      service.handleInput('1', 'number');
      service.handleInput('2', 'number');
      service.handleInput('3', 'number');
      expect(service.display()).toBe('123');
    });

    it('should handle multiple digit numbers', () => {
      service.handleInput('9', 'number');
      service.handleInput('9', 'number');
      service.handleInput('9', 'number');
      expect(service.display()).toBe('999');
    });

    it('should reset display when shouldResetDisplay is true', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      expect(service.display()).toBe('3');
    });
  });

  describe('Decimal Input', () => {
    it('should add decimal point to "0"', () => {
      service.handleInput('.', 'number');
      expect(service.display()).toBe('0.');
    });

    it('should add decimal point to existing number', () => {
      service.handleInput('5', 'number');
      service.handleInput('.', 'number');
      expect(service.display()).toBe('5.');
    });

    it('should not add multiple decimal points', () => {
      service.handleInput('5', 'number');
      service.handleInput('.', 'number');
      service.handleInput('2', 'number');
      service.handleInput('.', 'number');
      expect(service.display()).toBe('5.2');
    });

    it('should handle decimal after operator', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('.', 'number');
      expect(service.display()).toBe('0.');
    });
  });

  describe('Addition', () => {
    it('should add two numbers', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('8');
    });

    it('should add decimal numbers', () => {
      service.handleInput('2', 'number');
      service.handleInput('.', 'number');
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('1', 'number');
      service.handleInput('.', 'number');
      service.handleInput('5', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('4');
    });

    it('should chain addition operations', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('+', 'operator');
      expect(service.display()).toBe('8');
      service.handleInput('2', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('10');
    });
  });

  describe('Subtraction', () => {
    it('should subtract two numbers', () => {
      service.handleInput('1', 'number');
      service.handleInput('0', 'number');
      service.handleInput('-', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('7');
    });

    it('should handle negative results', () => {
      service.handleInput('3', 'number');
      service.handleInput('-', 'operator');
      service.handleInput('5', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('-2');
    });

    it('should chain subtraction operations', () => {
      service.handleInput('2', 'number');
      service.handleInput('0', 'number');
      service.handleInput('-', 'operator');
      service.handleInput('5', 'number');
      service.handleInput('-', 'operator');
      expect(service.display()).toBe('15');
      service.handleInput('3', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('12');
    });
  });

  describe('Multiplication', () => {
    it('should multiply two numbers', () => {
      service.handleInput('6', 'number');
      service.handleInput('×', 'operator');
      service.handleInput('7', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('42');
    });

    it('should multiply decimal numbers', () => {
      service.handleInput('2', 'number');
      service.handleInput('.', 'number');
      service.handleInput('5', 'number');
      service.handleInput('×', 'operator');
      service.handleInput('4', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('10');
    });

    it('should handle multiplication by zero', () => {
      service.handleInput('5', 'number');
      service.handleInput('×', 'operator');
      service.handleInput('0', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('0');
    });
  });

  describe('Division', () => {
    it('should divide two numbers', () => {
      service.handleInput('8', 'number');
      service.handleInput('÷', 'operator');
      service.handleInput('2', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('4');
    });

    it('should handle division with decimals', () => {
      service.handleInput('5', 'number');
      service.handleInput('÷', 'operator');
      service.handleInput('2', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('2.5');
    });

    it('should handle division by zero', () => {
      service.handleInput('5', 'number');
      service.handleInput('÷', 'operator');
      service.handleInput('0', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('0');
    });
  });

  describe('Clear Functions', () => {
    it('should clear all with C', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('C', 'function');

      expect(service.display()).toBe('0');
      expect(service.previousValue()).toBeNull();
      expect(service.operator()).toBeNull();
      expect(service.shouldResetDisplay()).toBe(false);
    });

    it('should clear entry with CE', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('CE', 'function');

      expect(service.display()).toBe('0');
      expect(service.previousValue()).toBe(5);
      expect(service.operator()).toBe('+');
    });
  });

  describe('Backspace', () => {
    it('should remove last digit', () => {
      service.handleInput('1', 'number');
      service.handleInput('2', 'number');
      service.handleInput('3', 'number');
      service.handleInput('⌫', 'function');
      expect(service.display()).toBe('12');
    });

    it('should set to "0" when removing last digit', () => {
      service.handleInput('5', 'number');
      service.handleInput('⌫', 'function');
      expect(service.display()).toBe('0');
    });

    it('should handle backspace on "0"', () => {
      service.handleInput('⌫', 'function');
      expect(service.display()).toBe('0');
    });
  });

  describe('Toggle Sign', () => {
    it('should toggle positive to negative', () => {
      service.handleInput('5', 'number');
      service.handleInput('±', 'function');
      expect(service.display()).toBe('-5');
    });

    it('should toggle negative to positive', () => {
      service.handleInput('5', 'number');
      service.handleInput('±', 'function');
      service.handleInput('±', 'function');
      expect(service.display()).toBe('5');
    });

    it('should toggle decimal numbers', () => {
      service.handleInput('3', 'number');
      service.handleInput('.', 'number');
      service.handleInput('1', 'number');
      service.handleInput('4', 'number');
      service.handleInput('±', 'function');
      expect(service.display()).toBe('-3.14');
    });
  });

  describe('Percent', () => {
    it('should convert number to percent', () => {
      service.handleInput('5', 'number');
      service.handleInput('0', 'number');
      service.handleInput('%', 'function');
      expect(service.display()).toBe('0.5');
    });

    it('should handle percent of decimal', () => {
      service.handleInput('2', 'number');
      service.handleInput('.', 'number');
      service.handleInput('5', 'number');
      service.handleInput('%', 'function');
      expect(service.display()).toBe('0.025');
    });

    it('should handle percent of zero', () => {
      service.handleInput('0', 'number');
      service.handleInput('%', 'function');
      expect(service.display()).toBe('0');
    });
  });

  describe('Complex Operations', () => {
    it('should handle mixed operations', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('×', 'operator');
      service.handleInput('2', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('16');
    });

    it('should handle operation without equals', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('-', 'operator');
      expect(service.display()).toBe('8');
    });

    it('should reset properly after equals', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('=', 'equals');
      service.handleInput('2', 'number');
      expect(service.display()).toBe('2');
    });
  });

  describe('Edge Cases', () => {
    it('should handle equals without operation', () => {
      service.handleInput('5', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('5');
    });

    it('should handle multiple equals presses', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('3', 'number');
      service.handleInput('=', 'equals');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('8');
    });

    it('should handle operator change', () => {
      service.handleInput('5', 'number');
      service.handleInput('+', 'operator');
      service.handleInput('×', 'operator');
      service.handleInput('2', 'number');
      service.handleInput('=', 'equals');
      expect(service.display()).toBe('10');
    });
  });
});

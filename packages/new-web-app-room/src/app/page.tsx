'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl font-semibold text-xl transition-all duration-200 active:scale-95 hover:brightness-110 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="w-80">
          {/* Display */}
          <div className="bg-blue-950/50 rounded-2xl p-6 mb-4 border border-blue-400/30">
            <div className="text-right text-white text-4xl font-light min-h-[3rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              onClick={clear}
              className="col-span-2 bg-blue-600 hover:bg-blue-500 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => inputOperation('÷')}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => inputOperation('×')}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              ×
            </Button>

            {/* Row 2 */}
            <Button
              onClick={() => inputNumber('7')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber('8')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber('9')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              9
            </Button>
            <Button
              onClick={() => inputOperation('-')}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              -
            </Button>

            {/* Row 3 */}
            <Button
              onClick={() => inputNumber('4')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber('5')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber('6')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              6
            </Button>
            <Button
              onClick={() => inputOperation('+')}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              +
            </Button>

            {/* Row 4 */}
            <Button
              onClick={() => inputNumber('1')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber('2')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber('3')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              3
            </Button>
            <Button
              onClick={performCalculation}
              className="row-span-2 bg-blue-600 hover:bg-blue-500 text-white"
            >
              =
            </Button>

            {/* Row 5 */}
            <Button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              0
            </Button>
            <Button
              onClick={() => inputNumber('.')}
              className="bg-blue-200 hover:bg-blue-100 text-blue-900"
            >
              .
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect, ChangeEvent, KeyboardEvent, createRef, Dispatch, SetStateAction } from 'react';

interface InputProps {
  current: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

interface RowProps {
  id: number;
  currentRow: number;
}

const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(({ value, onChange, onKeyDown, current }, ref) => {

  return (
    <input 
      type="text" 
      maxLength={1} 
      disabled={current === true ? false : true}
      value={value} 
      onChange={onChange} 
      onKeyDown={onKeyDown}
      style={{
        color: 'black',
        width: '20px',
        marginRight: '10px',
        textAlign: 'center'
      }} 
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

const Row: React.FC<RowProps> = ({id, currentRow}) => {
  const [inputValues, setInputValues] = useState<string[]>(Array(5).fill(''));
  const inputRefs = Array(5).fill(0).map(_ => createRef<HTMLInputElement>());
  console.log(currentRow === id, id, inputValues)

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputValues];
    newInputs[index] = e.target.value;
    setInputValues(newInputs);

    if (e.target.value !== "" && inputRefs[index+1]) {
      inputRefs[index+1].current?.focus();
    }
  }

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValues[index] === "" && inputRefs[index-1]) {
      inputRefs[index-1].current?.focus();
    }
  }

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <div>
      {inputValues.map((value, index) => (
        <Input 
          current={currentRow === id ? true : false}
          key={index} 
          value={value} 
          onChange={handleChange(index)} 
          onKeyDown={handleKeyDown(index)}
          ref={inputRefs[index]}
        />
      ))}
    </div>
  );
};

export default Row;

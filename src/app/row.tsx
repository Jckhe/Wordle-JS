import { saveWord } from '@/store/slices/game';
import { RootState } from '@/store/store';
import React, { useState, useEffect, ChangeEvent, KeyboardEvent, createRef, Dispatch, SetStateAction, useImperativeHandle, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps {
  current: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

interface RowProps {
  id: number;
}

const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(({ value, onChange, onKeyDown, current }, ref) => {


  return (
    <input 
      type="text" 
      maxLength={1} 
      disabled={current === true ? false : true}
      value={value} 
      onChange={onChange}
      className="charInput" 
      onKeyDown={onKeyDown}
      ref={ref}
      autoFocus={current}
    />
  );
});

Input.displayName = 'Input';

const Row: React.FC<RowProps> = ({id}) => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState<string[]>(Array(5).fill(''));
  const inputRefs = Array(5).fill(0).map(_ => createRef<HTMLInputElement>());
  const currentRow = useSelector((state: RootState) => state.game.currentRow);
  // const savedWords = useSelector((state: RootState) => state.game.savedWords);
  // const isDisabled = savedWords[id] != null;

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputValues];
    newInputs[index] = e.target.value.toUpperCase();
    setInputValues(newInputs);

    if (e.target.value !== "" && inputRefs[index+1]) {
      inputRefs[index+1].current?.focus();
    }
  }

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(saveWord({ rowId: id, word: inputValues.join('') }));
    }
    if (e.key === "Backspace" && inputValues[index] === "" && inputRefs[index-1]) {
      inputRefs[index-1].current?.focus();
    }
  }
  useEffect(() => {
    if (currentRow === id) {
      inputRefs[0].current?.focus();
    }
  }, [currentRow]);

  return (
    <div className={`row ${id}`}>
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

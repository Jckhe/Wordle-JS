import { validateWord } from '@/helperFunctions';
import { saveWord } from '@/store/slices/game';
import { RootState } from '@/store/store';
import React, { useState, useEffect, ChangeEvent, KeyboardEvent, createRef, Dispatch, SetStateAction, useImperativeHandle, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface InputProps {
  current: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
  id: number;
}

interface RowProps {
  id: number;
}

const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(({ value, onChange, onKeyDown, current, id }, ref) => {
  const [bgColor, updateColor] = useState<string>('');
  const letters = useSelector((state: RootState) => state.game.letters); 
  const victory = useSelector((state: RootState) => state.game.win);

  useEffect(() => {
    if ((id < current) && value) {
      console.log("Valid submission: ", value)
      //if valid then we will update the color accordingly
      updateColor(letters[value])
    }
  }, [id, current, value, letters])


  return (
    <input 
      type="text" 
      maxLength={1} 
      disabled={current !== id || victory ? true : false}
      value={value} 
      onChange={onChange}
      className="charInput" 
      onKeyDown={onKeyDown}
      style={{
        backgroundColor: bgColor,
      }}
      ref={ref}
      autoFocus={current === id}
    />
  );
});

Input.displayName = 'Input';

const Row: React.FC<RowProps> = ({id}) => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState<string[]>(Array(5).fill(''));
  const inputRefs = Array(5).fill(0).map(_ => createRef<HTMLInputElement>());
  const currentRow = useSelector((state: RootState) => state.game.currentRow);
  const savedWords = useSelector((state: RootState) => state.game.savedWords);
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

  const handleKeyDown = (index: number) => async (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === "Enter") {
    //   //logic here to validate word
    //   dispatch(saveWord({ rowId: id, word: inputValues.join('') }));
    // }
    if (e.key === "Enter") {
      const word = inputValues.join('');
      // Check if the word has been previously submitted
      const hasBeenSubmitted = Object.values(savedWords).includes(word);
  
      // If it has not been submitted before, save the word and validate it
      if (!hasBeenSubmitted) {
        // Call your API to validate the word
        // Remember that this would be asynchronous, you might want to use async/await or .then()
        const isValid = await validateWord(word);
        if(isValid?.valid === true) {
          dispatch(saveWord({ rowId: id, word }));
        } else {
          // Display some kind of message or indication that the word is invalid
          //nothing homie
          console.log("Invalid Word: " + word);
        }
      } else {
        // Display some kind of message or indication that the word has been previously submitted
        console.log(`The word ${word} has been submitted`);
      }
    }
    if (e.key === "Backspace" && inputValues[index] === "" && inputRefs[index-1]) {
      inputRefs[index-1].current?.focus();
    }
  }
  useEffect(() => {
    if (currentRow === id) {
      inputRefs[0].current?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow]);

  return (
    <div className={`row ${id}`}>
      {inputValues.map((value, index) => (
        <Input 
          current={currentRow}
          id={id}
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

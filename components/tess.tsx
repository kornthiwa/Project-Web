import React, { useState, useCallback, ChangeEvent } from 'react';

interface ChildComponentProps {
  onResult: (result: number) => void;
  processData: (value: number) => number;
}

function ChildComponent({ onResult, processData }: ChildComponentProps): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Validate input
    if (!inputValue.match(/^[0-9]+$/)) {
      return;
    }

    setInputValue(inputValue);
  };

  const handleProcessData = useCallback(() => {
    const processedData = processData(Number(inputValue));

    // Handle errors
    if (isNaN(processedData)) {
      return;
    }

    onResult(processedData);
  }, [inputValue, onResult, processData]);

  return (
    <div>
      {/* Input for receiving data to process */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />

      {/* Text showing the current input value */}
      <p>Current input value: {inputValue}</p>

      {/* Button for processing data and sending the result back to ParentComponent */}
      <button onClick={handleProcessData}>Process Data</button>
    </div>
  );
}

export default ChildComponent;

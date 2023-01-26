import { useState, useEffect, useRef } from "react";

interface typingGame {
  textArea: string;
  count: number;
  isStarted: boolean;
  wordCount: number;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  timerRef: React.RefObject<HTMLInputElement>;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  startGame: () => void;
}

function useTypingGame(): typingGame {
  const timerRef = useRef<HTMLInputElement>(null);
  const [textArea, setTextArea] = useState("");
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (count > 0 && isStarted)
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    else if (count === 0) {
      endGame();
    }
  }, [count, isStarted]);

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setTextArea(e.target.value);
  }

  function calculateWords(text: string): number {
    let wordCount: number = text
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;
    return wordCount;
  }

  function endGame(): void {
    setIsStarted(false);
    setWordCount(calculateWords(textArea));
  }

  function startGame(): void {
    setIsStarted(true);
    setCount(parseInt(timerRef.current?.value as string));
    setWordCount(0);
    setTextArea("");
    if (inputRef.current !== null) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  }

  return {
    textArea,
    count,
    isStarted,
    wordCount,
    inputRef,
    timerRef,
    handleTextArea,
    startGame,
  };
}

export default useTypingGame;

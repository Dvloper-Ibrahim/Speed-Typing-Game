import useTypingGame from "./Hocks/useTypingGame";
import "./App.css";

function App(): JSX.Element {
  const {
    textArea,
    count,
    isStarted,
    wordCount,
    inputRef,
    timerRef,
    handleTextArea,
    startGame,
  } = useTypingGame();

  return (
    <main>
      <h1>How fast do you type?</h1>

      <textarea
        ref={inputRef}
        disabled={!isStarted}
        onChange={handleTextArea}
        value={textArea}
      />

      <div className="set-timer">
        <span>Set the timer and challenge yourself in</span>
        <input
          type="number"
          ref={timerRef}
          disabled={isStarted}
          defaultValue={5}
          min={1}
        />
        Seconds
      </div>

      <h4>Time remaining: {count}</h4>

      <button disabled={isStarted} onClick={startGame}>
        Start
      </button>

      <h1>Word count: {isStarted ? 0 : wordCount}</h1>
    </main>
  );
}

export default App;

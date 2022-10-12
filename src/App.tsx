import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import GitHubButton from 'react-github-btn';

enum Result {
  NoResult = -1,
  Wrong = 0,
  Correct = 1
}

interface Score {
  total: number;
  correct: number;
  wrong: number;
}

function App() {
  const [color, setColor] = useState<string>("");
  const [options, setOptions] = useState<string[]>(new Array(3));
  const [result, setResult] = useState<Result>(Result.NoResult);
  const [score, setScore] = useState<Score>({
    total: 0,
    correct: 0,
    wrong: 0,
  })

  function between(min: number, max: number) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

  function getRandomColor() {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];

    const newColor = [];
    
    for (let i = 0; i < 6; i++) {
      newColor.push(digits[between(0, 15)]);
    }

    return newColor.join("");
  }

  function shuffle(arr: string[]) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function fillOptions() {
    const newArray = [];

    newArray.push(color);
    newArray.push(getRandomColor());
    newArray.push(getRandomColor());

    setOptions(shuffle(newArray));
  }

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  useEffect(() => {
    if (color === "") return;

    fillOptions();
  }, [color]);

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          ColorGuess
        </div>
        <div className="subtitle">
          Guess the color by HEX code
        </div>
        <div className="github-button">
          <GitHubButton href="https://github.com/arthurtc30">Follow @arthurtc30</GitHubButton>
        </div>
      </div>
      <div className="scoreboard">
        <div className="scoreboard-total total">
          Total: {score.total}
        </div>
        <div className="scoreboard-results">
          <div className="scoreboard-text correct">
            Correct: {score.correct}
          </div>
          <div className="scoreboard-text wrong">
            Wrong: {score.wrong}
          </div>
        </div>
      </div>
      <div>
        <div className="guess-me" style={{ backgroundColor: `#${color}` }}></div>
          {options.length ? 
            <div className="options">
              {options.map((o) => {
                return (
                  <Button 
                    variant="primary"
                    onClick={() => {
                      if (o === color) {
                        setResult(1);
                        setScore({
                          ...score,
                          total: score.total + 1,
                          correct: score.correct + 1,
                        })
                        setColor(getRandomColor());
                        return;
                      }
  
                      setScore({
                        ...score,
                        total: score.total + 1,
                        wrong: score.wrong + 1,
                      })
                      setResult(0);
                      setColor(getRandomColor());
                    }}
                  >
                    #{o}
                  </Button>
                )
              })}
            </div>
          : (
            <div className="options">Loading...</div>
          )}
        </div>
        <div className="result">
        {result !== -1 && (
          result === 1 ? (
            <span>
              <i className="correct">Correct!</i>
            </span>
          ) : (
            <span>
              <i className="wrong">Wrong...</i>
            </span>
          ))}
      </div>
    </div>
  );
}

export default App;

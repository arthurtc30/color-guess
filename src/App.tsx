import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import GitHubButton from 'react-github-btn';

enum Result {
  NoResult = -1,
  Wrong = 0,
  Right = 1
}

function App() {
  const [color, setColor] = useState<string>("");
  const [options, setOptions] = useState<string[]>(new Array(3));
  const [result, setResult] = useState<Result>(Result.NoResult);

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
          Guess color by HEX code
        </div>
        <div className="github-button">
          <GitHubButton href="">Follow @arthurtc30</GitHubButton>
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
                        setColor(getRandomColor());
                        return;
                      }
  
                      setResult(0);
                    }}
                  >
                    #{o}
                  </Button>
                )
              })}
            </div>
          : (
            <div className="options">Carregando...</div>
          )}
        </div>
        <div className="result">
        {result !== -1 && (
          result === 1 ? (
            <span className="right">Right!</span>
          ) : (
            <span className="wrong">Wrong...</span>
          ))}
      </div>
    </div>
  );
}

export default App;

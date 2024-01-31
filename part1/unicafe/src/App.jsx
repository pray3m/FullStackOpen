import { useState } from "react";
import "./App.css";
import Statistics from "./Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        setBad={setBad}
        setGood={setGood}
        setNeutral={setNeutral}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
}

export default App;

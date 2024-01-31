import Button from "./Button";
import { StatisticLine } from "./StatisticLine";

const Statistics = ({
  good,
  neutral,
  bad,
  setBad,
  setGood,
  setNeutral,
  all,
  average,
  positive,
}) => {
  return (
    <>
      <h1>Give feedback:</h1>
      <div>
        <Button title={"Good"} fn={() => setGood(good + 1)} />
        <Button title={"Neutral"} fn={() => setNeutral(neutral + 1)} />
        <Button title={"Bad"} fn={() => setBad(bad + 1)} />
      </div>
      <div>
        <h1>Statistics</h1>
        {all === 0 ? (
          <p>No feedback given</p>
        ) : (
          <table>
            <StatisticLine text={"Good"} value={good} />
            <StatisticLine text={"Neutral"} value={neutral} />
            <StatisticLine text={"Bad"} value={bad} />
            <StatisticLine text={"All"} value={all} />
            <StatisticLine text={"Average"} value={average} />
            <StatisticLine text={"Positive"} value={positive} />
          </table>
        )}
      </div>
    </>
  );
};

export default Statistics;

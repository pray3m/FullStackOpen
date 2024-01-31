import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [maxVoteInfo, setMaxVoteInfo] = useState({ vote: 0, index: null });

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    setPoints((prevPoints) => {
      const copy = [...prevPoints];
      copy[selected] += 1;
      const max = Math.max(...copy);
      const index = copy.indexOf(max);
      setMaxVoteInfo({ vote: max, index });
      return copy;
    });
  };
  console.log(points);

  const { vote, index } = maxVoteInfo;

  return (
    <div>
      <div>
        <h2>Anecdotes of the day</h2>
        <h3>{anecdotes[selected]}</h3>
        <button onClick={handleVote}> vote</button>
        <button onClick={handleClick}>next anecdotes</button>
      </div>

      <div>
        <h2>Anecdotes with most votes:</h2>
        <h3>{anecdotes[index]}</h3>
        <p> {vote} votes</p>
      </div>
    </div>
  );
};

export default App;

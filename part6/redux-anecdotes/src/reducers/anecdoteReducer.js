const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    }

    case "NEW_ANECDOTE": {
      const newContent = action.payload.content;
      const newAnecdote = asObject(newContent);
      return [...state, newAnecdote];
    }

    default:
      return state;
  }
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: { content },
  };
};

export default anecdoteReducer;

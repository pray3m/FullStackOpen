const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} &nbsp; {person.number}
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

export default Person;

const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person, i) => (
        <div key={i}>
          <p>
            {person.name} &nbsp; {person.number}
          </p>
        </div>
      ))}
    </>
  );
};

export default Persons;

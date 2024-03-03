import Person from "./Person";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person
          person={person}
          key={person.id}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);

  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const genres = result.data.allBooks?.reduce((acc, book) => {
    book.genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);

  const filterBooksByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === "") {
      setBooks(result.data.allBooks);
    } else {
      const filteredBooks = result.data.allBooks.filter((book) =>
        book.genres.includes(genre)
      );
      setBooks(filteredBooks);
    }
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong> {selectedGenre} </strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => filterBooksByGenre("")}>All</button>
        {genres.map((genre, i) => (
          <button onClick={() => filterBooksByGenre(genre)} key={i}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;

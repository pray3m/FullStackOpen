import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOKS_BY_GENRE, GET_FAVORITE_GENRE } from "../queries";

const Recommendations = ({ show }) => {
  const { data: userData, loading: userLoading } = useQuery(GET_FAVORITE_GENRE);

  const favoriteGenre = userData?.me?.favoriteGenre;

  const { data: booksData, loading: booksLoading } = useQuery(
    GET_BOOKS_BY_GENRE,
    {
      variables: { genre: favoriteGenre },
      skip: !favoriteGenre,
    }
  );

  if (!show) {
    return null;
  }

  if (userLoading || booksLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksData.allBooks?.map((book) => {
            return (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;

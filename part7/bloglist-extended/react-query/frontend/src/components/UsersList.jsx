import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import userService from "../services/users";
import WithTopSection from "./WithTopSection";

const UsersList = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const users = query.data || [];

  return (
    <WithTopSection>
      <h3>Users</h3>
      <table border={1}>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </WithTopSection>
  );
};

export default UsersList;

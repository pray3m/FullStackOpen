import { useQuery } from "@tanstack/react-query";
import WithTopSection from "./WithTopSection";
import userService from "../services/users";

const UsersList = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const users = query.data;
  //   console.log(users);

  return (
    <WithTopSection>
      <h3>Users</h3>
      <table border={1}>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </WithTopSection>
  );
};

export default UsersList;

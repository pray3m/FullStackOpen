import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import WithTopSection from "./WithTopSection";

const UserInfo = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getById(id),
    enabled: !!id, // Only fetch if ID exists
  });

  const user = query.data || [];

  console.log(user);

  return (
    <WithTopSection>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}> ⭐ {blog.title}</li>
        ))}
      </ul>
    </WithTopSection>
  );
};

export default UserInfo;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const Comment = ({ blog }) => {
  const baseUrl = `/api/blogs/${blog?.id}/comments`;

  const comments = blog?.comments;

  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: async (content) => {
      const res = await axios.post(baseUrl, { content });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    newCommentMutation.mutate(comment);
    e.target.comment.value = "";
  };

  return (
    <div>
      <h5>Comments</h5>

      <form onSubmit={handleComment}>
        <input type='text' name='comment' placeholder='add a comment' />
        <input type='submit' value='comment' />
      </form>

      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

Comment.propTypes = {
  blog: PropTypes.object,
};

export default Comment;

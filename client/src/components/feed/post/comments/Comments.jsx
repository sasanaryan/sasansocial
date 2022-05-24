import { useContext } from 'react'
import { useState, useEffect } from "react"
import Comment from "./comment/Comment";
import { AuthContext } from "../../../../context/AuthContext";
import Input from "./comment/commentAction/Input";
import {
  styled,
} from "@mui/material";
import { baseurl } from "../../../../config";

const CommentsPart = styled("div")({
  marginTop: "10px"
});

const CommentsWrapper = styled("div")({
  marginLeft: "5px"
});


const Comments = ({ comments, setComments, postId }) => {
  const [rootComments, setRootComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { user } = useContext(AuthContext);



  //get all comments for post

  useEffect(() => {
    setRootComments(comments.filter(
      (comment) => comment.parentId === null
    ).sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }));
  }, [comments]);

  //get replies comments for comment


  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );



  //add comment


  const addComment = async (text, parentId) => {
    const newComment = {
      text: text,
      userName: user.username,
      postId: postId,
      parentId: parentId ? parentId : null
    }
    try {
      const res = await baseurl.post("/comment", newComment);
      setComments([res.data, ...comments]);
      setActiveComment(null);
    } catch (err) {
      console.log(err);
    }
  };



  //delete a comment

  const deleteComment = async (commentId) => {
    
    try {
      if (window.confirm("Are you sure you want to remove comment?")) {
         await baseurl.delete(`/comment/` + commentId);
        const updatedComments = comments.filter(
          (Comment) => Comment._id !== commentId
        );
        setComments(updatedComments);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <CommentsPart>
      <CommentsWrapper>
        <Input handleSubmit={addComment} />
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            replies={getReplies(rootComment._id)}
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserName={user.username}
          />
        ))}
      </CommentsWrapper>
    </CommentsPart>
  )
}


export default Comments

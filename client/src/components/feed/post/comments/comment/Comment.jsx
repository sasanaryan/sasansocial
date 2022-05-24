import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Input from "./commentAction/Input";
import CommentAction from './commentAction/CommentAction';
import { baseurl } from "../../../../../config";

import {
  Stack,
  Avatar,
  Typography,
  styled,
} from "@mui/material";

const AvatarWraper = styled("div")({
  display: 'flex',
  alignItems: "center",
  cursor: "pointer"
});



const CommentRightPart = styled("div")({
});

const CommentDetail = styled("div")({
  display: "flex",
  alignItems: "center"
});

const Username = styled("span")({
  fontSize: 18,
  fontWeight: "450",
  marginRight: "10px",
  color: "black",
  textDecorationLine: "none",
  textDecorationColor: "none"

});
const Time = styled("span")({
  top: "3px",
  fontSize: 12,
  fontWeight: "400",
  color: "#a19e9e",
  alignItems: "center",
  marginLeft: "10px"
});


const RepliesWraper = styled("div")({
  marginTop: "20px",
  marginLeft: "0px"
});

const Main = styled("div")({
  marginLeft: "4px"
});

const Replies = styled("div")({
  marginTop: "10px"
});

const RepliesCounter = styled("span")({
  marginLeft: "20px",
  color: "gray",
  fontSize: "15px",
  cursor: "pointer"
});



const  Comment = ({ comment,
  replies,
  setActiveComment,
  activeComment,
  deleteComment,
  addComment,
  currentUserName,
  parentId,
}) => {

  const [author, setAuthor] = useState({});
  const [showReplies, setShowReplies] = useState(false);
  const PF = process.env.REACT_APP_PATH;

  useEffect(() => {
    try {
      const fetchAuthor = async () => {
        const res = await baseurl.get("/users/comments/" + comment.userName);
        setAuthor(res.data);
      };
      fetchAuthor();
    } catch (err) {
      console.log(err);
    }
  }, [comment]);

  const Show = () => {
    setShowReplies(true);
  };
  const Wrapp = () => {
    setShowReplies(false);
  };

  const replyAction = () => {
    setActiveComment({ id: comment._id });
    Show();
  }

  const deleteThisComment = (id) =>{
    deleteComment(id);
  }



  const isReplying =
    activeComment &&
    activeComment.id === comment._id;

  const replyId = parentId ? parentId : comment._id;

  return (
    <Stack direction={"row"} alignItems="flex-start" spacing={1} marginBottom="15px"  >
      <AvatarWraper>
        <Link to={`/profile/${comment.userName}`}>
          <Avatar
            sx={{ width: { sm: "40px", xs: "30px" }, height: { sm: "40px", xs: "30px" } }}
            src={
              author.profilePicture
                ? PF + author.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          >
          </Avatar>
        </Link>
      </AvatarWraper>
      <CommentRightPart>
        <CommentDetail>
          <Link to={`/profile/${comment.userName}`} style={{ textDecoration: 'none' }}>
            <Username >
              {comment.userName}
            </Username>
          </Link>
          <Time>
            {format(comment.createdAt)}
          </Time>
        </CommentDetail>
        <Main>
          <Typography sx={{ fontSize: { sm: "16px", xs: "12px" } }}>{comment.text}</Typography>
          <CommentAction
            currentUserName={currentUserName}
            replyAction={replyAction}
            comment={comment}
            deleteThisComment={deleteThisComment}
          />
        </Main>
        <Replies>
          {replies?.length > 0 && !showReplies && <RepliesCounter
            onClick={Show}
          >
            view replies ({replies?.length})
          </RepliesCounter>}
          {replies?.length > 0 && showReplies && <RepliesCounter
            onClick={Wrapp}
          >
            Hide replies
          </RepliesCounter>}
          <Collapse in={showReplies}>
            <RepliesWraper >
              {isReplying && (
                <Input
                  hasCancelButton
                  handleCancel={() => {
                    setActiveComment(null);
                  }}
                  submitLabel="Reply"
                  handleSubmit={(text) => addComment(text, replyId)}
                />
              )}
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply._id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  parentId={comment._id}
                  replies={[]}
                  currentUserName={currentUserName}
                />
              ))}
            </RepliesWraper>
          </Collapse>
        </Replies>
      </CommentRightPart>
    </Stack >
  );
}



export default Comment;
import React from 'react'

import {
    styled,
  } from "@mui/material";


const CommentActionItem = styled("span")({
    color: "gray",
    fontSize: "14px",
    cursor: "pointer",
    textDecorationLine: "none",
    marginLeft: "3px"
  });

  const Action = styled("div")({
    display: "flex",
    gap: "5px",
    marginLeft: "5px",
    marginTop: "5px"
  });

  

const CommentAction = ({replyAction, currentUserName , comment , deleteThisComment }) => {

  const canDelete = currentUserName === comment?.userName;
  const canReply = Boolean(currentUserName);


  return (
     <Action>
    {canReply && (
      <CommentActionItem
        onClick={
          replyAction
        }
      >
        Reply
      </CommentActionItem>
    )}

    {canDelete && (
      <CommentActionItem
        onClick={() => deleteThisComment(comment._id)}
      >
        Delete
      </CommentActionItem>
    )}
  </Action>
  )
}

export default CommentAction
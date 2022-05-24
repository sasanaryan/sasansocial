import React from 'react';
import {  Favorite , FavoriteBorder } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import { format } from 'timeago.js';
import {
  Checkbox,
  Typography,
  styled,
} from "@mui/material";

const Time = styled("span")({
  fontSize: 12,
  fontWeight: "400",
  color: "#a19e9e",
  alignItems: "center",
  marginLeft: "8px"
});

const Like = styled("div")({
  display: 'flex',
  alignItems: "center",
  justifyContent: "space-between"
});



const LikeAndTime = ({post}) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
}, [currentUser._id, post.likes]);

const likeHandler = () => {
  try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
  } catch (err) { 
    console.log(err);
  }
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};


  return (
    <Like>
      <Checkbox
        onClick={likeHandler}
        checked={isLiked}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite color="secondary" />}
      />
      <Typography>{like}  like  </Typography>
      <Time>
        {format(post.createdAt)}
      </Time>
    </Like>
  )
}

export default LikeAndTime
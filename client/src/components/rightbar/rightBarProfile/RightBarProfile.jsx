import React from 'react'
import {  useEffect, useState } from "react";
import { baseurl } from "../../../config";
import { Link } from "react-router-dom";
import {
  Stack,
  Typography,
  styled,
} from "@mui/material";


const RightBarP = styled(Stack)({
    direction: "column",
    flex: "1.2",
    padding:"10px"
  });
  
  

  
  
  const RightbarFollowingImg = styled("img")({
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    objectFit: "cover"
  });
  
  const RightbarFollowers = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  });
  

const RightBarProfile = ({ user }) => {
    
    const PF = process.env.REACT_APP_PATH;
    const [followers, setFollowers] = useState([]);

    
  useEffect(() => {
    if(user._id){
      const getFollowers = async () => {
        try {
          const followersList = await baseurl.get("/users/followers/" + user._id);
          setFollowers(followersList.data);
        } catch (err) {
          console.log(err);
        } 
      };
      getFollowers();
    }
  }, [user.followers]);


  return (
    <RightBarP sx={{ display: { xs: "none", sm: "block" } }} >
    <Typography fontSize="18px" fontWeight="500" marginBottom="10px">User information</Typography>
    <Stack direction="column" marginBottom="15px">
      <Stack direction="row" marginBottom="5px" >
        <Typography fontSize="15px" fontWeight="500" color="#555" >City:</Typography>
        <Typography marginLeft="10px" fontWeight="300">{user.city}</Typography>
      </Stack>
      <Stack direction="row" marginBottom="5px" >
        <Typography  fontSize="15px" fontWeight="500" color="#555" >From:</Typography>
        <Typography marginLeft="10px" fontWeight="300">{user.from}</Typography>
      </Stack>
      <Stack direction="row" marginBottom="5px" >
        <Typography fontSize="15px" fontWeight="500" color="#555" >Relationship:</Typography>
        <Typography marginLeft="10px" fontWeight="300">{user.relationship === 1
          ? "Single"
          : user.relationship === 1
            ? "Married"
            : "-"}
        </Typography>
      </Stack>
    </Stack>
    <Typography fontSize="18px" marginBottom="15px" fontWeight="500">Followers</Typography>
    <RightbarFollowers>
      {followers.map((friend) => (

        <Stack key={friend._id} direction="column" marginBottom="20px" alignItems="center">
          <Link
          to={"/profile/" + friend.username}
          style={{ textDecoration: "none" }}
         >
          <RightbarFollowingImg
            src={
              friend.profilePicture ? PF + friend.profilePicture : PF + "noavatar.png"
            }
            alt=""
          />
          <Typography color="#555" textAlign="center">{friend.username}</Typography>
        </Link>
          </Stack>
       
      ))}
  </RightbarFollowers>
  </RightBarP >
  
  )
}

export default RightBarProfile;
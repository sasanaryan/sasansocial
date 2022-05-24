import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../../context/AuthContext";
import {
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { baseurl } from "../../../config";
import AvatarUsername from '../../avatar/AvatarUsername';

const AdImage = styled("img")({
  width: "100%"
});

const RightBarHome = () => {

  const { user } = useContext(AuthContext);
  const [followings, setFollowings] = useState([]);


  useEffect(() => {
      const getFollowings = async () => {
        try {
          const followingList = await baseurl.get("/users/followings/" + user._id);
          setFollowings(followingList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFollowings();
  }, [user.followings]);

  return (
    <Stack direction="column" flex={1} sx={{ padding:"10px", display: { xs: "none", sm: "block" } }}>
      <AdImage src="https://images.fosterwebmarketing.com/fosterwebmarketing.com/Social%20Media%20Lightbulb.jpg" />
      <Stack direction="column" spacing={2} margin="20px" width="50%">
        <Typography fontSize="22px" textAlign="center" fontWeight="500">Followings</Typography>
        {followings.map((following) => (
            <AvatarUsername key={following._id} user={following}    />
          ))}
      </Stack>
    </Stack>
  )
}

export default RightBarHome
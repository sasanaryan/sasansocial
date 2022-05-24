import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import RightBarProfile from "../../components/rightbar/rightBarProfile/RightBarProfile";
import { useEffect, useState, useContext } from "react";
import { baseurl } from "../../config";
import { useParams } from "react-router";
import Add from "../../components/share/Add";
import {  Stack, styled } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import ProfileTop from "../../components/profileTop/ProfileTop";



const ProfileRight = styled("div")({
  flex: "6"
});


 const Profile = () => {
  
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const username = useParams().username;
  
  useEffect(() => {
    try{
      const fetchUser = async () => {
        const res = await baseurl.get(`/users?username=${username}`);
        setUser(res.data);
    };
    fetchUser();
    }catch(err){
      console.log(err);
    }
  }, [username,currentUser]);
  
  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <ProfileRight >
          <ProfileTop user={user}  />
          <Stack direction={"row"} >
            <Feed username={username} posts={posts} setPosts={setPosts} />
            <RightBarProfile user={user} />
            {user.username === currentUser.username &&
              <Add posts={posts} setPosts={setPosts} />
            }
          </Stack>
        </ProfileRight>
      </Stack>
    </>
  );
}

export default Profile;

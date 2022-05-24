import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import {  Stack } from "@mui/material";
import Add from "../../components/share/Add";
import { useState } from "react";
import RightBarHome from "../../components/rightbar/RightBarHome/RightBarHome";



 const Home = () => {
  
  const [posts, setPosts] = useState([]);
  return (
    <>
      <Navbar />
      <Stack direction="row"  justifyContent="space-between">
      <Sidebar />
        <Feed posts={posts} setPosts={setPosts}/>
        <RightBarHome />
        <Add posts={posts} setPosts={setPosts} />
      </Stack>
    </>
  );
}

export default Home;

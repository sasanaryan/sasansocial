import { Box, Stack, Skeleton } from "@mui/material";
import Post from "./post/Post";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { baseurl } from "../../config";



const Feed = ({ username,posts,setPosts}) => {
    
  const { user  } = useContext(AuthContext);

  useEffect(() => {
    try{
      const fetchPosts = async () => {
        const res = username
          ? await baseurl.get("posts/profile/" + username)
          : await baseurl.get("posts/timeline/" + user._id);
      setPosts(res.data)
      };
      fetchPosts();
    }catch(err){
      console.log(err);
    }
  }, [username]);

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  


  return (
    <Box bgcolor="#f3f2f2 " flex={4} p={{ xs: 0, md: 1 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={200} />
          <Skeleton variant="text" height={60} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
         
        {posts?.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }).map((p) => (
          <Post key={p._id} post={p} posts={posts} setPosts={setPosts} />
        ))}
        </>
      )}
    </Box>
  );
};

export default Feed;

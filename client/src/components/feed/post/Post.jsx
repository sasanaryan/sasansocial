import React from 'react';
import {  Message, } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Comments from "./comments/Comments";
import Collapse from '@mui/material/Collapse';
import AvatarUsername from '../../avatar/AvatarUsername';
import Option from './postAction/Option';
import LikeAndTime from './postAction/LikeAndTime';
import {baseurl} from "../../../config";


import {
    Stack,
    Card,
    CardMedia,
    Typography,
    styled,
    Button,
} from "@mui/material";



const TopCard = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
});


const BottomCard = styled("div")({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between"
});


const Post = ({ post ,posts,  setPosts }) => {

    const [checked, setChecked] = useState(false);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const PF = process.env.REACT_APP_PATH;
    const { user: currentUser } = useContext(AuthContext);

    const isMyPost = currentUser._id === post.userId ;

    useEffect(() => {
        try {
            const fetchComments = async () => {
                const res = await baseurl.get("/comment/" + post._id);
                setComments(res.data);
            };
            fetchComments();
        } catch (err) {
            console.log(err);
        }
    }, [post]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                const res = await baseurl.get(`/users?userId=${post.userId}`);
                setUser(res.data);
            };
            fetchUser();
        } catch (err) {
            console.log(err);
        }
    }, [post,currentUser]);

    const ShowCommentsHandle = () => {
        setChecked((prev) => !prev);
    }


    return (
        <Card sx={{ padding: 2, margin: { sm: "10px" }, marginBottom: { xs: "10px" } }} >
            <Stack direction="column" spacing={1}  >
                <TopCard>
                    <AvatarUsername user={user}/>
                    <Option setPosts={setPosts} posts={posts} postId={post._id} isMyPost={isMyPost} />
                </TopCard>
                {post.img &&
                    <CardMedia
                        marginBottom="10px"
                        component="img"
                        height="30%"
                        src={post.img && PF + post.img}
                        alt=""
                    />
                }
                <Typography sx={{fontSize: {sm: "17px", xs: "13px" }}}>
                    {post.desc}
                </Typography>
                <BottomCard>
                    <LikeAndTime post={post}  />
                    <Button onClick={ShowCommentsHandle} >
                        <Typography marginRight={1} fontSize="17px" color="gray">
                            {comments?.length}
                        </Typography>
                        <Message color="black" />
                    </Button>
                </BottomCard>
                <Collapse in={checked}>
                    <Comments comments={comments} setComments={setComments} postId={post._id} />
                </Collapse>
            </Stack>
        </Card>
    );
}



export default Post
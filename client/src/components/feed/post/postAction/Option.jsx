import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Fade,
} from "@mui/material";
import { MoreVert} from "@material-ui/icons";
import { baseurl } from '../../../../config';

const Option = ({setPosts ,posts ,isMyPost,postId }) =>  {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = async (postId) => {
        try {
            if (window.confirm("Are you sure you want to remove post?")) {
                await baseurl.delete(`/posts/` + postId);
                const updatedPosts = posts.filter(
                    (post) => post._id !== postId
                );
                setPosts(updatedPosts);
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <>
         <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ minWidth: "15px", maxWidth: "15px", color: "black" , cursor:"pointer" }}
        >
            <MoreVert />
        </Button>
        <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem disabled={!isMyPost} onClick={() => deletePost(postId)} >Delete Post</MenuItem>
                <MenuItem disabled onClick={handleClose}>Edit Post</MenuItem>
            </Menu>
        </>
    )
}

export default Option;
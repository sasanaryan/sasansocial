
import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Stack,
    styled,
    Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import ProfileAvatar from './profileAvatar/ProfileAvatar';
import UploadProfilePicture from './uploadProfilePicture/UploadProfilePicture';
import { baseurl } from "../../config";




const ProfileRightTop = styled("div")({
});

const ProfileCover = styled(Stack)({
    height: "320px",
    direction: "column",
    alignItems: "center"
});


const ProfileCoverImg = styled("img")({
    width: "100%",
    height: '250px',
    objectFit: "cover"
});



const ProfileInfo = styled(Stack)({
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    marginTop: "30px"
});


const FollowButton = styled(Button)({
    marginTop: "30px",
    marginBottom: "10px",
    border: "none",
    backgroundColor: "#1872f2",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    width: "120px",
    '&:hover': {
        background: "#0d66e4",
    }
});

const ProfileTop = ({ user }) => {


    const [openModal, setOpenModal] = useState(false);
    const PF = process.env.REACT_APP_PATH;
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState();

    const isMyProfile = currentUser._id === user._id;

    useEffect(() => {
        setFollowed(currentUser.followings?.includes(user._id));
    }, [user]);



    const handleClick = async () => {
        try {
            if (followed) {
                await baseurl.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await baseurl.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed((prev) => !prev);
        } catch (err) {
        }
    };


    return (
        <ProfileRightTop>
            <ProfileCover>
                <ProfileCoverImg
                    src={
                        user.coverPicture
                            ? PF +  user.coverPicture
                            : PF + "1.jpg"
                    }
                    alt=""
                />
                <ProfileAvatar user={user} setOpenModal={setOpenModal} isMyProfile={isMyProfile} />
            </ProfileCover>
            <ProfileInfo>
                <Typography fontSize={24}>{user.username}</Typography>
                <Typography fontWeight={400}>{user.desc}</Typography>
                {!isMyProfile && (
                    <FollowButton onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                    </FollowButton>
                )}
            </ProfileInfo>
            <UploadProfilePicture setOpenModal={setOpenModal}  openModal={openModal}/>
        </ProfileRightTop>
    )
}

export default ProfileTop;
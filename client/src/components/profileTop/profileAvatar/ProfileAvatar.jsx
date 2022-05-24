import React from 'react'
import {
    Menu,
    MenuItem,
    IconButton,
    styled,
} from "@mui/material";
import {  useState } from 'react';


const ProfileImg = styled("img")({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: '0',
    right: "0",
    border: "3px solid white"
});

const ProfileAvatar = ({user ,isMyProfile ,setOpenModal}) => {
    
    const PF = process.env.REACT_APP_PATH;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClickMenu = (event) => {
        if (isMyProfile) {
            setAnchorEl(event.currentTarget);
        }
    };
     
    const handleClose = () => {
        setAnchorEl(null);
    };

 

    return (
        <>  <IconButton
            onClick={handleClickMenu}
            sx={{ position: "relative", right: "70px" }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >

            <ProfileImg
                src={
                    user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "noavatar.png"
                }
                alt=""
            />
        </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    Delete profile picture
                </MenuItem>
                <MenuItem onClick={(e) => setOpenModal(true)}>
                    Change profile picture
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileAvatar
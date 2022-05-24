import React, { useContext } from 'react'
import {
    Box,
    Menu,
    MenuItem,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import AvatarUsername from '../../avatar/AvatarUsername';
import { baseurl } from '../../../config';

const ProfileOption = ({ open, setOpen }) => {
    const { user, dispatch } = useContext(AuthContext);
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }
    const deleteAcount = async () => {
        try {
            await baseurl.delete(`/users/${user._id}`)
            dispatch({ type: "LOGOUT" });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <> <Box sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            gap: "10px",
        }}
            onClick={(e) => setOpen(true)}>
            <AvatarUsername user={user} navbar />
        </Box>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', color: "black" }}>
                        Profile</Link>
                </MenuItem>
                <Link to={`/login`} style={{ textDecoration: 'none', color: "black" }}>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                    <MenuItem onClick={deleteAcount}>Delete</MenuItem>

                </Link>
            </Menu>
        </>
    )
}

export default ProfileOption;
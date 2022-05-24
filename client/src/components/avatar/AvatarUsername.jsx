import React from 'react';
import { Link } from "react-router-dom";
import {Avatar ,styled} from "@mui/material";

const AvatarWraper = styled("div")({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between"
});

const Username = styled("span")({
    textDecorationColor: "none",
    textDecorationLine: "none",
    fontSize: 18,
    fontWeight: "450",
    marginLeft: "5px"
});

const AvatarUsername = ({user,navbar,search}) => {
    const PF = process.env.REACT_APP_PATH;
    return (
            <AvatarWraper  sx={{marginTop: search? "10px":"0px"}}>
                <Link to={`/profile/${user.username}`}>
                    <Avatar
                    sx={{width:navbar?"35px":"40px" , height:navbar?"35px":"40px"}}
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    >
                    </Avatar>
                </Link>
                <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
                    <Username sx={{color: navbar? "white":"black"}}>
                        {user.username}
                    </Username>
                </Link>
            </AvatarWraper>
    )
}

export default AvatarUsername
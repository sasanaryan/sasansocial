import { Mail, Notifications, Webhook } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileOption from "./profileOption/ProfileOption";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Search from "./search/Search";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchCover = styled("div")({
  position: "relative",
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "5px",
  width: "40%"
});




const IconsWraper = styled("div")({
  left: "50px"
});


const Navbar = () => {
  const PF = process.env.REACT_APP_PATH;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);


  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} color="white">
              SasanSocial
            </Typography>
            <IconsWraper sx={{ display: { sm: "none" } }}>
              <Webhook sx={{ size: "40px", color: "white" }} />
            </IconsWraper>
          </Link>
          <SearchCover>
            <Search />
          </SearchCover>
          <Box sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: "20px"
          }}>
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"}
                onClick={(e) => setOpen(true)}
              />
          </Box>
          <ProfileOption open={open} setOpen={setOpen}/>
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

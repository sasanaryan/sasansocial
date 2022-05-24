
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Avatar,
  Button,
  ButtonGroup,
  CardMedia,
  Fab,
  Modal,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  AttachFile,
  Cancel,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { baseurl } from "../../config";
import InputEmoji from 'react-input-emoji';


const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});


const ImageContainer = styled("div")({

  width: "100%",
  marginBottom: "15px"
});


const FileSelect = styled("label")({
  htmlFor: "file",
  cursor: "pointer",
  top: "10px"
});

const Add = ({ posts, setPosts }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PATH;

  function handleOnEnter(text) {
    console.log('enter', text)
  }

  const closeModal = () => {
    setOpen(false);
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: text,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await baseurl.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await baseurl.post("/posts", newPost);
      setPosts([res.data, ...posts]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitHandler}>


          <Box
            sx={{ width: { xs: "280px", sm: "500px" } }}
            bgcolor="white"
            color={"text.primary"}
            p={3}
            borderRadius={5}
          >
            <Typography variant="h6" color="gray" textAlign="center">
              Create post
            </Typography>
            <UserBox>
              <Avatar
                src={user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"}
                sx={{ width: 30, height: 30 }}
              />
              <Typography fontWeight={500} variant="span">
                {user.username}
              </Typography>
            </UserBox>
            <ImageContainer>
              {file && (
                <CardMedia
                  marginBottom="20px"
                  component="img"
                  height="200px"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )}
            </ImageContainer>
            <Stack direction="row" alignItems="center" justifyContent="center" gap={1} mt={2} mb={3}>
              <FileSelect>
                <AttachFile color="primery" />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FileSelect>
              <InputEmoji
                width=""
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a describtion"
              />

            </Stack>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit"  >Post</Button>
              <Button onClick={closeModal} sx={{ width: "100px" }}>
                <Cancel color="warning" />
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      </SytledModal>
    </>
  );
};

export default Add;




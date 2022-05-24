import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Button, Stack, styled, TextField, Typography } from '@mui/material';
import { Mood, Send } from '@mui/icons-material';


const Emoji = styled("div")({
  position: "absolute",
  zIndex: "99",
  bottom: "60px",
  right: "0px"
});

const Wrap = styled("div")({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "30px"
});

const Input = ({
  handleSubmit,
  hasCancelButton,
  handleCancel,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");

  const isTextareaDisabled = input.length === 0;

  const Show = () => {
    setShowEmoji(prev => !prev);
  }

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };


  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(input);
    setInput("");
    setShowEmoji(false);
  };



  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <Emoji>
          {showEmoji &&
            <Picker onEmojiClick={onEmojiClick} />
          }
        </Emoji>
        <Stack direction="row" spacing={0}>
          <TextField
            id="standard-multiline-flexible"
            multiline
            maxRows={3}
            value={input}
            onChange={ (e)=> setInput(e.target.value)}
            fullWidth
            variant="standard"
            placeholder='write something ...'
          />
          <Button onClick={Show}
          sx={{width:"60px", display: { xs: "none", sm: "block" } }}>
            <Mood />
          </Button>
            <Button
              type="submit"
              sx={{ maxWidth: { xs: "35px", sm: "60px" }, minWidth: { xs: "28px", sm: "60px" } }}
              disabled={isTextareaDisabled} >
              <Send color="primery" />
            </Button>
        </Stack>
        {hasCancelButton &&
          <Typography
            sx={{ cursor: "pointer", color: "#FF0000" }}
            onClick={handleCancel}
            fontSize="15px"
            textAlign="center"
            marginTop="10px"
          >
            cancel
          </Typography>
        }
      </form>
    </Wrap>
  );
};

export default Input
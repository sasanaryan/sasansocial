import React, { useContext, useState } from 'react'
import {
    Button,
    ButtonGroup,
    CardMedia,
    Stack,
    styled,
    Typography,
    Box,
    Modal,
} from "@mui/material";
import {
    Add,
    Cancel,
} from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";
import { baseurl } from "../../../config";

const FileSelect = styled("label")({
    htmlFor: "file",
    cursor: "pointer",
    top: "10px"
});

const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const ImageContainer = styled("div")({

    width: "100%",
    marginBottom: "15px"
});

const UploadProfilePicture = ({ setOpenModal, openModal }) => {

    const [file, setFile] = useState(null);


    const { user: currentUser, dispatch } = useContext(AuthContext);

    const closeModal = () => {
        setOpenModal(false);
    }




    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: currentUser._id,
        };
        
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            updatedUser.profilePicture = fileName;
            try {
                await baseurl.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await baseurl.put("/users/" + currentUser._id, updatedUser);
            const res = await baseurl.get(`/users?username=${currentUser.username}`);
            dispatch({ type: "RELOAD_USER", payload: res.data });
            setOpenModal(false);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
            <SytledModal
                open={openModal}
                onClose={(e) => setOpenModal(false)}
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
                            Change ptofile picture
                        </Typography>

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
                                <Add color="primery" />
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </FileSelect>
                        </Stack>
                        <ButtonGroup
                            fullWidth
                            variant="contained"
                            aria-label="outlined primary button group"
                        >
                            <Button type="submit"  >Upload</Button>
                            <Button onClick={closeModal} sx={{ width: "100px" }}>
                                <Cancel color="warning" />
                            </Button>
                        </ButtonGroup>
                    </Box>
                </form>
            </SytledModal>
        </>
    )
}

export default UploadProfilePicture;
import { useContext,  useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Button,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginCover = styled("div")({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#f0f2f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const LoginWrapper = styled("div")({
  width: "70%",
  height: "70%",
  display: "flex"
});


const LoginButton = styled(Button)({
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


const RegisterButton = styled(Button)({
  marginTop: "30px",
  marginBottom: "10px",
  border: "none",
  backgroundColor: "#5db53b",
  color: "white",
  fontSize: "16px",
  fontWeight: "500",
  width: "180px",
  '&:hover': {
      background: "#5db53b ",
  }

});


 const Login = () => {
  
  const [values, setValues] = useState({
    amount: '',
    email:'',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: values.email, password: values.password },
      dispatch
    );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <LoginCover>
      <LoginWrapper>
        <Stack sx={{display:{xs: "none", sm: "block"}}} direction="column"
          flex="1"
          alignItems="center"
          justifyContent="center"
        >
          <Typography sx={{
            fontSize: "50px",
            fontWeight: "800",
            color: "#1775ee",
            marginButton: "10px"
          }}  >SananSocial</Typography>
          <Typography fontSize="24px">
            Connect with friends and the world around you on Lamasocial.
          </Typography>
        </Stack>
        <Stack >
          <form  onSubmit={handleClick}>
          <Stack direction="column"
          alignItems="center"
          justifyContent="space-around">
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-search">Email</InputLabel>
              <OutlinedInput
                required
                id="outlined-search"
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                type="email" />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                required
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <LoginButton  type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </LoginButton>
            <Typography textAlign="center" color="#1775ee" fontSize="12px">Forgot Password?</Typography>

            <RegisterButton >
              <Link to={"/register"} style={{ textDecoration: 'none', color: "white" }}>
                
                 <Typography fontSize="12px">"Create a New Account" </Typography> 
                
              </Link>
            </RegisterButton>
            </Stack >
          </form>
        </Stack>
      </LoginWrapper>
    </LoginCover>
  );
}


export default Login;
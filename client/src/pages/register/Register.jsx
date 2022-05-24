import { baseurl } from "../../config";
import { Link, useHistory } from "react-router-dom";
import { useContext,  useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
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


 const Register = () => {
  const [values, setValues] = useState({
    username:'',
    email:'',
    password: '',
    passwordAgain:'',
    showPassword: false,
    showPasswordAgain: false,
  });
  const [match , setMatch] = useState('');
  const { isFetching } = useContext(AuthContext);
  
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (values.passwordAgain !== values.password) {
      setMatch("Passwords don't match!");
    } else {
      const user = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        await baseurl.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowPasswordAgain = () => {
    setValues({
      ...values,
      showPasswordAgain: !values.showPasswordAgain,
    });
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
              <InputLabel htmlFor="outlined-search">Username</InputLabel>
              <OutlinedInput
                required
                id="outlined-search"
                label="Username"
                value={values.username}
                onChange={handleChange('username')}
                type="username" />
            </FormControl>
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
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">PasswordAgain</InputLabel>
              <OutlinedInput
                label="PasswordAgain"
                required
                id="standard-adornment-password"
                type={values.showPasswordAgain ? 'text' : 'password'}
                value={values.passwordAgain}
                onChange={handleChange('passwordAgain')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordAgain}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPasswordAgain ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {match !== '' && 
            <Typography color="error" fontSize="12px">{match}</Typography>
            }

            <LoginButton  type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Sign up"
              )}
            </LoginButton>
       

            <RegisterButton >
            <Link to={"/login"} style={{ textDecoration: 'none', color:"white" }}>
              
                 <Typography fontSize="12px">Log into account </Typography> 
                
              </Link>
            </RegisterButton>
            </Stack >
          </form>
        </Stack>
      </LoginWrapper>
    </LoginCover>
  );
}

export default Register;
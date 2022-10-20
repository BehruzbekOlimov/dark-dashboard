import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import bg from "../asssets/images/erp-bg.jpg";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axiosClient from "../utills/axiosClient";
import {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import {LOCAL_STORAGE_NAME} from "../utills/constants";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

const theme = createTheme();

export default function SignIn({setUser}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    try {
      console.log({
        username: data.get('username'),
        password: data.get('password'),
      })
      const res = await axiosClient.post("/user/sign-in", {
        username: data.get('username'),
        password: data.get('password'),
      })
      setLoading(false)
      localStorage.setItem(LOCAL_STORAGE_NAME, res.data.jwt)
      setUser(res.data.user)
      navigate("/")
    } catch (e) {
      setLoading(false)
      if (e.response.data.status === 500) {
        setError("Internal Server Error")
      } else {
        setError("Username or password incorrect.")
      }
    }
    //   .then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   setLoading(false)

    // })
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline/>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>
            </Box>
            {error && <Alert style={{width: '100%'}} severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>}
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            // backgroundImage: `url(${bg})`,
            backgroundImage: `url(https://picsum.photos/1500/1000)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

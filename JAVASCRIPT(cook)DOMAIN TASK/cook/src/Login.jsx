import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {

    const navigate = useNavigate();
    const[islogged ,setlogin]=useState(0);
    const[heading ,setheading]=useState("Sign in");
  const  handleSubmit = (event) =>  {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   try{
    axios.post(`http://localhost:3000/login`, {
        email: data.get("email"),
        password :data.get("password")
    })
    .then(result=> {console.log(result.data.length)
        if(result.data.length==0){
         setlogin(0);
         setheading("Not a User")
         setlogin(1);
         navigate({
            pathname: '/App',
            search:`?id=1`}); 
        }
        else{
            setlogin(1);
            navigate({
                pathname: '/App',
                search:`?id=1`});
        }
    })
    
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
}
  catch (error){
    console.error('Error updating favorite status:', error);
  }
  }
 
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/Registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
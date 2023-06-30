import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
      history.push("/home");
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Box textAlign="center">
        <div>
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            label="Password:"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <Button
            style={{
              width: "150px",
              borderRadius: "10px",
              color: "white",
              backgroundColor: "#3d71b8",
            }}
            sx={{ mb: 2 }}
            className="btn"
            type="submit"
            name="submit"
            value="Log In"
          >
            Login
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default LoginForm;

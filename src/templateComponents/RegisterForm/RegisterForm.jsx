import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [pronoun, setPronoun] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        pronoun: pronoun,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Box textAlign="center" display="block">
        <div>
          <TextField
            fullWidth
            label="FirstName"
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="LastName"
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Pronoun"
            type="text"
            name="pronoun"
            value={pronoun}
            required
            onChange={(event) => setPronoun(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            type="date"
            name="birthdate"
            value={birthdate}
            required
            onChange={(event) => setBirthdate(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Email"
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <Button
            style={{
              width: "100%",
              borderRadius: "10px",
              color: "white",
              backgroundColor: "#3d71b8",
            }}
            className="btn"
            type="submit"
            name="submit"
            value="Register"
          >
            Create An Account
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default RegisterForm;

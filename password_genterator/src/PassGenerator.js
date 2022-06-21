import React from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import generatePass from "./passwordGenerate";

export default function PassGenerator() {
  const [haveNumber, setNumber] = React.useState(false);
  const [haveCap, setCap] = React.useState(false);
  const [haveSymbol, setSymbol] = React.useState(false);
  const [length, setLength] = React.useState(10);
  const [pass, setPass] = React.useState('');
  React.useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("create").click();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  function genPass(){
    setPass(generatePass(length,haveNumber,haveCap,haveSymbol));
  }
  function copyText(){
    navigator.clipboard.writeText(pass);
    notify();
  }
  const notify = () =>
    toast("Copied !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  return (
    <Paper elevation={8} style={{ padding: "20px" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField name="pass" disabled fullWidth value={pass} label='Your password'/>
        </Grid>
        <Grid item>
          <TextField
            error={(length<5)}
            name="length"
            type="number"
            label="Length of the password"
            value={length||''}
            onChange={(event)=>{
                setLength(Math.round(event.target.value))}}
          />
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={haveNumber}
                  onChange={() => setNumber((prev) => !prev)}
                />
              }
              label="Contain numbers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={haveCap}
                  onChange={() => setCap((prev) => !prev)}
                />
              }
              label="Contain capital letter"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={haveSymbol}
                  onChange={() => setSymbol((prev) => !prev)}
                />
              }
              label="Contain symbol"
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={genPass} id='create'>Create password</Button>
          <Button variant="outlined" onClick={copyText} style={{ marginLeft: "25px" }}>
            Copy password
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

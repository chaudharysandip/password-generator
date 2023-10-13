import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const PasswordGeneratorStyle = styled("div")(({ theme }) => ({
  "& .password-generator": {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .bg-holder": {
      background: "#fff",
      boxShadow: theme.shadows[1],
      borderRadius: "15px",
      padding: theme.spacing(4),
      minWidth: "550px",
      margin: "0 auto",
      "& .MuiInputBase-root": {
        borderRadius: "8px 0 0 8px",
        "& .MuiInputBase-input": {
          padding: "12px 16px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRight: "none",
        },
      },
      "& .MuiButtonBase-root": {
        height: "47px",
        borderRadius: "0 8px 8px 0",
        boxShadow: "none",
      },
    },
  },
}));

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied!");
  }, [password]);

  useEffect(() => {
    handlePasswordGenerator();
  }, [length, numberAllowed, charAllowed, handlePasswordGenerator]);

  return (
    <PasswordGeneratorStyle>
      <section className="password-generator">
        <Box className="bg-holder">
          <Typography
            variant="h5"
            className="title"
            align="center"
            mb={3}
            fontWeight="bold"
            color="secondary"
          >
            Password Generator
          </Typography>
          <Box
            className="input-holder"
            display="flex"
            alignItems="center"
            mb={2}
          >
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                type="text"
                aria-describedby="outlined-weight-helper-text"
                placeholder="Password"
                value={password}
              />
            </FormControl>
            <Button variant="contained" onClick={copyClipBoard}>
              Copy
            </Button>
          </Box>
          <Box
            className="bottom-content"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Slider
              aria-label="Restricted values"
              defaultValue={length}
              valueLabelDisplay="auto"
              onChange={(e) => setLength(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={numberAllowed} />}
              label="Number"
              color="primary"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <FormControlLabel
              control={<Checkbox checked={charAllowed} />}
              label="Character"
              color="secondary"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </Box>
        </Box>
        <Toaster />
      </section>
    </PasswordGeneratorStyle>
  );
}

export default App;

/**
 * Implements feedback channel for help and revision requests.
 */
import React from "react";
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import teacherImage from "../../assets/images/prof.svg";


const TASBox = ({ text, requestHelp }) => {
  return (
    <div className="parent-tas">
      <Stack direction="row" spacing={1}>
        <Typography>Professor:</Typography>
        <Paper elevation={0}>
          <button className="help-button" onClick={requestHelp}>Request Help</button>
        </Paper>
      </Stack>
      <Paper variant="outlined" sx={{overflowY:"auto", border:'2px solid black', padding:"10px", flex: 1}}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <img
            alt="Professor"
            src={teacherImage}
            style={{ width: 40, height: 40, borderRadius: 'none' }}
          />
        <Paper elevation={0}>{text}</Paper>
        </Stack>
      </Paper>
    </div>
  );
};

export default TASBox;

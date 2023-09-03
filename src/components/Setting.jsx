import React from "react";

import { Button, FormControl, Input } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
function Setting() {
  const [inputBlock, setInputBlock] = useState("");
  const handleTimes = (e) => {
    console.log(e.target.value);
  };
  const handleInputBlock = (e) => {
    setInputBlock(e.target.value);
  };
  console.log(inputBlock);
  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Time Popup Tiếp tục Block</InputLabel>
        <Select onChange={handleTimes}>
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"6"}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Time Block</InputLabel>
        <Input
          placeholder="Nhập Thời Gian 1 Block"
          onChange={handleInputBlock}
        />
      </FormControl>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Course</InputLabel>
        <Select onChange={handleTimes}>
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"6"}>6</MenuItem>
        </Select>
      </FormControl>
      <Button>Setting</Button>
    </div>
  );
}

export default Setting;

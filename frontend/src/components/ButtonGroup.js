import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "../styles/components/ButtonGroup.css";

const ButtonGroup = ({ funcs }) => {
  const { handleClickNext, handleClickBack, handleClickReset } = funcs;
  return (
    <div className="button-container">
      <Stack spacing={2} direction="row">
        <Button
          size="large"
          onClick={handleClickNext}
          color="secondary"
          variant="contained"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
        <Button
          size="large"
          onClick={handleClickBack}
          color="secondary"
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
        >
          Back
        </Button>
        <Button
          size="large"
          onClick={handleClickReset}
          color="primary"
          variant="outlined"
          startIcon={<RestartAltIcon />}
        >
          Reset
        </Button>
      </Stack>
    </div>
  );
};
export default ButtonGroup;

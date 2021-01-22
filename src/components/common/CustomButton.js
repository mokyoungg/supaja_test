import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: (isEveryFieldValid) =>
      isEveryFieldValid ? "#6F63E9" : "#DADADA",
    color: "#ffffff",
    width: "400px",
    fontWeight: "bold",
    "&:hover": {
      background: (isEveryFieldValid) =>
        isEveryFieldValid ? "#6F63E9" : "#DADADA",
    },
  },
});

const CustomButton = ({ value, disabled, isEveryFieldValid }) => {
  const classes = useStyles(isEveryFieldValid);
  return (
    <Button className={classes.root} type="submit" disabled={disabled}>
      {value}
    </Button>
  );
};

export default CustomButton;

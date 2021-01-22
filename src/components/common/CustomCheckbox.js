import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const buttonTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#6F63E9",
    },
  },
});

const CustomCheckbox = (props) => {
  const { checked, onChange } = props;

  return (
    <ThemeProvider theme={buttonTheme}>
      <Checkbox checked={checked} onChange={onChange} />
    </ThemeProvider>
  );
};

export default CustomCheckbox;

import React from "react";

// MUI stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip className={tipClassName} title={tip} placement="top">
    <IconButton className={btnClassName} onClick={onClick}>
      {children}
    </IconButton>
  </Tooltip>
);

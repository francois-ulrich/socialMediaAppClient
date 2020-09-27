import React from "react";

// MUI stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, tip, className, tipClassName }) => (
  <Tooltip className={tipClassName} title={tip} placement="top">
    <IconButton className={className} onClick={onClick}>
      {children}
    </IconButton>
  </Tooltip>
);

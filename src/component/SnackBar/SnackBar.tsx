import React, { ReactNode, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { setShowSnackBar } from "../../redux/slices/utilities";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";

const Alert = React.forwardRef(function Alert(props: {
  children: ReactNode;
  color?: "error" | "info" | "success" | "warning";
  severity: "error" | "info" | "success" | "warning";
  sx: Object;
  onClose?: (event: any) => void;
}) {
  return (
    <MuiAlert elevation={6} variant="filled" {...props}>
      {props?.children}
    </MuiAlert>
  );
});
export default function Snackbars() {
  const dispatch = useAppDispatch();
  let { showHideSnackBar } = useAppSelector((state) => state?.utilities);
  const [status, setStatus] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setShowSnackBar({ status: false }));
  };

  useEffect(() => {
    if (showHideSnackBar?.status) {
      setStatus(showHideSnackBar?.status);
      setTimeout(() => {
        dispatch(setShowSnackBar({ status: false }));
        setStatus(false);
      }, 3000);
    }
  }, [showHideSnackBar, dispatch]);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=> dispatch(setShowSnackBar({ status: false }))}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      {showHideSnackBar?.status && (
        <Snackbar
          open={showHideSnackBar?.status}
          action={action}
          autoHideDuration={showHideSnackBar?.severity == "error" ? 3000 :1000 }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          style={{ zIndex: "999" }}
          onClose={()=>dispatch(setShowSnackBar({ status: false }))}
        >
          <div>
            <Alert
              // className={
              //   showHideSnackBar.severity == "success"
              //     ? "snackbar-green"
              //     : "snackbar-red"
              // }
              color={showHideSnackBar?.severity || "success"}
              severity={showHideSnackBar?.severity || "success"}
              sx={{ width: "100%",fontSize:17 }}
              // onClose={()=>dispatch(setShowSnackBar({ status: false }))}
            >
              {showHideSnackBar?.message}
              {(showHideSnackBar?.severity == "error" && action) || ""}
            </Alert>
          </div>
        </Snackbar>
      )}
    </>
  );
}

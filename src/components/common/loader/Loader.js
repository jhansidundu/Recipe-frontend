import Spinner from "react-bootstrap/Spinner";
import { createPortal } from "react-dom";
import classes from "./Loader.module.css";

const Loader = () => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    return createPortal(
      <div className={classes.container}>
        <Spinner className={classes.loader} size="lg" animation="border" />
      </div>,
      loaderElement
    );
  } else return;
};

export default Loader;

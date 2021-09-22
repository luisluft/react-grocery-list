import React, { useEffect } from "react";

const Alert = ({ type, message, showAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;

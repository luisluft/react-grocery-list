import React, { useEffect } from "react";

const Alert = ({ type, message, showAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;

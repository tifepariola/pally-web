import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div className="mx-auto">
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

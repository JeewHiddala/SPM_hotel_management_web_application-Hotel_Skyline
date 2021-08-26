import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
class Animation extends Component {
  state = {};
  render() {
    return (
      <div>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" variant="rect" height={800} />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    );
  }
}

export default Animation;
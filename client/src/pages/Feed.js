import React, { useState, useEffect } from "react";
import FeedRecipe from "../components/FeedRecipe";

function Feed(props) {

  return (
    <div>
      <FeedRecipe title="title" email="email" img="img" description="description" />
    </div>
  );
}

export default Feed;

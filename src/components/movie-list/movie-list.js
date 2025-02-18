import React from "react";

import Card from "../card";

export default function MovieList({ info, updatedProps}) {
  const list = info.map((movie) => {
    const { id } = movie;
    return (
      <Card
        key={id}
        info={movie}
        updatedProps={updatedProps}
      />
    );
  });
  return <ul className="list">{list}</ul>;
}

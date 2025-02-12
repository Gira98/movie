import React from "react";

import Card from "../card";

export default function MovieList({ info, loading, sessionId, activeTab }) {
  const list = info.map((movie) => {
    const { id } = movie;
    return (
      <Card
        key={id}
        info={movie}
        sessionId={sessionId}
        loading={loading}
        activeTab={activeTab}
      />
    );
  });
  return <ul className="list">{list}</ul>;
}

import React from "react";
import { Club } from "../types/types";

type Props = { club: Club };

export default function ClubCard({ club }: Props) {
  const handleJoin = () => {
    alert(`Siz ${club.name} ga qo'shildingiz (misol)`);
  };

  return (
    <article className="club-card">
      <h3>{club.name}</h3>
      <p>{club.description}</p>
      <button onClick={handleJoin}>Join</button>
    </article>
  );
}

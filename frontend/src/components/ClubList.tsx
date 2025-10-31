import React from "react";
import ClubCard from "./ClubCard";
import { Club } from "../types/types";

type Props = { clubs: Club[] };

export default function ClubList({ clubs }: Props) {
  return (
    <section className="club-list">
      {clubs.map((c) => (
        <ClubCard key={c.id} club={c} />
      ))}
    </section>
  );
}

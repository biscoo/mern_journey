import { useState } from "react";

function NoteCard({ data }) {
  return (
    <div>
      <p>{data.title}</p>
      <p>{data.content}</p>
    </div>
  );
}

export default NoteCard;

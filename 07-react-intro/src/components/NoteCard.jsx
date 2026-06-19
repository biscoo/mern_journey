import { useState } from "react";
import { Link } from "react-router-dom";

function NoteCard({ data }) {
  return (
    <Link to={`/notes/${data._id}`}>
      <div>
        <p>{data.title}</p>
        <p>{data.content}</p>
      </div>
    </Link>
  );
}

export default NoteCard;

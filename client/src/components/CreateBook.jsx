import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5500/create", {
        name: name,
        author: author,
        pages: pages,
        likes: likes,
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    navigate("/");
  };

  return (
    <>
    <h1 className="text-center text-3xl font-bold text-white bg-black p-5">
        CREATE BOOK
      </h1>
      <form onSubmit={submit} className="p-5 m-5 text-lg">
        Name:{" "}
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
        />
        <br />
        Author:{" "}
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
        />
        <br />
        Pages:{" "}
        <input
          type="number"
          onChange={(e) => setPages(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
        />
        <br />
        Likes:{" "}
        <input
          type="number"
          onChange={(e) => setLikes(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
        />
        <br />
        <button
          type="submit"
          className="p-2 m-2 bg-black text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateBook;

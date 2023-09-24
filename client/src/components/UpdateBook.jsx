import React, { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBook() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5500/book/${id}`);
      setName(data.name);
      setAuthor(data.author);
      setPages(data.pages);
      setLikes(data.likes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5500/update/${id}`, {
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
        UPDATE BOOK
      </h1>
      <form onSubmit={submit} className="p-5 m-5 text-lg">
        Name:{" "}
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
          value={name}
        />
        <br />
        Author:{" "}
        <input
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
          value={author}
        />
        <br />
        Pages:{" "}
        <input
          type="number"
          onChange={(e) => setPages(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
          value={pages}
        />
        <br />
        Likes:{" "}
        <input
          type="number"
          onChange={(e) => setLikes(e.target.value)}
          className="border border-black rounded-md p-2 m-3"
          value={likes}
        />
        <br />
        <button
          type="submit"
          className="p-2 m-2 bg-black text-white rounded-md"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateBook;

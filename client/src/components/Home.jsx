import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5500/books");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const deletebook = async (id) => {
    await axios
      .delete(`http://localhost:5500/delete/${id}`)
      .then((result) => {
        console.log("delete success" + result);
        window.location.reload();
      })
      .catch((error) => console.log("delete failed: " + error));
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-white bg-black p-5">
        BOOKS
      </h1>
      <div className="text-2xl m-10 text-center flex justify-end w-[80%] ml-[10%]">
        <Link to="/create" className=" bg-black text-white p-4 rounded-md">ADD Book</Link>
      </div>
      <div className="w-[80%] ml-[10%] text-xl m-10 shadow-md">
        <div className="bg-slate-200 flex justify-evenly">
          <div className="p-2 m-2 w-[10%]">Name</div>
          <div className="p-2 m-2 w-[10%]">Author</div>
          <div className="p-2 m-2 w-[10%]">Pages</div>
          <div className="p-2 m-2 w-[10%]">Likes</div>
          <div className="p-2 m-2 w-[10%]"></div>
          <div className="p-2 m-2 w-[10%]"></div>
        </div>
        <div>
          {data?.map((d) => {
            return (
              <div key={d._id} className="flex justify-evenly">
                <div className="p-2 m-2 w-[10%]">{d.name}</div>
                <div className="p-2 m-2 w-[10%]">{d.author}</div>
                <div className="p-2 m-2 w-[10%]">{d.pages}</div>
                <div className="p-2 m-2 w-[10%]">{d.likes}</div>

                <Link
                  className="p-2 m-2 bg-black text-white rounded-md w-[10%] text-center"
                  to={`/update/${d._id}`}
                >
                  Update
                </Link>

                <button
                  className="p-2 m-2 bg-black text-white rounded-md w-[10%] "
                  onClick={() => deletebook(d._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;

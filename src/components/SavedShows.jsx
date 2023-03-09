import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setMovies(doc.data()?.savedShows);
      })
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShow = async (passedID) => {
    try {
        const result = movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef, {
            savedShows: result
        })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <div className="flex items-center my-2">
        <h2 className="text-white font-bold md:text-xl p-4">
            Watch your favorite shows now
        </h2>
        <Link to='/'>
        <button className="border font-bold text-white px-3 py-2 rounded-lg hover:bg-white hover:text-red-600">Find More</button>
        </Link>
      </div>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-6 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={35}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative mx-4 rounded-lg"
            >
              <img
                className="w-full h-auto block rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white rounded-lg">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {truncateString(item?.title, 40)}
                </p>
                <p onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4">
                  <AiOutlineClose />
                </p>
              </div>
            </div>
           ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-7 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={35}
        />
      </div>
    </>
  );
};

export default SavedShows;

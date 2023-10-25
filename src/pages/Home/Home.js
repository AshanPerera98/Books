import React, { Fragment, useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import "./Home.css";
import Modal from "../../components/Modal/Modal";

import { getFeatured } from "../../api/FireBaseConfig";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [openBook, setOpenBook] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const featuredList = await getFeatured();
      setFeatured(featuredList);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Fragment>
      <Modal
        book={openBook}
        openModal={openModal}
        setOpenBook={setOpenBook}
        setOpenModal={setOpenModal}
      />
      <div className="home">
        {featured ? (
          <div className="grid-container">
            {featured.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  setOpenBook={setOpenBook}
                  setOpenModal={setOpenModal}
                />
              );
            })}
          </div>
        ) : (
          <progress className="progress is-small is-success m-6" max="100">
            15%
          </progress>
        )}
      </div>
    </Fragment>
  );
}

export default Home;

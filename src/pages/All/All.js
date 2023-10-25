import React, { useRef, useEffect, useState, Fragment } from "react";
import { getAllBooks, getFiltered } from "../../api/FireBaseConfig";
import BookCard from "../../components/BookCard/BookCard";
import AppConstants from "./../../constants/AppConstants";

import "./All.css";
import Modal from "../../components/Modal/Modal";

function All() {
  const [allBooks, setAllBooks] = useState([]);
  const [AppConstant, setAppConstant] = useState(AppConstants);
  const [openBook, setOpenBook] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const currentSelectedCategory = useRef("");
  const currentSelectedSubCategory = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      const featuredList = await getAllBooks();
      setAllBooks(featuredList);
    };

    fetchData().catch(console.error);
  }, []);

  const filter = async () => {
    const category = currentSelectedCategory.current.value;
    const subCategory = currentSelectedSubCategory.current.value;

    const result = await getFiltered(category, subCategory);
    setAllBooks(result);
  };

  return (
    <Fragment>
      <Modal
        book={openBook}
        openModal={openModal}
        setOpenBook={setOpenBook}
        setOpenModal={setOpenModal}
      />
      <div className="all">
        {allBooks ? (
          <div className="all-container">
            <div className="field is-horizontal filter py-4 px-6 mt-4 has-background-light">
              <div className="field-label is-normal">
                <label className="label">Category</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="select">
                    <select ref={currentSelectedCategory}>
                      <option>all</option>
                      <option>category-1</option>
                      <option>category-2</option>
                      <option>category-3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field-label is-normal">
                <label className="label">Sub Category</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="select">
                    <select ref={currentSelectedSubCategory}>
                      <option>all</option>
                      <option>sub-category-1</option>
                      <option>sub-category-2</option>
                      <option>sub-category-3</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="button is-success" onClick={filter}>
                <span>Filter</span>
                <span className="icon is-small">
                  <i className="fas fa-magnifying-glass"></i>
                </span>
              </button>
            </div>
            <div className="grid-container">
              {allBooks.map((book) => {
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

export default All;

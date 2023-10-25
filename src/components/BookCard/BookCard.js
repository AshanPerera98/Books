import React from "react";
import "./BookCard.css";

function BookCard(props) {
  const openBook = () => {
    props.setOpenBook(props.book);
    props.setOpenModal(true);
  };
  return (
    <div className="card book-card">
      <div className="card-image">
        <figure className="image is-4by3 book-cover-image">
          <img src={props.book.image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-3 has-text-success">{props.book.title}</p>
            <p className="subtitle is-6">{props.book.author}</p>
            <p className="">
              <span className="tag is-success is-light">
                {props.book.category}
              </span>
              <span className="tag is-light ml-2">
                {props.book.subCategory}
              </span>
            </p>
          </div>
        </div>

        <div className="content">
          {props.book.description.substring(0, 150) + "..."}
          <br />
          <p className="title is-4 mt-4">
            LKR <span>{props.book.price}</span>
          </p>
        </div>
      </div>
      <footer className="card-footer">
        <p href="#" className="card-footer-item">
          <span className="icon is-large has-text-danger">
            <i
              className={`${
                props.book.featured ? "fa-solid" : "fa-regular"
              } fa-heart fa-xl`}
            ></i>
          </span>
        </p>
        <a href="#" className="card-footer-item" onClick={openBook}>
          Show more
        </a>
      </footer>
    </div>
  );
}

export default BookCard;

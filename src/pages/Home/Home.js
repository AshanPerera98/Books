import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import "./Home.css";

import { getFeatured } from "../../api/FireBaseConfig";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const featuredList = await getFeatured();
      setFeatured(featuredList);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="home">
      {featured ? (
        <div className="grid-container">
          {featured.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })}
        </div>
      ) : (
        <progress className="progress is-small is-success m-6" max="100">
          15%
        </progress>
      )}
    </div>
  );
}

export default Home;

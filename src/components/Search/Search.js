import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [loading, setLoading] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );
      setSearchProduct(response.data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="App">
      <h3>Search Filter</h3>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        searchProduct
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <h5 key={item.id}>{item.title}</h5>)
      )}
    </div>
  );
}

export default Search;
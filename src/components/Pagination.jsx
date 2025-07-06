import { useState, useEffect } from "react";
import style from "./pagination.module.css";

const IMG_PER_PAGE = 12;

const Pagination = () => {
  const [productList, setproductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=200`);
    const productList = await response.json();
    setproductList(productList.products);
  };
  const totalImageCount = productList.length;
  const noOfPages = Math.ceil(totalImageCount / IMG_PER_PAGE);
  let start = currentPage * IMG_PER_PAGE;
  let end = start + IMG_PER_PAGE;

  console.log(start, end, "start");

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <h3>Pagination Implemetation</h3>
        <div className={style["pagination"]}>
          {[...Array(noOfPages).keys()].map((item) => (
            <span
              key={item}
              className={currentPage === item && style["active"]}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <div className={style["product-container"]}>
          {productList.length > 0 ? (
            productList
              .slice(start, end)
              .map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  image={item.thumbnail}
                />
              ))
          ) : (
            <div>Data is Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ id, title, image }) => {
  return (
    <div key={id} className={style["product-card"]}>
      <div style={{ minHeight: "135px" }}>
        <img src={image} alt="product-image" style={{ width: "130px" }} />
      </div>
      <div>{title}</div>
    </div>
  );
};

export default Pagination;

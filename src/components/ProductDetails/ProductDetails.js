import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productsActions";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import '../ProductDetails/Productdetails.css';
import Swatch1 from '../ProductDetails/Swatch 01.png';
import Swatch2 from '../ProductDetails/Swatch 02.png';
import Swatch3 from '../ProductDetails/Swatch 03.png';
import Swatch4 from '../ProductDetails/Swatch 04.png';
import heart from '../ProductDetails/heart.png';
import { GiTreeBranch } from "react-icons/gi";
import { WiHot } from "react-icons/wi";
import { GiLindenLeaf } from "react-icons/gi";
import { HiDocumentDuplicate } from "react-icons/hi";
import SignUp from "../SignUp/SignUp";
import Search from "../Search/Search";
import Hamburger from "../Hamburger/Hamburger";

const ProductDetails = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const { onAdd } = props;
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description, rating, rate } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <>
      {Object.keys(product).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="productdetails">
          <div className="container">
            <div className="productdetails__right-breadcrumb mobile">
              <BreadCrumb />
            </div>
            <div class="aem-Grid aem-Grid--12">
              <div class="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                <div className="productdetails__left">
                  <img src={image} />
                </div>
              </div>
              <div class="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                <div className="productdetails__right">
                  <div className="productdetails__right-breadcrumb">
                    <BreadCrumb />
                  </div>

                  <h1 className="productdetails__right-title">{title}</h1>
                  <h4 className="productdetails__right-price">
                    ${price}
                  </h4>
                  <h5 className="productdetails__right-rating">{rating && rating.rate} <i className='fa fa-star'></i> <span>({rating.count})</span>
                  </h5>
                  <p className="productdetails__right-description">{description}</p>
                  <hr />
                  <h5>Color</h5>
                  <div className="productdetails__right-colors">
                    <span><img src={Swatch1} /></span>
                    <span><img src={Swatch2} /></span>
                    <span><img src={Swatch3} /></span>
                    <span><img src={Swatch4} /></span>
                  </div>
                  <h5>Size</h5>
                  <div className="productdetails__right-size">
                    <button>XS</button>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <button>XL</button>
                  </div>
                  <h5>Quantity</h5>
                  <div className="productdetails__right-quantity">
                    <button>-</button><input type="number" min="1" /><button>+</button>
                  </div>
                  <button className="button-primary" onClick={() => onAdd(product)}>Add to Cart</button>
                  <div className="productdetails__right-share">
                    <ul>
                      <li><a href="#"><img src={heart} /> Save</a></li>
                      <li><a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i> Share</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="aem-Grid aem-Grid--12">
              <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                <div className="productdetails__left-desc">
                  <h2>{title}</h2>
                  <h5>Description</h5>
                  <p>{description}</p>
                </div>
              </div>
              <div className="aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--phone--12">
                <div className="productdetails__right">
                  <div className="productdetails__right-space">
                  </div>
                  <h5 className="pro-details">Details</h5>
                  <div className="productdetails__right-icons">
                    <p><GiTreeBranch /> Sweat-wicking</p>
                    <p><WiHot /> Breathable</p>
                  </div>
                  <div className="productdetails__right-icons">
                    <p><GiLindenLeaf /> Lightweight fabric</p>
                    <p><HiDocumentDuplicate /> 69% nylon, 31% lycra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <SignUp />
      <Search/> */}
    </>
  );
};

export default ProductDetails;

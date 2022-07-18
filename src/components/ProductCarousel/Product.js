import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = props => {
  return (
    <>
      <Card style={{ width: "inherit" }}>
        <Card.Img variant="top" src={props.imgSrc} />
        
      </Card>
    </>
  );
};

export default ProductCard;

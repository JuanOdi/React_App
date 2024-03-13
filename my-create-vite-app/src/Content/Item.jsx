import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Item = () => {
  const [data, setdata] = useState([]);

  const items = [
    { name: "T-shirts", price: 200, brand: "Nike" },
    { name: "T-shirts", price: 300, brand: "Nike" },
    { name: "T-shirts", price: 400, brand: "Adidas" },
  ];
  const handleAddtoCart = (index) => {
    setdata((previtems) => {
      const updateItems = [...previtems];
      if (updateItems[index] === undefined) {
        updateItems[index] = 1;
      } else {
        updateItems[index]++;
      }
      const newItem = items[index]; // Get the item from the items array
      updateItems.push(newItem);
      return updateItems;
    });
  };
  const handleRemovetoCart = (index) => {
    setdata((previtems) => {
      const updateItems = [...previtems];
      if (updateItems[index] > 0) {
        updateItems[index]--;
      }

      return updateItems;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        paddingTop: "20px",
        justifyContent: "center",
      }}
    >
      {items.map((item, index) => (
        <Card style={{ width: "18rem" }} key={index}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title className="font-bold text-xl">{item.name}</Card.Title>
            <Card.Text>{item.price}</Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" className="text-black mt-2">
              Buy
            </Button>
            <Button
              variant="primary"
              onClick={() => handleAddtoCart(index)}
              className="text-black mt-2 ml-10"
            >
              {" "}
              +{" "}
            </Button>

            <span className="pt-8 ml-4">{data[index] || 0}</span>
            <Button
              variant="primary"
              onClick={() => handleRemovetoCart(index)}
              className="text-black mt-2 ml-6"
            >
              {" "}
              -{" "}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Item;

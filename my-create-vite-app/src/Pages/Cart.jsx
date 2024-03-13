import React, { useCallback, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { products } from "../constants/products";
import { Spin } from "antd";

const Cart = () => {
  const cart1 = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(cart1 ?? []);
  const [Loading, setLoading] = useState(true);
  // Function to handle buy action
  const handleBuy = () => {
    console.log("Buy button clicked!");
  };

  const removeToCart = useCallback((productId) => {
    setCart((prevCart) => {
      const newItems = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemovetoCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      updateQuantity(productId, -1);
    } else {
      removeToCart(productId);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <>
      {Loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex mt-8 justify-center ml-96">
            <ul className="flex flex-row space-x-52">
              <li className="font-bold text-2xl"> Name</li>
              <li className="font-bold text-2xl">Unit Price</li>
              <li className="font-bold text-2xl">Quantity</li>
              <li className="font-bold text-2xl">Total Price</li>
            </ul>
          </div>

          {cart1 &&
            cart1.map((item) => {
              const normalPrice = item.price * item.quantity;

              return (
                <div className="flex" key={item.id}>
                  <div className="px-4 py-4">
                    <Card
                      className="flex flex-row space-x-9"
                      style={{ width: "90rem" }}
                    >
                      <Card.Img variant="top" src={item.img} className="w-96" />
                      <Card.Body>
                        <div className="flex justify-between mt-10">
                          <Card.Title className="font-bold text-2xl">
                            {item.name}
                          </Card.Title>
                          <Card.Text className="ml-32 text-2xl font-semibold">
                            ₱ {item.price}
                          </Card.Text>
                          <div className="mr-52 ml-44">
                            <Button
                              className="bg-blue-400 text-lg font-bold"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                            <span className="ml-4">{item.quantity}</span>
                            <Button
                              className="bg-red-500 border-white hover:bg-red-600 text-lg font-bold ml-4 pl-3 pr-3"
                              onClick={() => handleRemovetoCart(item.id)}
                            >
                              -
                            </Button>
                          </div>
                          <Card.Text className="text-2xl font-semibold">
                            ₱ {normalPrice}
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          <div className="d-flex justify-content-end mr-10 align-items-center">
            <p className="text-2xl font-bold">
              Total Price ={" "}
              <span className="text-3xl">
                ₱{" "}
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </p>
          </div>

          {/* Attach handleBuy function to onClick event */}
          <Button
            variant="primary"
            className="text-white mt-2 ml-4 pl-10 pr-10 bg-blue-500 hover:scale-110"
            onClick={handleBuy}
          >
            Buy
          </Button>
        </>
      )}
    </>
  );
};

export default Cart;

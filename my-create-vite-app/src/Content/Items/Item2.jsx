import React, { useCallback, useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { products } from "../../constants/products";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../../Pages/Cart";

const Item2 = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const localdata = localStorage.getItem("cart");
    return localdata ? JSON.parse(localdata) : [];
  });

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddtoCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) {
      addToCart(product);
    } else {
      updateQuantity(product.id, 1);
    }
  };

  // Hooks
  const removeToCart = useCallback((productId) => {
    setCart((prevCart) => {
      const newItems = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);
  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const spinner = useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex gap-20 justify-content-center pt-6">
      <div>
        <ProductList
          products={products}
          addToCart={addToCart}
          removeToCart={removeToCart}
          cart={cart}
          showModal={showModal}
          updateQuantity={updateQuantity}
          handleAddtoCart={handleAddtoCart}
          spinner={spinner}
          Loading={Loading} // Pass handleAddtoCart here
        />
        <Link to="/about">About</Link>
      </div>
      <div className="flex">
        <Modal
          title="Product Image"
          open={isModalOpen} // Correct prop name
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            {Loading ? (
              <Spin size="large" /> // Render the spinner when loading
            ) : (
              <>
                {selectedProduct && (
                  <>
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                      style={{ maxWidth: "100%" }}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleRemovetoCart(selectedProduct.id)}
                      className="text-white mt-2 ml-4 bg-blue-500"
                    >
                      Buy now
                    </Button>
                    <Button
                      onClick={() => handleAddtoCart(selectedProduct)}
                      className="text-white mt-2 ml-10 bg-orange-400 hover:bg-orange-500 border-white"
                    >
                      Add to cart
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </Modal>
      </div>

      {/* <Cart updateQuantity={updateQuantity}></Cart> */}
    </div>
  );
};

const ProductList = ({
  products,

  showModal,

  Loading,
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Loading ? (
          <div className="col-span-full flex justify-center">
            <Spin size="large" className="text-color" />
          </div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id}>
                <Card
                  style={{ width: "18rem" }}
                  className="transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => showModal(product)}
                >
                  <Card.Img variant="top" src={product.img} />
                  <Card.Body>
                    <Card.Title className="font-bold text-xl">
                      {product.name}
                    </Card.Title>
                    <Card.Text>{product.price}</Card.Text>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Item2;

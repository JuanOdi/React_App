import React, { useCallback, useState } from "react";
import { Modal } from "antd";
import { products } from "../../constants/products";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../../Pages/Cart";

const Item2 = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const localdata = localStorage.getItem("cart");
    return localdata ? JSON.parse(localdata) : [];
  });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleAddtoCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) {
      addToCart(product);
    } else {
      updateQuantity(product.id, 1);
    }
  };

  // Cart
  const removeToCart = useCallback((productId) => {
    setCart((prevCart) => {
      const newItems = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  //Add Quantity
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
          handleAddtoCart={handleAddtoCart} // Pass handleAddtoCart here
        />
        <Link to="/about">About</Link>
      </div>
      <div>
        <Modal
          title="Product Image"
          visible={isModalOpen} // Correct prop name
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
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
          </div>

          {selectedProduct && (
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              style={{ maxWidth: "100%" }}
            />
          )}
        </Modal>
      </div>

      {/* <Cart updateQuantity={updateQuantity}></Cart> */}
    </div>
  );
};

const ProductList = ({
  products,
  addToCart,
  removeToCart,
  cart,
  showModal,
  updateQuantity,
  handleAddtoCart, // Receive handleAddtoCart as prop
}) => {
  const handleRemovetoCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      updateQuantity(productId, -1);
    } else {
      removeToCart(productId);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Item2;

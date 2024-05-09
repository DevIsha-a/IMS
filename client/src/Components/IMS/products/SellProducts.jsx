import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
const SellProducts = () => {
  const [formData, setFormData] = useState({
    _id: "",
    brand: "",
    category: "",
    description: "",
    discountPercentage: 0,
    price: "",
    stock: "",
    title: "",
    quantity: 1, 
  });
  const [product, setCurrProduct] = useState({});
  const { id } = useParams();
  const [quantity, setquantity] = useState(1);
  const [salePrice, setSalePrice] = useState(0);

  useEffect(() => {
    setSalePrice(formData.price);
  }, [formData.price]);

  useEffect(() => {
    const setActiveProduct = async () => {
      let resp = await axios.post("http://localhost:5500/api/fetchOneProduct", { product_id: id });
      // console.log(resp);
      if (resp.data.msg === "sent") {
        setCurrProduct(resp.data.data[0]);
        setFormData(resp.data.data[0]);
      } else {
        alert("something went wrong");
      }
    };

    setActiveProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      const quantityValue = parseInt(value, 10);
      if (
        !isNaN(quantityValue) &&
        quantityValue > 0 &&
        quantityValue <= product.stock
      ) {
        setquantity(quantityValue);
      } else {
        toast.error("Invalid quantity or maximum limit reached", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
    if (name === "salePrice") {
      setSalePrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { _id } = formData;
    let resp = await axios.post("http://localhost:5500/api/createSaleOrder", {
      product: _id,
      quantity: quantity,
      salePrice: salePrice,
      purchasePrice: formData.price,
      buyer: "unknown",
    });

    console.log(resp.data);
    if (resp.data.msg == "order saved") {
      let stockResp = await axios.post("http://localhost:5500/api/editQuantity", {
        product,
        formData,
        quantity: quantity,
      });
      console.log(stockResp);
      handleReset();
      toast.success("Product sold successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } else {
      toast.error("something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const handleReset = () => {
    setquantity(0);
    setSalePrice(0);
    setFormData({
      _id: "",
      brand: "",
      category: "",
      description: "",
      discountPercentage: 0,
      price: "",
      stock: "",
      title: "",
      quantity: 1,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4"> 
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title:
          </label>
          <input
            disabled
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="   w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-gray-700 font-medium mb-1"
          >
            Brand:
          </label>
          <input
            disabled
            required
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-1"
          >
            Category:
          </label>
          <input
            disabled
            required
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description:
          </label>
          <input
            disabled
            required
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        {/* <div className="mb-4">
      <label htmlFor="discountPercentage" className="block text-gray-700 font-medium mb-1">
        Discount Percentage:
      </label>
      <input
        required
        type="number"
        id="discountPercentage"
        name="discountPercentage"
        value={formData.discountPercentage}
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
      />
    </div> */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Purchase Price:
          </label>
          <input
            disabled
            required
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="salePrice"
            className="block text-gray-700 font-medium mb-1"
          >
            Sale Price:
          </label>
          <input
            required
            type="number"
            id="salePrice"
            name="salePrice"
            value={salePrice}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-medium mb-1"
          >
            Quantity:
          </label>
          <input
            required
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-gray-700 font-medium mb-1"
          >
            Stock:
          </label>
          <input
            required
            type="number"
            id="stock"
            name="stock"
            disabled
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-4">
          <button
            disabled={product.stock < 1}
            type="submit"
            className=" disabled:bg-slate-600 w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none"
          >
            sell
          </button>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SellProducts;

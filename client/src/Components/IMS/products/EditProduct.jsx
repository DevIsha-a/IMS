import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const EditProduct = ({ product, setProducts, setshowEditProd }) => {
  // console.log(product)
  const [formData, setFormData] = useState({
    _id: product._id,
    brand: product.brand,
    category: product.category,
    description: product.description,
    discountPercentage: 0,
    price: product.price,
    stock: product.stock,
    title: product.title,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp = await axios.post("http://localhost:5500/api/editProduct", {
      product: formData,
    });
    console.log(resp);
    setProducts(resp.data.data);
    setshowEditProd(false);
    console.log(resp.data);
    toast.success("Product edited successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
  };

  return (
    <div
      className="flex gap-6"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        zIndex: 9999,
      }}
    >
      <div
        className="absolute top-10 right-[30%] text-white text-2xl"
        onClick={() => setshowEditProd(false)}
      >
        X
      </div>
      <form
        className="card p-4 position-absolute h-100 "
        style={{
          width: "350px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="brand" className="block font-medium mb-1">
            Brand:
          </label>
          <input
            required
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="id">
          <label htmlFor="title" className="block font-medium mb-1">
            title:
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category:
          </label>
          <input
            required
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            description:
          </label>
          <input
            required
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountPercentage"
            className="block font-medium mb-1"
          >
            discountPercentage:
          </label>
          <input
            required
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            Price:
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const AddProducts = () => {
    
    const [formData, setFormData] = useState({
        brand: '',
        category: '',
        description: '',
        images: [],
        price: 0,
        rating: 0,
        stock: 0,
        thumbnail: '',
        title: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        // setProducts((prev)=>[...prev, formData])
        let resp=await axios.post ('http://localhost:5500/api/saveProduct',formData )
        console.log(resp.data)
        if(resp.data.msg=='saved')
        {
          handleReset();
          toast.success('Product added successfully!',{ position: toast.POSITION.BOTTOM_RIGHT, autoClose:1000})
        }            
      };
    
const handleReset= ()=>{
setFormData(
{  brand: '',
  category: '',
  description: '',
  // discountPercentage: 0,
  // id: products.length+1,
  images: [],
  price: 0,
  rating: 0,
  stock: 0,
  thumbnail: '',
  title: '',}
)

}

      return (
        <div className="max-w-md mx-auto mt-4">
          <form onSubmit={handleSubmit}>
            
            <div className="id">
              <label htmlFor="title" className="block font-medium mb-1">
              Title:
              </label>
              <input required
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="brand" className="block font-medium mb-1">
                Brand:
              </label>
              <input required
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1">
                Category:
              </label>
              <input required
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
              <input required 
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            {/* <div className="mb-4">
              <label htmlFor="discountPercentage" className="block font-medium mb-1">
              discountPercentage:
              </label>
              <input required 
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="price" className="block font-medium mb-1">
                Price:
              </label>
              <input required 
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div className="id">
              <label htmlFor="stock" className="block font-medium mb-1">
                Stock:
              </label>
              <input required
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            
            <div className="mt-4">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Purchase
              </button>
            </div>
          </form>
          <ToastContainer></ToastContainer>
    </div>
  )
}

export default AddProducts

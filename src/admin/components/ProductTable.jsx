
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Image} from 'antd'

const ProductTable = () => {

  // const products = [
  //   { id: 1, name: "Laptop", category: "Electronics", price: "$1000" },
  //   { id: 2, name: "Smartphone", category: "Electronics", price: "$500" },
  //   { id: 3, name: "Shoes", category: "Fashion", price: "$80" },
  //   { id: 4, name: "ABC", category: "BJF", price: "$1000" },
  //   { id: 5, name: "Smartphone", category: "Electronics", price: "$500" },
  //   { id: 6, name: "Shoes", category: "Fashion", price: "$80" },
  //   { id: 7, name: "Laptop", category: "Electronics", price: "$1000" },
  //   { id: 8, name: "Smartphone", category: "Electronics", price: "$500" },
  //   { id: 9, name: "Shoes", category: "Fashion", price: "$80" },
  //   // Add more products as needed
  // ];
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.Classification.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8082/productsDis');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
    return (
      <div className="container mx-auto p-6">
      {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Table
      </h2> */}

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-y-auto max-h-96 rounded-lg shadow-lg border border-gray-200">
        <table  className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Image
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Scientific Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Classification
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Size
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Weight
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Skin Color
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Others Info
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.id}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                <Image className="h-20 w-20 object-contain rounded-2xl"
                              width={50}
                              src={`data:${product.mimeType};base64,${product.image}`}
                            />
                 
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Name}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Scientific_Name}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Classification}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Size}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Weight}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Skin_Color}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Price}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Others_Info}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  };
  
  export default ProductTable;
  
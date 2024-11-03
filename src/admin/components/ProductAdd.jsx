const ProductAdd = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <form>
          <label className="block mb-2">
            Product Name:
            <input type="text" className="border p-2 w-full rounded-md" />
          </label>
          <label className="block mb-2">
            Price:
            <input type="number" className="border p-2 w-full rounded-md" />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Product
          </button>
        </form>
      </div>
    );
  };
  
  export default ProductAdd;
  
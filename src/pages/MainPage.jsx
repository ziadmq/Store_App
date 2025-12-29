import { useState, useEffect } from "react";
import axios from "axios";
import "./MainPage.css"; // سننشئ هذا الملف الآن

export default function MainPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [newItem, setNewItem] = useState({ name: "", brand: "", price: "" });

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items", { withCredentials: true });
      setItems(res.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/items", newItem, { withCredentials: true });
      setNewItem({ name: "", brand: "", price: "" });
      fetchItems();
    } catch (err) { alert("Please login to add products"); }
  };

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ color: "#4F46E5" }}>Store Products</h1>

      {/* نموذج إضافة منتج - مصمم ليتناسب مع الواجهة */}
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <form className="add-form" onSubmit={handleAddItem}>
          <input type="text" placeholder="Product Name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
          <input type="text" placeholder="Brand" value={newItem.brand} onChange={(e) => setNewItem({...newItem, brand: e.target.value})} required />
          <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required />
          <button type="submit" className="add-btn">Add to Store</button>
        </form>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
        </select>
      </div>

      {/* العودة لتصميم الـ Grid الأصلي */}
      <div className="grid">
        {filteredItems.map((item) => (
          <div className="card" key={item._id}>
            <div className="card-title">{item.name}</div>
            <div className="card-brand">{item.brand}</div>
            <div className="card-price">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
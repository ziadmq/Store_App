import { useState } from "react";
import { items } from "../data/items";

export default function MainPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container">
      <h1 style={{ color: "#4F46E5" }}>Store Products</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
        </select>
      </div>

      <div className="grid">
        {filteredItems.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-title">{item.name}</div>
            <div className="card-brand">{item.brand}</div>
            <div className="card-price">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

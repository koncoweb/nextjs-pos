import { useState, useEffect } from 'react';

    const Home = () => {
      const [items, setItems] = useState([
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 },
        { name: 'Item 3', price: 30 },
      ]);
      const [cart, setCart] = useState([]);
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [newItemName, setNewItemName] = useState('');
      const [newItemPrice, setNewItemPrice] = useState('');

      useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || items;
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(storedItems);
        setCart(storedCart);
      }, []);

      useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [items, cart]);

      const addItem = (item) => {
        setItems([...items, item]);
      };

      const addToCart = (item) => {
        setCart([...cart, item]);
      };

      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      const handleAddNewItem = () => {
        if (newItemName && newItemPrice) {
          const newItem = { name: newItemName, price: parseFloat(newItemPrice) };
          addItem(newItem);
          setNewItemName('');
          setNewItemPrice('');
        }
      };

      return (
        <div className="flex">
          <button onClick={toggleSidebar} className="p-2 bg-blue-500 text-white rounded m-4">Toggle Sidebar</button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''} bg-gray-100 p-4 w-64 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} - ${item.price.toFixed(2)}
                  <button onClick={() => addToCart(item)} className="ml-2 bg-green-500 text-white p-1 rounded">Add to Cart</button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
              <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full p-1 mb-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Item Price"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                className="w-full p-1 mb-2 border border-gray-300 rounded"
              />
              <button onClick={handleAddNewItem} className="bg-blue-500 text-white p-1 rounded">Add Item</button>
            </div>
          </div>
          <div className="content p-4 w-full ml-64">
            <h1 className="text-2xl font-bold mb-4">Point of Sale App</h1>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(item)} className="mt-2 bg-green-500 text-white p-1 rounded">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Cart</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default Home;

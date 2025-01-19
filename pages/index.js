// This app created by Koncoweb

    import { useState, useEffect } from 'react';
    import Link from 'next/link';
    import { FaBars } from 'react-icons/fa';

    const Home = () => {
      const [items, setItems] = useState([
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 },
        { name: 'Item 3', price: 30 },
      ]);
      const [cart, setCart] = useState([]);
      const [sidebarOpen, setSidebarOpen] = useState(false);

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

      const addToCart = (item) => {
        setCart([...cart, item]);
      };

      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      return (
        <div className="flex">
          <button onClick={toggleSidebar} className="p-2 bg-blue-500 text-white rounded m-4">
            <FaBars />
          </button>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''} bg-gray-100 p-4 w-64 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            <ul>
              <li className="mb-2">
                <Link href="/" legacyBehavior>
                  <a className="text-blue-500">Home</a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/products" legacyBehavior>
                  <a className="text-blue-500">Products</a>
                </Link>
              </li>
            </ul>
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

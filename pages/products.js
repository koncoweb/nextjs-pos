// This app created by Koncoweb

    import { useState, useEffect } from 'react';

    const Products = () => {
      const [items, setItems] = useState([]);
      const [newItemName, setNewItemName] = useState('');
      const [newItemPrice, setNewItemPrice] = useState('');
      const [editingItem, setEditingItem] = useState(null);
      const [editingItemName, setEditingItemName] = useState('');
      const [editingItemPrice, setEditingItemPrice] = useState('');

      useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setItems(storedItems);
      }, []);

      useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
      }, [items]);

      const addItem = () => {
        if (newItemName && newItemPrice) {
          const newItem = { name: newItemName, price: parseFloat(newItemPrice) };
          setItems([...items, newItem]);
          setNewItemName('');
          setNewItemPrice('');
        }
      };

      const deleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
      };

      const startEditing = (index) => {
        setEditingItem(index);
        setEditingItemName(items[index].name);
        setEditingItemPrice(items[index].price);
      };

      const updateItem = () => {
        if (editingItem !== null && editingItemName && editingItemPrice) {
          const updatedItems = items.map((item, index) => {
            if (index === editingItem) {
              return { name: editingItemName, price: parseFloat(editingItemPrice) };
            }
            return item;
          });
          setItems(updatedItems);
          setEditingItem(null);
          setEditingItemName('');
          setEditingItemPrice('');
        }
      };

      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Products Management</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
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
            <button onClick={addItem} className="bg-blue-500 text-white p-1 rounded">Add Item</button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Items</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {editingItem === index ? (
                        <input
                          type="text"
                          value={editingItemName}
                          onChange={(e) => setEditingItemName(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItem === index ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editingItemPrice}
                          onChange={(e) => setEditingItemPrice(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded"
                        />
                      ) : (
                        `$${item.price.toFixed(2)}`
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {editingItem === index ? (
                        <>
                          <button onClick={updateItem} className="bg-green-500 text-white p-1 rounded mr-2">Update</button>
                          <button onClick={() => setEditingItem(null)} className="bg-red-500 text-white p-1 rounded">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(index)} className="bg-blue-500 text-white p-1 rounded mr-2">Edit</button>
                          <button onClick={() => deleteItem(index)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    export default Products;

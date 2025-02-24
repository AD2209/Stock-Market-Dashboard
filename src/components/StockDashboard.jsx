import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockDashboard = () => {
  const [stock, setStock] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalInvestment, setTotalInvestment] = useState(10000); // Initial investment
  const [currentValue, setCurrentValue] = useState(10000); // Initial current value
  const [portfolio, setPortfolio] = useState([]); // Track bought stocks

  // Toast notifications
  const handleBuy = () => {
    const qty = parseInt(quantity);
    if (stock && qty > 0) {
      const pricePerShare = Math.floor(Math.random() * 100) + 1; // Simulate stock price
      const cost = pricePerShare * qty;

      // Update portfolio
      const newPortfolio = [...portfolio, { stock, qty, pricePerShare }];
      setPortfolio(newPortfolio);

      // Update total investment and current value
      setTotalInvestment(prev => prev + cost);
      setCurrentValue(prev => prev + cost);

      toast.success(`✅ Bought ${qty} shares of ${stock} at $${pricePerShare} each`);
      setStock('');
      setQuantity('');
    } else {
      toast.error('⚠️ Please enter valid stock symbol and quantity');
    }
  };

  const handleSell = () => {
    const qty = parseInt(quantity);
    const existingStock = portfolio.find(item => item.stock === stock);

    if (existingStock && qty > 0 && existingStock.qty >= qty) {
      const sellPricePerShare = Math.floor(Math.random() * 100) + 1; // Simulate sell price
      const earnings = sellPricePerShare * qty;

      // Update portfolio
      const updatedPortfolio = portfolio.map(item =>
        item.stock === stock ? { ...item, qty: item.qty - qty } : item
      ).filter(item => item.qty > 0); // Remove stocks with 0 qty

      setPortfolio(updatedPortfolio);

      // Update current value (reduce by sold amount)
      setCurrentValue(prev => prev - (existingStock.pricePerShare * qty));

      toast.warn(`⚡ Sold ${qty} shares of ${stock} at $${sellPricePerShare} each`);
      setStock('');
      setQuantity('');
    } else {
      toast.error('⚠️ Invalid sell operation');
    }
  };

  // Inline styles as JS objects
  const containerStyle = {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  };

  const headerStyle = {
    color: '#333',
    marginBottom: '20px',
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    margin: '20px auto',
    width: '300px',
  };

  const inputStyle = {
    padding: '10px',
    margin: '5px',
    width: '80%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
  };

  const buyButtonStyle = { ...buttonStyle, backgroundColor: '#4CAF50' }; // Green
  const sellButtonStyle = { ...buttonStyle, backgroundColor: '#f44336' }; // Red

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Stock Market Dashboard</h1>

      <div style={sectionStyle}>
        <h2>Portfolio Summary</h2>
        <p>Total Investment: ${totalInvestment}</p>
        <p>Current Value: ${currentValue}</p>
        <p>Profit/Loss: ${currentValue - totalInvestment}</p>
      </div>

      <div style={sectionStyle}>
        <h2>Simulate Trade</h2>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />
        <br />
        <button onClick={handleBuy} style={buyButtonStyle}>
          Buy
        </button>
        <button onClick={handleSell} style={sellButtonStyle}>
          Sell
        </button>
      </div>

      <div style={sectionStyle}>
        <h2>AD's Portfolio</h2>
        {portfolio.length === 0 ? (
          <p>No stocks in portfolio.</p>
        ) : (
          <ul>
            {portfolio.map((item, index) => (
              <li key={index}>
                {item.stock.toUpperCase()} - {item.qty} shares @ ${item.pricePerShare} each
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default StockDashboard;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import DateRangeForm from "./components/DateRangeForm";
import PowerCurveDisplay from "./components/PowerCurveDisplay";
import './global.css';

function App() {
  const [graphData, setGraphData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/power-curve" element={<DateRangeForm />} />
          <Route path="/power-curve-display" element={<PowerCurveDisplay />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

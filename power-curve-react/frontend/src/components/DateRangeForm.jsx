import React, { useState } from "react";
import "./DateRangeForm.css";
import { useNavigate } from "react-router-dom";

function DateRangeForm() {
  const [activityType, setActivityType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [numDays, setNumDays] = useState("");
  const [testedFTP, setTestedFTP] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!activityType || !startDate || !numDays || !testedFTP) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = {
      activityType,
      date: startDate,
      numDays: parseInt(numDays, 10),
      testedFTP: parseFloat(testedFTP),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/calculate-power-curve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to fetch");
      }

      // Handle JSON response with the image URL
      const responseData = await response.json();
      navigate("/power-curve-display", {
        state: { image: responseData.imageUrl, data: formData },
      });
    } catch (error) {
      console.error("Error fetching power curve:", error);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Activity Type:</label>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value="">Please select</option>
            <option value="Ride">Ride</option>
            <option value="Run">Run</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Number of Days:</label>
          <input
            type="number"
            value={numDays}
            onChange={(e) => setNumDays(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tested FTP:</label>
          <input
            type="number"
            value={testedFTP}
            onChange={(e) => setTestedFTP(e.target.value)}
          />
        </div>
        <button type="submit">Generate Power Curve</button>
      </form>
    </div>
  );
}

export default DateRangeForm;

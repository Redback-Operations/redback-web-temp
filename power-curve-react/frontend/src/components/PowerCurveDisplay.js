import React from "react";
import { useLocation } from "react-router-dom";
import "./PowerCurveDisplay.css"; // Import the CSS file

function PowerCurveDisplay() {
  const location = useLocation();
  const { image, data } = location.state || {};

  return (
    <div className="power-curve-display">
      <h1>Displaying your power curve</h1>
      <div className="graph-container">
        <div className="graph">
          {image && <img src={image} alt="Power Curve" />}
        </div>
        <div className="data-container-box">
          <div className="data-container">
            <h2>User Entered Values</h2>
            <table>
              <tbody>
                <tr>
                  <td>Activity Type:</td>
                  <td>{data?.activityType}</td>
                </tr>
                <tr>
                  <td>Start Date:</td>
                  <td>{data?.date}</td>
                </tr>
                <tr>
                  <td>Number of Days:</td>
                  <td>{data?.numDays}</td>
                </tr>
                <tr>
                  <td>Tested FTP:</td>
                  <td>{data?.testedFTP}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PowerCurveDisplay;

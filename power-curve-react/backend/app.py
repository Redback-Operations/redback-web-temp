import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
from models.power_curve import PowerCurveAnalyzer

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from the frontend

@app.route('/calculate-power-curve', methods=['POST'])
def calculate_power_curve_endpoint():
    data = request.get_json()
    print("Received data:", data)

    activity_type = data.get('activityType')
    date = data.get('date')
    num_days = data.get('numDays', 0)
    tested_ftp = data.get('testedFTP', 0)

    # Validate and convert input data
    try:
        num_days = int(num_days)
        tested_ftp = float(tested_ftp)
        start_date = datetime.strptime(date, "%Y-%m-%d")
    except ValueError as e:
        print("Conversion error:", e)
        return jsonify({"error": "Invalid input data"}), 400

    # Initialize the PowerCurveAnalyzer with the dataset
    analyzer = PowerCurveAnalyzer()

    # Generate power curve data
    print("start_date:", start_date)
    print("Activity Type:", activity_type)
    print("Number of days:", num_days)
    print("Tested FTP:", tested_ftp)
    power_curve = analyzer.create_power_curve(activity_type, start_date, num_days)

    print("Generated power curve data:", power_curve)

    # Plot the power curve and store the plot
    plot_filename = 'power_curve.png'
    plot_path = os.path.join('static', plot_filename)
    analyzer.plot_power_curve(power_curve, tested_ftp, plot_path)

    # Return the URL of the generated image
    image_url = request.host_url + 'static/' + plot_filename
    return jsonify({"message": "Power curve generated successfully.", "imageUrl": image_url}), 200

@app.route('/static/<path:path>')
def send_static(path):
    """Serve static files."""
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

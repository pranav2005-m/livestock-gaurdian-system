const transporter = require("../config/mailer");

/**
 * Check sensor data and send alert if needed
 * @param {Object} animal - Animal document with populated userId
 * @param {Object} sensorData - Sensor data document
 */
exports.sendAlertIfNeeded = async (animal, sensorData) => {
  try {
    if (!animal || !sensorData) return;

    const { temperature, heartRate, pressure, location } = sensorData;
    const { northEast, southWest } = animal.zoneLocation || {};
    const alerts = [];

    // Get user email
    const email = animal.userId?.email;
    if (!email) {
      console.log("❌ No email found for user to send alert");
      return;
    }

    // ----- Zone check -----
    if (northEast && southWest && location) {
      const lat = location.lat;
      const lng = location.lng;

      const latMin = Math.min(southWest[0], northEast[0]);
      const latMax = Math.max(southWest[0], northEast[0]);
      const lngMin = Math.min(southWest[1], northEast[1]);
      const lngMax = Math.max(southWest[1], northEast[1]);

      if (lat < latMin || lat > latMax || lng < lngMin || lng > lngMax) {
        alerts.push(`${animal.name} is outside the safe zone!`);
      }
    }

    // ----- Health checks -----
    if (temperature && temperature > 40) alerts.push(`${animal.name} temperature too high: ${temperature}°C`);
    if (heartRate && heartRate > 100) alerts.push(`${animal.name} heart rate too high: ${heartRate} bpm`);
    if (pressure && pressure > 150) alerts.push(`${animal.name} pressure too high: ${pressure}`);

    // ----- Send Email -----
    if (alerts.length > 0) {
      const mailOptions = {
        from: `"Animal Monitoring System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "⚠️ Animal Alert Notification",
        text: alerts.join("\n"),
      };

      await transporter.sendMail(mailOptions);
      console.log(`📩 Alert Email Sent to ${email}:`, alerts);
    } else {
      console.log("✅ No alerts triggered");
    }
  } catch (err) {
    console.error("❌ Failed to send alert email:", err.message);
  }
};

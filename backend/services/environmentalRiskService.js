/**
 * Environmental Risk Service
 * Multimodal Fusion Engine combining local environmental weather conditions 
 * (temperature, humidity, precipitation) with CNN disease diagnostics.
 */

function assessEnvironmentalRisk(cropName, diseaseName, weatherData = {}) {
  const temp = weatherData.temp !== undefined ? Number(weatherData.temp) : 26;
  const humidity = weatherData.humidity !== undefined ? Number(weatherData.humidity) : 65;
  const rainProb = weatherData.rainProb !== undefined ? Number(weatherData.rainProb) : 20;
  const condition = weatherData.condition || 'Clear';

  const riskFactors = [];
  let riskScore = 15; // Base risk

  const diseaseLower = (diseaseName || '').toLowerCase();

  const isHighMoisture = humidity > 75 || rainProb > 50;
  const isModMoisture = (humidity > 55 && humidity <= 75) || (rainProb > 25 && rainProb <= 50);

  // Fungal Blight Disease Environmental Assessment (Late Blight / Early Blight)
  if (diseaseLower.includes('blight')) {
    if (diseaseLower.includes('late')) {
      // Late Blight (Phytophthora infestans) prefers cool/mild (12-24°C) & high humidity (>75%)
      if (isHighMoisture) {
        riskScore += 40;
        riskFactors.push(`High relative humidity (${humidity}%) and rain forecast (${rainProb}%) significantly enhance Late Blight sporangia formation.`);
        if (temp >= 12 && temp <= 24) {
          riskScore += 25;
          riskFactors.push(`Current temperature (${temp}°C) is in the optimal range (12–24°C) for rapid Late Blight spread.`);
        }
      } else if (isModMoisture) {
        riskScore += 20;
        riskFactors.push(`Moderate relative humidity (${humidity}%) supports gradual spore survival.`);
        if (temp >= 12 && temp <= 24) riskScore += 15;
      } else {
        riskFactors.push(`Dry ambient weather (${humidity}% humidity, ${rainProb}% rain) inhibits Late Blight spore germination.`);
      }
    } else if (diseaseLower.includes('early')) {
      // Early Blight (Alternaria solani) prefers warm (24-32°C) & humid conditions
      if (isHighMoisture) {
        riskScore += 35;
        riskFactors.push(`High humidity (${humidity}%) and precipitation (${rainProb}%) accelerate Early Blight lesion expansion.`);
        if (temp >= 24 && temp <= 32) {
          riskScore += 30;
          riskFactors.push(`Warm temperature (${temp}°C) provides ideal thermal conditions for Alternaria conidia germination.`);
        }
      } else if (isModMoisture) {
        riskScore += 20;
        riskFactors.push(`Moderate humidity (${humidity}%) allows slow lesion progress.`);
        if (temp >= 24 && temp <= 32) riskScore += 15;
      } else {
        riskFactors.push(`Dry weather (${humidity}% humidity, ${rainProb}% rain) suppresses Early Blight spore germination.`);
      }
    }
  } 
  // Bacterial Disease Environmental Assessment (Bacterial Spot)
  else if (diseaseLower.includes('bacterial') || diseaseLower.includes('spot')) {
    if (isHighMoisture) {
      riskScore += 40;
      riskFactors.push(`High humidity (${humidity}%) and rainfall splash (${rainProb}%) facilitate Xanthomonas bacterial spread between plants.`);
      if (temp >= 25 && temp <= 35) {
        riskScore += 25;
        riskFactors.push(`Warm ambient temperature (${temp}°C) accelerates bacterial multiplication.`);
      }
    } else if (isModMoisture) {
      riskScore += 20;
      riskFactors.push(`Moderate moisture (${humidity}%) permits localized bacterial activity.`);
    } else {
      riskFactors.push(`Low moisture (${humidity}% humidity) limits bacterial cell dissemination.`);
    }
  } 
  // Healthy Leaf - Environmental Disease Hazard Prediction
  else {
    if (humidity > 85 && temp >= 18 && temp <= 30) {
      riskScore += 45;
      riskFactors.push(`No active disease symptoms observed, but extreme humidity (${humidity}%) poses elevated risk for fungal outbreak.`);
    } else if (rainProb > 60) {
      riskScore += 30;
      riskFactors.push(`Forecasted heavy rain (${rainProb}%) increases risk of leaf wetness and soil splash.`);
    } else {
      riskFactors.push(`Favorable weather (${humidity}% humidity) maintains low disease pressure.`);
    }
  }

  // Bound risk score between 10 and 98
  riskScore = Math.min(Math.max(riskScore, 10), 98);

  let environmentalRiskLevel = 'Low';
  if (riskScore >= 70) {
    environmentalRiskLevel = 'High';
  } else if (riskScore >= 45) {
    environmentalRiskLevel = 'Moderate';
  }

  let environmentalAdvice = '';
  if (environmentalRiskLevel === 'High') {
    environmentalAdvice = 'High environmental disease risk detected due to wet and humid weather. Avoid overhead sprinkler irrigation, inspect crops daily, and maintain proper canopy ventilation.';
  } else if (environmentalRiskLevel === 'Moderate') {
    environmentalAdvice = 'Moderate environmental disease risk. Monitor lower leaves during early morning hours and ensure field drainage is clear.';
  } else {
    environmentalAdvice = 'Low environmental disease risk under current weather conditions. Continue standard agronomic practices and regular monitoring.';
  }

  return {
    environmentalRiskLevel,
    riskScore,
    riskFactors,
    environmentalAdvice,
    weatherContext: {
      temperature: temp,
      humidity: humidity,
      rainProbability: rainProb,
      condition: condition
    }
  };
}

module.exports = {
  assessEnvironmentalRisk
};

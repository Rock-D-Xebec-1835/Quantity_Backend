const units = require("../data/units");

function findUnit(type, symbol) {

  if (!units[type]) {
    throw new Error(`Invalid type: ${type}`);
  }

  return units[type].find(
    (u) => u.symbol.toLowerCase() === symbol.toLowerCase()
  );
}

function convert(type, value, from, to) {

  value = Number(value);

  if (isNaN(value)) {
    throw new Error("Invalid numeric value");
  }

  // Temperature conversion
  if (type === "TEMPERATURE") {
    return convertTemperature(value, from, to);
  }

  const fromUnit = findUnit(type, from);
  const toUnit = findUnit(type, to);

  if (!fromUnit) {
    throw new Error(`Invalid from unit: ${from}`);
  }

  if (!toUnit) {
    throw new Error(`Invalid to unit: ${to}`);
  }

  if (typeof fromUnit.factor !== "number") {
    throw new Error(`Missing factor for ${from}`);
  }

  if (typeof toUnit.factor !== "number") {
    throw new Error(`Missing factor for ${to}`);
  }

  const baseValue = value * fromUnit.factor;

  return baseValue / toUnit.factor;
}

function convertTemperature(value, from, to) {

  let celsius;

  switch (from) {
    case "C":
      celsius = value;
      break;

    case "F":
      celsius = (value - 32) * 5 / 9;
      break;

    case "K":
      celsius = value - 273.15;
      break;

    default:
      throw new Error("Invalid temperature unit");
  }

  switch (to) {
    case "C":
      return celsius;

    case "F":
      return celsius * 9 / 5 + 32;

    case "K":
      return celsius + 273.15;

    default:
      throw new Error("Invalid temperature unit");
  }
}

module.exports = {
  convert
};
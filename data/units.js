const units = {

  LENGTH: [
    { id: 1, label: "Millimeter", symbol: "mm", factor: 0.001 },
    { id: 2, label: "Centimeter", symbol: "cm", factor: 0.01 },
    { id: 3, label: "Meter", symbol: "m", factor: 1 },
    { id: 4, label: "Kilometer", symbol: "km", factor: 1000 },

    { id: 5, label: "Inch", symbol: "in", factor: 0.0254 },
    { id: 6, label: "Foot", symbol: "ft", factor: 0.3048 },
    { id: 7, label: "Yard", symbol: "yard", factor: 0.9144 },
    { id: 8, label: "Mile", symbol: "mile", factor: 1609.34 },

    { id: 9, label: "Nautical Mile", symbol: "nmi", factor: 1852 }
  ],

  WEIGHT: [
    { id: 1, label: "Milligram", symbol: "mg", factor: 0.001 },
    { id: 2, label: "Gram", symbol: "g", factor: 1 },
    { id: 3, label: "Kilogram", symbol: "kg", factor: 1000 },
    { id: 4, label: "Metric Ton", symbol: "t", factor: 1000000 },

    { id: 5, label: "Ounce", symbol: "oz", factor: 28.3495 },
    { id: 6, label: "Pound", symbol: "lb", factor: 453.592 },
    { id: 7, label: "Stone", symbol: "st", factor: 6350.29 }
  ],

  VOLUME: [
    { id: 1, label: "Milliliter", symbol: "mL", factor: 0.001 },
    { id: 2, label: "Liter", symbol: "L", factor: 1 },
    { id: 3, label: "Cubic Meter", symbol: "m3", factor: 1000 },

    { id: 4, label: "Teaspoon", symbol: "tsp", factor: 0.00492892 },
    { id: 5, label: "Tablespoon", symbol: "tbsp", factor: 0.0147868 },
    { id: 6, label: "Cup", symbol: "cup", factor: 0.236588 },

    { id: 7, label: "Pint", symbol: "pt", factor: 0.473176 },
    { id: 8, label: "Quart", symbol: "qt", factor: 0.946353 },
    { id: 9, label: "Gallon", symbol: "gal", factor: 3.78541 }
  ],

  TEMPERATURE: [
    { id: 1, label: "Celsius", symbol: "C" },
    { id: 2, label: "Fahrenheit", symbol: "F" },
    { id: 3, label: "Kelvin", symbol: "K" }
  ]

};

module.exports = units;
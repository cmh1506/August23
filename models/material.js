const mongoose = require('mongoose');

const { Schema } = mongoose;

const material = new Schema(
  {
    "name": { type: String},
    "bioco2verbrennung": { type: Number},
    "bioco2prod": { type: Number},
    "biofuelco2": { type: Number},
    "co2Deponie": { type: Number},
    "co2recycling": { type: Number},
    "co2verbrennung": { type: Number},
    "dichte": { type: Number},
    "energieRecycling": { type: Number},
    "heizenergie": { type: Number},
    "productionCO2": { type: Number},
    "prozessenergie": { type: Number},
    "recyclat2tesMal": { type: Boolean},
    "recyclierbar": { type: Boolean},
    "recycliert": { type: Boolean},
    "recyclingverfahren": { type: String},
    "rRateHerstellung": { type: Number},
    "a-wert pef": { type: Number},
    "Erdgas": { type: Number},
    "Erdöl": { type: Number},
    "fossiles": { type: Number},
    "Gutschrift CO2": { type: Number},
    "Heizenergie Lower H V": { type: Number},
    "Kohle": { type: Number},
    "Kühlwasser/g": { type: Number},
    "Prozess Strom": { type: Number},
    "Prozesswärme": { type: Number},
    "Prozesswasser": { type: Number},
    "R2 WErt": { type: Number},
    "Wasser": { type: Number},
    "Water Consumption": { type: Number},
    "wd_barriere": { type: Number},
    "r_rate PEF": { type: Number},
    "qualitätsparameter": { type: Number}
  }
)

module.exports = mongoose.model('Material', material)
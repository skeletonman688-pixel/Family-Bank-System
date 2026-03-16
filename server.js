const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Data file
const dataFile = path.join(__dirname, 'gameData.json');

// Initialize data if not exists
if (!fs.existsSync(dataFile)) {
  const initialData = {
    users: [
      {name:"Komilov Ahrorbek", credit:0, bank:0, creditTimer:600, bankTimer:600, bankInterestTimer:600, creditInterestTimer:600, slots:0, level:1, appliedLevels:[1], achievements:{first100:false, thousand:false, paidTax5:false}, upgrades:{fastBank:false, creditShield:false}, fastBankTimer:0, levelEffects:{bankInterestPct:0, creditInterestPct:0, taxDiscountPct:0, randomBonus:0, bankTimerSpeed:1, specialBonus:0}, businesses:{lemonade:0,cafe:0,hotel:0}, investCount:0, casinoWins:0, jailUntil:0, missionsCompleted:[], history:[], creditHistory:[], propertyCount:0, taxPaidCount:0, taxStatus:'❌ To\'lanmadi', taxTimer:1800, blacklisted:false, badges:[], totalInvested:0, lotteryWins:0, lotteryTickets:0},
      {name:"Komilova Mubina", credit:0, bank:0, creditTimer:600, bankTimer:600, bankInterestTimer:600, creditInterestTimer:600, slots:0, level:1, appliedLevels:[1], achievements:{first100:false, thousand:false, paidTax5:false}, upgrades:{fastBank:false, creditShield:false}, fastBankTimer:0, levelEffects:{bankInterestPct:0, creditInterestPct:0, taxDiscountPct:0, randomBonus:0, bankTimerSpeed:1, specialBonus:0}, businesses:{lemonade:0,cafe:0,hotel:0}, investCount:0, casinoWins:0, jailUntil:0, missionsCompleted:[], history:[], creditHistory:[], propertyCount:0, taxPaidCount:0, taxStatus:'❌ To\'lanmadi', taxTimer:1800, blacklisted:false, badges:[], totalInvested:0, lotteryWins:0, lotteryTickets:0},
      {name:"Komilov Abrorbek", credit:0, bank:0, creditTimer:600, bankTimer:600, bankInterestTimer:600, creditInterestTimer:600, slots:0, level:1, appliedLevels:[1], achievements:{first100:false, thousand:false, paidTax5:false}, upgrades:{fastBank:false, creditShield:false}, fastBankTimer:0, levelEffects:{bankInterestPct:0, creditInterestPct:0, taxDiscountPct:0, randomBonus:0, bankTimerSpeed:1, specialBonus:0}, businesses:{lemonade:0,cafe:0,hotel:0}, investCount:0, casinoWins:0, jailUntil:0, missionsCompleted:[], history:[], creditHistory:[], propertyCount:0, taxPaidCount:0, taxStatus:'❌ To\'lanmadi', taxTimer:1800, blacklisted:false, badges:[], totalInvested:0, lotteryWins:0, lotteryTickets:0}
    ],
    lastUpdate: Date.now(),
    inflationRate: 1.0
  };
  fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
}

// Load data
function loadData() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading data:', err);
    return null;
  }
}

// Save data
function saveData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

// API endpoints
app.get('/api/data', (req, res) => {
  const data = loadData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  saveData(newData);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
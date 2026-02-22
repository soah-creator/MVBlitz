const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/verses', require('./server/routes/verses'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MemBlitz running on http://localhost:${PORT}`);
});

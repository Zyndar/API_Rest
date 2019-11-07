const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://merk:${process.env.MONGO_ATLAS_PW}@rest-api-iewsq.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) console.log(`Error connecting to database. ${err}`);
  else app.listen(port, console.log(`API started on: http://localhost:${port}`));
});

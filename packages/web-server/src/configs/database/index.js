// Using Node.js `require()`
const mongoose = require('mongoose');


const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@general.8kjnd81.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connect Successfully!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };

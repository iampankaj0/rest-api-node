const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes")

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/api", routes)

require("dotenv").config()
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

// mongoose.connect(
//   "mongodb+srv://pankajyadav:PankajYadav@login-register.gwki0eg.mongodb.net/register_login",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("DB Connected");
//   }
// );



// app starting on port defines here
app.listen(3001, () => {
  console.log(`Server Started At PORT ${3001}`);
});

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const DB_URI =
  "mongodb+srv://cooluser:coolpassword@cluster0.pjcny.gcp.mongodb.net/ninja?retryWrites=true&w=majority";

/*
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.info("MONGODB OPERATIVO");
});
*/

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info("HUMONGOUS IN DA HOUSE!"))
  .catch((e) => console.error("*** Error connecting to MongoDB... ***", e));

const app = express();
app.use(cors());

const { printSchema } = require("graphql");

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("***STATUS PUERTO 4000: OKAY***");
});

// *----------------------------------------------------------------=> NO TOCAR!
console.log("\n");
console.log(printSchema(schema));

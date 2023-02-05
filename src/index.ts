import express from "express";
import { routes } from "./routes";
import { createConsumer } from "./services/consumer";
import { OrderQueue } from "./services/OrderQueue";
import sequelizeConnection from "./db/config";

const app = express();

queueBuild().then(() => {
  createConsumer();
});

app.use(express.json());
app.use("/api", routes);

const port = 3000;

sequelizeConnection.sync().then(() => {
  app.listen(port, () => {
    console.log(`application is running on port ${port}.`);
  });
});

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const results = await sequelizeConnection.query(
    "SELECT * FROM Orders as o join OrderLines ol on o.retailer_id = ol.variant_id"
  );

  console.log(results);

  // Assuming `fields` contains the data you wish to use in your template
  res.render("index.pug", { results });
});

async function queueBuild() {
  await OrderQueue.Instance.build();
}

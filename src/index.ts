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

async function queueBuild() {
  await OrderQueue.Instance.build();
}

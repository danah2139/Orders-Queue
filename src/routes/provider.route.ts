import { Router, Request, Response } from "express";
import { OrderQueue } from "../services/OrderQueue";
import { IOrderData } from "../types/order";

export const providerRoute = Router();

providerRoute.post("/receive-order", async (req: Request, res: Response) => {
  /**
   * This code defines a POST endpoint /receive-order using the providerRoute module.
   * The endpoint then extracts the order data from the request body and stores it in the orderData variable,
   * which is typed as IOrderData. The OrderQueue singleton instance is then used to send the order data by calling sendData(orderData).
   * Finally, a message indicating that the message has been sent to the queue is logged and a response of "Message Sent" is sent back to the client.
   *
   * @param {Request} req - The incoming HTTP request.
   * @param {Response} res - The response that will be sent back to the client.
   * @return {void}
   */
  const orderData: IOrderData = req.body;
  OrderQueue.Instance.sendData(orderData);

  console.log("A message is sent to queue");
  return res.send("Message Sent");
});

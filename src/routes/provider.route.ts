import {Router ,Request,Response} from 'express';
import {OrderQueue} from '../services/OrderQueue'
import {IOrderData} from '../types/order'

export const providerRoute = Router();

providerRoute.post("/receive-order", async(req:Request, res:Response) => {
    const orderData:IOrderData = req.body;    

    // const orderQueue = await OrderQueue.build();
    OrderQueue.Instance.sendData(orderData);

    console.log("A message is sent to queue")
    return res.send("Message Sent");
    
});

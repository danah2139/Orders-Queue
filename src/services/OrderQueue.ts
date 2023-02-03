import client, {Connection,Channel,ConsumeMessage} from 'amqplib'
import {EventEmitterService} from './eventEmitter'
import {IOrderData} from '../types/order'


export class OrderQueue
{
    static channel:Channel;
    static connection: Connection;
    private static _instance: OrderQueue;

    private constructor(){
    }

    public async build(): Promise<any> {
        try {
            OrderQueue.connection= await client.connect("amqp://localhost");
            OrderQueue.channel= await OrderQueue.connection.createChannel();
            
            // connect to 'test-queue', create one if doesnot exist already
            await OrderQueue.channel.assertQueue("test-queue");
            
        } catch (error) {
            console.log(`build error ${error}`)
        }
        // return new OrderQueue();
    }

    public async sendData(data:IOrderData){
        // send data to queue
        
        OrderQueue.channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
        console.log(`push data to queue ${data}`);
        
        // // close the channel and connection
        // await OrderQueue.channel.close();
        // await OrderQueue.connection.close();
    }

    public receivedData(){
        OrderQueue.channel?.consume('test-queue',(msg:ConsumeMessage|null)=>{
            if(msg){
                // console.log(`get from provider ${msg.content.toString()}`);
                OrderQueue.channel.ack(msg);
                // msg.content.toString();
                EventEmitterService.Instance.getEventBroker().emit('on-msg',msg.content.toString());
            }
        });
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}


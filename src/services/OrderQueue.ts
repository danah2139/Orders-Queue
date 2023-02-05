import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import { EventEmitterService } from "./eventEmitter";
import { IOrderData } from "../types/order";

/**
 * Class to handle the order queue
 *
 * @class OrderQueue
 */
export class OrderQueue {
  /**
   * AMQP channel used to send and receive messages from the queue
   *
   * @static
   * @type {Channel}
   */
  static channel: Channel;

  /**
   * AMQP connection to the queue
   *
   * @static
   * @type {Connection}
   */
  static connection: Connection;

  /**
   * Singleton instance of `OrderQueue`
   *
   * @private
   * @static
   * @type {OrderQueue}
   */
  private static _instance: OrderQueue;

  /**
   * Private constructor to prevent creating multiple instances
   *
   * @private
   */
  private constructor() {}

  /**
   * Method to build the order queue and connect to the `test-queue`
   *
   * @returns {Promise<any>}
   */
  public async build(): Promise<any> {
    try {
      OrderQueue.connection = await client.connect("amqp://localhost");
      OrderQueue.channel = await OrderQueue.connection.createChannel();

      // connect to 'test-queue', create one if doesnot exist already
      await OrderQueue.channel.assertQueue("test-queue");
    } catch (error) {
      console.log(`build error ${error}`);
    }
  }

  /**
   * Method to send data to the queue
   *
   * @param {IOrderData} data
   */
  public async sendData(data: IOrderData) {
    // send data to queue
    OrderQueue.channel.sendToQueue(
      "test-queue",
      Buffer.from(JSON.stringify(data))
    );
    console.log(`push data to queue ${data}`);

    // // close the channel and connection
    // await OrderQueue.channel.close();
    // await OrderQueue.connection.close();
  }

  /**
   * Method to receive data from the queue
   */
  public receivedData() {
    OrderQueue.channel?.consume("test-queue", (msg: ConsumeMessage | null) => {
      if (msg) {
        OrderQueue.channel.ack(msg);
        EventEmitterService.Instance.getEventBroker().emit(
          "on-msg",
          msg.content.toString()
        );
      }
    });
  }

  /**
   * Singleton instance getter for `OrderQueue`
   *
   * @returns {OrderQueue}
   */
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

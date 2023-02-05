import { EventEmitter } from "events";

/**
 * EventEmitterService - a singleton class that provides an event broker.
 *
 * @class
 */
export class EventEmitterService {
  private static _instance: EventEmitterService;
  private static eventBroker: EventEmitter;

  /**
   * Creates an instance of EventEmitterService.
   *
   * @private
   */
  private constructor() {
    EventEmitterService.eventBroker = new EventEmitter();
  }

  /**
   * Get the EventEmitter instance
   *
   * @returns {EventEmitter} the EventEmitter instance
   *
   * @memberOf EventEmitterService
   */
  public getEventBroker() {
    return EventEmitterService.eventBroker;
  }

  /**
   * Get the EventEmitterService instance. If the instance has not been created, it will create a new one.
   *
   * @static
   * @returns {EventEmitterService} the EventEmitterService instance.
   */
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

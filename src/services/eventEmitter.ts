import { EventEmitter } from 'events'

export class EventEmitterService{

    private static _instance: EventEmitterService;
    private static eventBroker: EventEmitter;

    private constructor(){
        EventEmitterService.eventBroker = new EventEmitter();
    }

    public getEventBroker()
    {
        return EventEmitterService.eventBroker;
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}
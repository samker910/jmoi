import { EventEmitter} from 'eventemitter3';

export class ServerSideEventService<T> {
    private static EVENT_ID_COUNTER = 0;

    private _emitter = new EventEmitter();

    public static getEventId(): number {
        return ++ServerSideEventService.EVENT_ID_COUNTER;
    }

    public subscribe(eventId: number, onEvent: (data:T) => void): void {
        this._emitter.on(this.getEventName(eventId), onEvent);
    }

    public publish(eventId: number, eventData: T): void {
        // Emit events here recieved from Github/Twitter APIs
        this._emitter.emit(this.getEventName(eventId), eventData);
    }

    public unsubscribe(eventId: number): void {
        this._emitter.off(this.getEventName(eventId));
    }

    private getEventName(eventId: number): string {
        return `event_${eventId}`;
    }
};

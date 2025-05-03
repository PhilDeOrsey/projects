type EventCallback = (e: any) => void;
/** Base class for event management. */
export declare class EventTarget {
    private events;
    /** Adds an event listener for one or more events. */
    on(events: string, fn: EventCallback): void;
    /** Adds a one-time event listener to one or more events. */
    one(events: string, fn: EventCallback): void;
    /** Removes an event listener from one or more events. */
    off(events: string, fn: EventCallback): void;
    /** Triggers one or more events, and executes all bound event listeners. */
    trigger(events: string, arg?: unknown): void;
}
export {};

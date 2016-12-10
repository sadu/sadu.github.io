export class EventChain {
    constructor() {
        this.queue = {};
    }

    on(eventName, callback) {
        if (!this.queue[eventName]) {
            this.queue[eventName] = new Set();
        }
        this.queue[eventName].add(callback);
    }

    off(eventName, callback) {
        callback &&
        this.queue[eventName].delete(callback);
    }

    fire(eventName, data, endCallback = false) {
        var preventBubbles = false;
        if (this.queue[eventName]) {
            this.queue[eventName].forEach(callback => {
                if (!preventBubbles) {
                    preventBubbles = callback(data);
                }
            });
        }
        endCallback && endCallback(data);
    }
}
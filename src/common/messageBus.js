const eventTarget = new EventTarget();

export default {
  on: (type, callback) => {
    // Check if alt:V is available, otherwise use EventTarget.
    if ("alt" in window) {
      alt.on(type, (...args) => {
        console.debug(`Received alt:V message ${type}`, args);
        callback(...args);
      });
    } else {
      const internalCallback = (message) => {
        console.debug(`Received EventTarget message ${type}`, message.payload);
        callback(message.payload);
      };

      eventTarget.addEventListener(type, internalCallback);
    }
  },

  emit: (type, ...payload) => {
    if ("alt" in window) {
      console.debug(`Send alt:V message ${type}`, payload);
      alt.emit(type, ...payload);
    } else {
      console.debug(`Send EventTarget message ${type}`, payload);
      eventTarget.dispatchEvent(new Event(type, {payload}));
    }
  }
}

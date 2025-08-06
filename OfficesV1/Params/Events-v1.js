
(function() {
      const REQUIRED_EVENTS = [
      "new_plan",
      "cancel_checkout_new"      
    ];

  let receivedEvents = new Set();
  let readyTimer = null;

  function checkAllReady() {
    if (REQUIRED_EVENTS.every(event => receivedEvents.has(event))) {
      clearTimeout(readyTimer);
      readyTimer = setTimeout(() => {
        console.log("⏰🐝");
        document.dispatchEvent(new Event("get-creatifornia"));
        resetCoordinator();
      }, 300);
    }
  }

  function resetCoordinator() {
    receivedEvents.clear();
  }

  REQUIRED_EVENTS.forEach(eventName => {
    document.addEventListener(eventName, () => {
      if (!receivedEvents.has(eventName)) {
        receivedEvents.add(eventName);
        checkAllReady();
      }
    });
  });
})();
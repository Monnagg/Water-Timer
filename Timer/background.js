chrome.alarms.create("waterTimer", {
  periodInMinutes: 1 / 90,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "waterTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 90 * res.timeOption) {
          this.registration.showNotification("Water Timer", {
            body: `${res.timeOption} minutes has passed!`,
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 90,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

const timeOption = document.getElementById("time-option");
timeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val >= 90) {
    timeOption.value = 90;
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
});

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
});

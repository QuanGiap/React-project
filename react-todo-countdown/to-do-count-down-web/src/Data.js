const data = {
  //this data will change when fetch api
  tasks: {
    task1: {
      desciption: "Testing 1 of this really long note i just figure it out",
      isTimer: true,
      hours: 0,
      minutes: 0,
      seconds: 5,
      hoursRemain: 0,
      minutesRemain: 0,
      secondsRemain: 5,
    },
    task2: {
      desciption: "Testing 2 of this really long note i just figure it out",
      isTimer: true,
      hours: 0,
      minutes: 0,
      seconds: 5,
      hoursRemain: 0,
      minutesRemain: 0,
      secondsRemain: 5,
    },
    task3: {
      desciption: "Testing 3 of this really long note i just figure it out",
      isTimer: true,
      hours: 0,
      minutes: 2,
      seconds: 10,
      hoursRemain: 0,
      minutesRemain: 2,
      secondsRemain: 10,
    },
    task4: {
      desciption: "Testing 4 of this really long note i just figure it out ",
      isTimer: true,
      hours: 0,
      minutes: 2,
      seconds: 10,
      hoursRemain: 0,
      minutesRemain: 2,
      secondsRemain: 10,
    },
    task5: {
      desciption: "Testing 5 of this really long note i just figure it out ",
      isTimer: true,
      hours: 0,
      minutes: 2,
      seconds: 10,
      hoursRemain: 0,
      minutesRemain: 2,
      secondsRemain: 10,
    },
  },
  //this data will change when fetch api
  columns: {
    monday: { tasksToDo: ["task1"] },
    tuesday: { tasksToDo: ["task2"] },
    wednesday: { tasksToDo: ["task3"] },
    thursday: { tasksToDo: ["task4"] },
    friday: {
      tasksToDo: ["task5"],
    },
    satuday: { tasksToDo: [] },
    sunday: { tasksToDo: [] },
    // daily:  {tasksToDo: []},
    store: { tasksToDo: [] },
  },
  columnsId: [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "satuday",
    // "daily",
    "store",
  ],
};
export default data;

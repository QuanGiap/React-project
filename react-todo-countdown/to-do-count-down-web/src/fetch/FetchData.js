import axios from "axios";

function config() {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
  };
}

function body_refreshToken() {
  return {
    token: localStorage.getItem("refreshToken"),
  };
}

export function generateNewToken() {
  console.log("getting new token");
  return axios.post(
    "https://infinite-tor-24931.herokuapp.com/account/token",
    body_refreshToken()
  );
}

export function logout() {
  return axios.delete(
    "https://infinite-tor-24931.herokuapp.com/account/token",
    {
      data: body_refreshToken(),
    }
  );
}

export function login(account, pass) {
  return axios.post("https://infinite-tor-24931.herokuapp.com/account/login", {
    name: account,
    pass: pass,
  });
}

export function signUp(account, pass) {
  return axios.post("https://infinite-tor-24931.herokuapp.com/account/signUp", {
    name: account,
    pass: pass,
  });
}

export function getDataTask() {
  return axios.post(
    "https://shielded-mountain-53050.herokuapp.com/tasks/getTasks",
    null,
    config()
  );
}
export function updateAllTaskUser(newData) {
  return axios.patch(
    "https://shielded-mountain-53050.herokuapp.com/tasks/updateAll",
    {
      tasks: newData.tasks,
      columns: newData.columns,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}
export function updateTask(newData) {
  return axios.patch(
    "https://shielded-mountain-53050.herokuapp.com/tasks/update",
    {
      hoursRemain: newData.hoursRemain,
      minutesRemain: newData.minutesRemain,
      secondsRemain: newData.secondsRemain,
      nameTask: newData.taskId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
}

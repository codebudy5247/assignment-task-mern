import * as axios from "axios";

const apiURL = "https://dataneuron-ivory.vercel.app/api";

interface ResponseData {
  data: any;
  status: any;
}

//Server Response
function normalizeServerResponse(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}

//Error Response
function normalizeServerError(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.response.data.message,
    status: serverResponse.status,
  };

  return response;
}

export async function addTask(name: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/task/add`,
      data: {
        name: name,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function updateTask(taskID: string, name: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/task/update`,
      data: {
        taskID: taskID,
        name: name,
      },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function getTask() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/task/get`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

export async function getCount() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/count`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

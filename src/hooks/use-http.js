import { useCallback } from "react";
import { environment as env } from "../environment";

const useHttp = () => {
  const url = env.serverUrl;

  //changes is rquired

  const sendGetRequest = useCallback(async (requestConfigObj, applyData) => {
    const searchParams = new URLSearchParams(requestConfigObj.obj);
    const response = await fetch(
      `${url}${requestConfigObj.url}?${searchParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    applyData(data);
  }, []);

  const sendPostRequest = useCallback(async (requestConfigObj, applyData) => {
    const response = await fetch(`${url}${requestConfigObj.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestConfigObj.obj),
    });
    const data = await response.json();
    applyData(data);
  }, []);

  return {
    sendPostRequest,
    sendGetRequest,
  };
};

export default useHttp;

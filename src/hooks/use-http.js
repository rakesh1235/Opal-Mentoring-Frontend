import { useCallback } from "react";

const useHttp = () => {

  const url = "http://localhost:3080";

  //changes is rquired
  // const sendGetRequest = useCallback(async (requestConfigObj, applyData) => {
  //     const response = await fetch(`${url}${requestConfigObj.url}`, {
  //       params: requestConfigObj.obj,
  //     });

  //     const data = await response.json();
  //     applyData(data);
  // }, []);

  const sendPostRequest = useCallback(async (requestConfigObj, applyData) => {

    const response = await fetch(`${url}${requestConfigObj.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(requestConfigObj.obj),
    });
    const data = await response.json();
    applyData(data);
  }, []);

  return {
    sendPostRequest,
  };
};

export default useHttp;
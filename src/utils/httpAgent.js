function httpAgent(method, url, option) {
  const init = {
    method,
    url,
    headers: option["headers"],
    body: option["body"],
    mode: "cors",
    credentials: "include",
  };

  return fetch(url, init);
}

export default httpAgent;

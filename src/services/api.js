import axios from "axios";

const endpoint = (perPage) => {
  return `https://www.balldontlie.io/api/v1/players?per_page=${perPage}`;
};

const fetchData = (ep) =>
  axios
    .get(ep, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

export { endpoint, fetchData };

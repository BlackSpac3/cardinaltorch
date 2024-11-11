"use server";
import axios from "axios";

const filterPaginationData = async ({
  create_new_arr = true,
  state,
  data,
  page,
  countRoute,
  data_to_send = {},
}) => {
  const url = process.env.NEXTAUTH_URL;
  let obj;
  if (state != null && !create_new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    await axios
      .post(`${url}${countRoute}`, data_to_send)
      .then(({ data: { totalDocs } }) => {
        obj = { results: data, page: page, totalDocs };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return obj;
};

export default filterPaginationData;

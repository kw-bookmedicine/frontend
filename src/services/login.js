import axios from "axios";

export const login = async (username, password) => {
  const result = await axios.post(
    "https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/login",
    { username, password }, // 키와 값이 같아서 생략함
    { withCredentials: true }
  );
  console.log("result", result);
  return result;
};

import { create } from "zustand";

const useSignupStore = create((set) => ({
  // 회원정보 정의
  userInfo: {
    username: "",
    password: "",
    name: "",
    nickname: "",
    birth: "",
    gender: "",
    email: "",
    occupation: "",
  },
  // 회원정보 업데이트
  setUserInfo: (newUserInfo) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        ...newUserInfo,
      },
    })),
}));

export default useSignupStore;

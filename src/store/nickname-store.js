import { create } from "zustand";
import api from "../services/api";

const useNicknameStore = create((set) => ({
  nickname: "",
  setNickname: (newNickname) => set({ nickname: newNickname }),
  fetchNickname: async () => {
    try {
      const res = await api.get("/client/main", { withCredentials: true });
      const { nickname } = res.data;
      set({ nickname });
    } catch (error) {
      console.error("유저 닉네임 요청 실패", error);
    }
  },
}));

export default useNicknameStore;

import { create } from "zustand";

type State = {
  userImage: string;
  setImage: (imageUrl: string) => void;
}

export const useUserImage = create<State>((set) => {
  return {
    userImage: "",

    setImage: (imageUrl: string) => {
      set({ userImage: imageUrl })
    }
  }
});

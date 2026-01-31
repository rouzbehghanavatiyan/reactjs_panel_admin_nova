import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  showToast: {
    show: boolean;
    title: string;
    bg: "success" | "danger" | "warning";
  };
  showLoading: any;
}

const initialState: MainState = {
  showToast: {
    show: false,
    title: "",
    bg: "success",
  },
  showLoading: { btnName: "", value: false },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetShowToast(
      state,
      action: PayloadAction<{
        show: boolean;
        title?: string;
        bg?: "success" | "danger" | "warning";
      }>
    ) {
      state.showToast = {
        show: action.payload.show,
        title: action.payload.title || "",
        bg: action.payload.bg || "success",
      };
    },
    RsetShowLoading: (state, actions) => {
      return { ...state, showLoading: actions.payload };
    },
  },
});

export const { RsetShowToast } = mainSlice.actions;
export default mainSlice.reducer;

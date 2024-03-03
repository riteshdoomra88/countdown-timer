import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { setShowSnackBar } from "./utilities";
import { postMethod, getQueryData } from "../../service/http";
import { AppDispatch } from "../store";

interface Dispatch {
  dispatch: AppDispatch;
}

export const getTimerList: any = createAsyncThunk(
  "timerSlice/getTimerList",
  async (datas: any, { dispatch, getState }) => {
    try {
      let { data } = await getQueryData(`timer`);
      dispatch(setTimerData(data?.response?.response?.results));
      return data?.response?.response
    } catch (error: any) {
      console.log("Error", error);
    }
  }
);
export const postTimer: any = createAsyncThunk(
  "timerSlice/postTimer",
  async (datas: any, { dispatch, getState }) => {
    let fd: any = getState();
    const { timerSlice } = fd;

    try {
      let { data } = await postMethod(
        `timer`,
        datas
      );
      const createdTimer = {
        timerTime: data?.data?.timer,
      };
      const updatedArray: any = [
        ...(timerSlice?.timerData || []),
        createdTimer,
      ];

      dispatch(setTimerData(updatedArray));

      dispatch(
        setShowSnackBar({
          message: `Timer has been created`,
          status: true,
          severity: "success",
        })
      );
      return data;
    } catch (error: any) {
      console.log("Error", error);
    }
  }
);

export const putTimer: any = createAsyncThunk(
  "timerSlice/postTimer",
  async (datas: any, { dispatch, getState }) => {
    let fd: any = getState();
    const { timerSlice } = fd;
    try {
      const { data } = await postMethod(
        `timer`,
        datas
      );
      const updatedTimer = {
        stopTime: datas.stopTime,
       };
       const updatedArray = timerSlice?.timerData?.map((a: any) => {
        return (a.id == datas.id) ? { ...a, ...updatedTimer } : a
      });
      dispatch(setTimerData(updatedArray));
      dispatch(
        setShowSnackBar({
          message: `Timer has been updated`,
          status: true,
          severity: "success",
        })
      );
      return data;
    } catch (error: any) {
      console.log("Error", error);
    }
  }
);

interface InitialState {
  timerData: any;
  timerList: any;
  selectedTimer: any;
  editHandler: boolean;
}
const initialState: InitialState = {
  timerData: null,
  timerList: [],
  selectedTimer: [],
  editHandler: false,
};

export const timerSlice = createSlice({
  name: "timerSlice",
  initialState,
  reducers: {
    setTimerData: (state: any, action: any) => {
      state.timerData = action.payload;
    },
    setTimerList: (state: any, action: any) => {
      state.timerList = action.payload;
    },
    setEditHandler: (state: any, action: PayloadAction<any>) => {
      state.editHandler = action.payload;
    },
    setSelectedTimer: (state: any, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setTimerData,
  setTimerList,
  setSelectedTimer,
  setEditHandler,
} = timerSlice.actions;

export default timerSlice.reducer;

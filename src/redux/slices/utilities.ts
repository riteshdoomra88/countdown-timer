import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarProps {
  message?: string;
  status: boolean;
  varient?: string;
  severity?: "error" | "info" | "success" | "warning";
}

interface InitialState {
  popUp: boolean;
  activeTab: boolean;
  activeHeader: boolean;
  isAccountFlowOpen: boolean;
  showHideSnackBar: SnackbarProps;
  filterHeight:string;
  cookieOpen:boolean;
  displayCookie:boolean;
  schoolDataNumber:any,
  isFooter: boolean,
  show:boolean,

}
const initialState: InitialState = {
  popUp: false,
  isAccountFlowOpen: false,
  activeTab: false,
  activeHeader: false,
  showHideSnackBar: {
    message: "",
    status: false,
    varient: 'filled',
    severity: 'success'
  },
  filterHeight:"",
  cookieOpen:false,
  displayCookie:false,
  schoolDataNumber:"",
  isFooter: true,
  show:false,

};

export const utilities = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    setShowSnackBar: (state: InitialState, action: PayloadAction<SnackbarProps>) => {
      state.showHideSnackBar = action.payload;
    },
    setActiveTab: (state: InitialState, action: PayloadAction<boolean>) => {
      state.activeTab = action.payload;
    },
    setActiveHeader: (state: InitialState, action: PayloadAction<boolean>) => {
      state.activeHeader = action.payload;
    },
    setIsFooter:(state, action)=>{
      state.isFooter = action.payload
    },
    setShows:(state: InitialState,action: PayloadAction<boolean>)=>{
      state.show = action.payload
    },
        
  },
});

// Reducers and actions
export const { setShowSnackBar, setActiveTab, setActiveHeader, setIsFooter,setShows } = utilities.actions;

export default utilities.reducer;

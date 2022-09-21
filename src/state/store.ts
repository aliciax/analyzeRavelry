import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ravelryDataReducer from "./dataReducer"

export const store = configureStore({
    reducer: {
      ravelryData: ravelryDataReducer,
    }
  })

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
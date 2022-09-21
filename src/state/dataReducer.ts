import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PatternFull, PatternList } from "../models/models";
import { PatternSearchByIdResult, PatternSearchResult } from "../models/returnObjects";
import { getMostPopularSweaters, getPatternsById } from "../services/ravelryApi";
import { dataReducerState } from "./reducerStates";

const initialState: dataReducerState = {
    popularSweaters: [],
    recentSweaters: []
}
    
const ravelryData = createSlice({
    name: "ravelryData",
    initialState: initialState,
    reducers:{
        updatePopularSweaters(state,action){
            return {...state, popularSweaters: action.payload};
        }
    }
})

export const fetchPopularSweaters = createAsyncThunk("patterns/search.json?query=sweater&sort=popularity", async (props, thunkApi)=>{
    const popularSweaters:PatternSearchResult = await getMostPopularSweaters();
    const ids = popularSweaters.patterns.map((x: PatternList) =>  x.id)
    const fullSweaterData: PatternSearchByIdResult = await getPatternsById(ids);
    thunkApi.dispatch(updatePopularSweaters(fullSweaterData.patterns))
    return fullSweaterData;
})

export const {updatePopularSweaters} = ravelryData.actions
export default ravelryData.reducer

export const selectPopularSweaters = (state: { ravelryData: dataReducerState; }) => state.ravelryData.popularSweaters;


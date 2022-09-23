import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PatternFull, PatternList } from "../models/models";
import { PatternSearchByIdResult, PatternSearchResult } from "../models/returnObjects";
import { getCurrentlyPopularSweaters, getMostPopularSweaters, getPatternsById } from "../services/ravelryApi";
import { patternToArray } from "../utils/formatingData";
import { dataReducerState } from "./reducerStates";

const initialState: dataReducerState = {
    popularSweaters: [],
    curPopularSweaters: []
}

const ravelryData = createSlice({
    name: "ravelryData",
    initialState: initialState,
    reducers: {
        updatePopularSweaters(state, action) {
            return { ...state, popularSweaters: action.payload };
        },
        updateCurrentlyPopularSweaters(state, action) {
            return { ...state, curPopularSweaters: action.payload };
        }
    }
})

export const fetchPopularSweaters = createAsyncThunk("patterns/search.json?query=sweater&sort=popularity", async (props, thunkApi) => {
    const popularSweaters: PatternSearchResult = await getMostPopularSweaters();
    const ids = popularSweaters.patterns.map((x: PatternList) => x.id)
    const fullSweaterData: PatternSearchByIdResult = await getPatternsById(ids);
    thunkApi.dispatch(updatePopularSweaters(patternToArray(fullSweaterData.patterns)));
    return fullSweaterData;
})

export const fetchCurrentTopSweaters = createAsyncThunk("patterns/search.json?query=sweater&sort=recently-popular", async (props, thunkApi) => {
    const popularSweaters: PatternSearchResult = await getCurrentlyPopularSweaters();
    const ids = popularSweaters.patterns.map((x: PatternList) => x.id)
    const fullSweaterData: PatternSearchByIdResult = await getPatternsById(ids);
    thunkApi.dispatch(updateCurrentlyPopularSweaters(patternToArray(fullSweaterData.patterns)));
    return fullSweaterData;
})

export const { updatePopularSweaters, updateCurrentlyPopularSweaters } = ravelryData.actions
export default ravelryData.reducer

export const selectPopularSweaters = (state: { ravelryData: dataReducerState; }) => state.ravelryData.popularSweaters;
export const selectCurPopularSweaters = (state: { ravelryData: dataReducerState; }) => state.ravelryData.curPopularSweaters;


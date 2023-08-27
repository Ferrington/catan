import {proxy} from "valtio";
import {State} from "../types/types.ts";
import {generateBeginnerState} from "./setup/beginnerState.ts";


export const store = proxy<State>(generateBeginnerState());
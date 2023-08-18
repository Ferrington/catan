import {proxy} from "valtio";
import {BoardState} from "../types/types.ts";
import {generateBeginnerState} from "./setup/beginnerState.ts";


export const store = proxy<BoardState>(generateBeginnerState());
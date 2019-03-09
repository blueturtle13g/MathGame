import {
    ASK_HELP,
    SKIP_QUESTION,
    START_GAME,
    UPDATE_PROP,
    VALIDATE_GENERATE,
    SET_NEW_RECORD
} from "./types";

export const updateProp = payload=>{
    return{
        type: UPDATE_PROP,
        payload
    }
};

export const setNewRecord = ()=>{
    return{
        type: SET_NEW_RECORD
    }
};

export const validateGenerate = payload=>{
    return{
        type: VALIDATE_GENERATE,
        payload
    }
};

export const askHelp = ()=>{
    return{
        type: ASK_HELP,
    }
};

export const skipQuestion = ()=>{
    return{
        type: SKIP_QUESTION,
    }
};

export const startGame = ()=>{
    return{
        type: START_GAME
    }
};
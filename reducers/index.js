import { AsyncStorage } from 'react-native';
import {
    START_GAME,
    UPDATE_PROP,
    VALIDATE_GENERATE,
    EASY,
    SET_NEW_RECORD,
    ASK_HELP,
    SKIP_QUESTION,
    PROBLEMS_NUMBER
} from "../actions/types";
import {genProblem, shuffle} from '../utils';
const first_problem = genProblem(EASY, Math.floor(Math.random() * 2) + 1 === 1);

const INITIAL_STATE = {
    level: 'easy',
    problem: first_problem[0],
    answer: first_problem[1],
    options: first_problem[2],
    problem_score: first_problem[3],
    start_time: Date.now(),
    is_playing: false,
    nav_is_up: false,
    player: "",
    score: 0,
    correct_answers: 0,
    asked_questions: 0,
    returned: "",
    help: 5,
    keyboard_is_open: false,
    finish_time: 0
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case ASK_HELP:
            if(!state.help || !state.is_playing || state.options.length === 2) return{...state};
            let options = [state.answer];
            state.options.forEach(option=>{
                if(option !== state.answer && options.length < 2){
                    options.push(option);
                }
            });

            return {
                ...state,
                options: shuffle(options),
                help: state.help -1
            };

        case SKIP_QUESTION:
            if(!state.is_playing) return {...state};
            is_playing = true;
            asked_questions = state.asked_questions + 1;
            generated_problem = genProblem(state.level, Math.floor(Math.random() * 2) + 1 === 1);
            if(asked_questions === PROBLEMS_NUMBER) is_playing = false;
            return {
                ...state,
                problem: generated_problem[0],
                answer: generated_problem[1],
                options: generated_problem[2],
                problem_score: generated_problem[3],
                asked_questions,
                is_playing
            };

        case VALIDATE_GENERATE:
            let is_playing = true;
            let asked_questions = state.asked_questions + 1;
            let generated_problem = genProblem(state.level, Math.floor(Math.random() * 2) + 1 === 1);
            let score = state.score;
            if(action.payload === state.answer){
                score += state.problem_score;
            }else if(score - Math.round(state.problem_score/3) >= 0){
                score -= Math.round(state.problem_score/3);
            }else{
                score = 0;
            }
            let new_correct_answers = state.correct_answers;
            if(action.payload === state.answer) new_correct_answers++;
            if(asked_questions === PROBLEMS_NUMBER) is_playing = false;
            return {
                ...state,
                score,
                problem: generated_problem[0],
                answer: generated_problem[1],
                options: generated_problem[2],
                problem_score: generated_problem[3],
                asked_questions,
                correct_answers: new_correct_answers,
                is_playing
            };

        case START_GAME:
            generated_problem = genProblem(state.level, Math.floor(Math.random() * 2) + 1 === 1);
            return {
                ...state,
                start_time: Date.now(),
                problem: generated_problem[0],
                answer: generated_problem[1],
                options: generated_problem[2],
                problem_score: generated_problem[3],
                asked_questions: 0,
                correct_answers: 0,
                is_playing: true,
                score: 0,
                help: 5
            };

        case UPDATE_PROP:
            let newProps = {};
            if(Array.isArray(action.payload)){
                for(let prop of action.payload){
                    newProps = {...newProps, [prop.key]: prop.value}
                }
                return {...state, ...newProps}
            }

            return {...state, [action.payload.key]: action.payload.value};

        case SET_NEW_RECORD:
            const { records, player, correct_answers, finish_time} = state;
            let newRecords = [];
            if(records !== null){
                newRecords = [...records, {player: player.trim(), score: state.score, finish_time, correct_answers}];
            }else{
                newRecords = [{player: player.trim(), score: state.score, finish_time, correct_answers}];
            }
            AsyncStorage.setItem('records', JSON.stringify(newRecords));
            return {...state, records: newRecords};

        default: return state;
    }
}
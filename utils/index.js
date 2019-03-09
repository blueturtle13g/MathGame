import { AsyncStorage } from 'react-native';
import {
    EASY,
    HARD,
    MASTER,
    MEDIUM
} from "../actions/types";

export const msToTime = s=> {
    // Pad to 2 or 3 digits, default is 2
    let pad = (n, z = 2) => ('00' + n).slice(-z);
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
};

export const shuffle = array =>{
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export const genOptions = number=>{
    let options = [number];
    for(let i=0; i< 3; i++){
        switch (Math.floor(Math.random() * 4) + 1) {
            case 1:
                // sign is plus
                let new_number = number + Math.floor(Math.random() * 20) + 1;
                while(options.includes(Math.round( new_number * 10 ) / 10)){
                    new_number = number + Math.floor(Math.random() * 20) + 1;
                }
                options.push(Math.round( new_number * 10 ) / 10);
                break;
            case 2:
                // sign is minus
                new_number = number - Math.floor(Math.random() * 20) + 1;
                while(options.includes(Math.round( new_number * 10 ) / 10)){
                    new_number = number - Math.floor(Math.random() * 20) + 1;
                }
                options.push(Math.round( new_number * 10 ) / 10);
                break;
            case 3:
                // sign is multiply
                new_number = number * Math.floor(Math.random() * 5) + 1;
                while(options.includes(Math.round( new_number * 10 ) / 10)){
                    new_number = number * Math.floor(Math.random() * 5) + 1;
                }
                options.push(Math.round( new_number * 10 ) / 10);
                break;
            case 4:
                // sign is division
                let is_infinite = true;
                new_number = number / Math.floor(Math.random() * 5) + 1;
                while(is_infinite){
                    if(isFinite(new_number) && !options.includes(Math.round( new_number * 10 ) / 10)){
                        options.push(Math.round( new_number * 10 ) / 10);
                        is_infinite = false;
                    }else{
                        new_number = number / Math.floor(Math.random() * 5) + 1;
                    }
                }
                break;
        }
    }
    return shuffle(options);
};

export const genProblem = (l, x_mode)=>{
    let level = 0;
    let score = 0;
    switch (l){
        case EASY:
            level = 15;
            score = 15;
            break;
        case MEDIUM:
            level = 30;
            score = 25;
            break;
        case HARD:
            level = 60;
            score = 35;
            break;
        case MASTER:
            level = 100;
            score = 45;
            break;
    }
    let problem = "";
    let result = false;
    let x = false;
    switch (Math.floor(Math.random() * 4) + 1){
        case 1:
            let first = Math.floor(Math.random() * level) + 10;
            let second = Math.floor(Math.random() * level) + 10;
            switch (Math.floor(Math.random() * 4) + 1){
                case 1:
                    // sign is plus
                    if(x_mode) {
                        result = first + second;
                        problem = `x + ${second} = ${Math.round( result * 10 ) / 10}`;
                        x = first;
                    }else{
                        problem = `${first} + ${second}`;
                        result = first + second;
                    }
                    break;
                case 2:
                    // sign is minus
                    if(x_mode) {
                        result = first - second;
                        problem = `${first} - x = ${Math.round( result * 10 ) / 10}`;
                        x = second;
                    }else{
                        problem = `${first} - ${second}`;
                        result = first - second;
                    }
                    break;
                case 3:
                    // sign is multiply
                    if(x_mode) {
                        result = first * second;
                        problem = `x * ${second} = ${Math.round( result * 10 ) / 10}`;
                        x = first;
                    }else{
                        problem = `${first} * ${second}`;
                        result = first * second;
                    }
                    break;
                case 4:
                    // sign is division
                    if(x_mode) {
                        result = first / second;
                        problem = `${first} / x = ${Math.round( result * 10 ) / 10}`;
                        x = second;
                    }else{
                        problem = `${first} / ${second}`;
                        result = first / second;
                    }
            }
            break;
        case 2:
            first = Math.floor(Math.random() * level) + 10;
            second = Math.floor(Math.random() * level) + 10;
            let first_nested = Math.floor(Math.random() * level) + 10;
            let second_nested = Math.floor(Math.random() * level) + 10;
            switch (Math.floor(Math.random() * 4) + 1){
                case 1:
                    // main sign is plus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is minus
                            if(x_mode){
                                result = (first - first_nested) + (second - second_nested);
                                problem = `(x - ${first_nested}) + (${second} - ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} - ${first_nested}) + (${second} - ${second_nested})`;
                                result = (first - first_nested) + (second - second_nested);
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first * first_nested) + (second * second_nested);
                                problem = `(${first} * ${first_nested}) + (x * ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} * ${first_nested}) + (${second} * ${second_nested})`;
                                result = (first * first_nested) + (second * second_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first / first_nested) + (second / second_nested);
                                problem = `(${first} / x) + (${second} / ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} / ${first_nested}) + (${second} / ${second_nested})`;
                                result = (first / first_nested) + (second / second_nested);
                            }
                            break;
                    }
                    break;
                case 2:
                    // main sign is minus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first + first_nested) - (second + second_nested);
                                problem = `(${first} + ${first_nested}) - (${second} + x) = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} + ${first_nested}) - (${second} + ${second_nested})`;
                                result = (first + first_nested) - (second + second_nested);
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first * first_nested) - (second * second_nested);
                                problem = `(x * ${first_nested}) - (${second} * ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} * ${first_nested}) - (${second} * ${second_nested})`;
                                result = (first * first_nested) - (second * second_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first / first_nested) - (second / second_nested);
                                problem = `(${first} / ${first_nested}) - (x / ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} / ${first_nested}) - (${second} / ${second_nested})`;
                                result = (first / first_nested) - (second / second_nested);
                            }
                            break;
                    }
                    break;
                case 3:
                    // main sign is multiply
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first + first_nested) * (second + second_nested);
                                problem = `(${first} + x) * (${second} + ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} + ${first_nested}) * (${second} + ${second_nested})`;
                                result = (first + first_nested) * (second + second_nested);
                            }
                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first - first_nested) * (second - second_nested);
                                problem = `(${first} - ${first_nested}) * (${second} - x) = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} - ${first_nested}) * (${second} - ${second_nested})`;
                                result = (first - first_nested) * (second - second_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first / first_nested) * (second / second_nested);
                                problem = `(x / ${first_nested}) * (${second} / ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} / ${first_nested}) * (${second} / ${second_nested})`;
                                result = (first / first_nested) * (second / second_nested);
                            }
                            break;
                    }
                    break;
                case 4:
                    // main sign is division
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first + first_nested) / (second + second_nested);
                                problem = `(${first} + ${first_nested}) / (x + ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} + ${first_nested}) / (${second} + ${second_nested})`;
                                result = (first + first_nested) / (second + second_nested);
                            }
                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first - first_nested) / (second - second_nested);
                                problem = `(${first} - x) / (${second} - ${second_nested}) = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} - ${first_nested}) / (${second} - ${second_nested})`;
                                result = (first - first_nested) / (second - second_nested);
                            }
                            break;
                        case 3:
                            // main sign is multiply
                            if(x_mode){
                                result = (first * first_nested) / (second * second_nested);
                                problem = `(${first} * ${first_nested}) / (${second} * x) = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} * ${first_nested}) / (${second} * ${second_nested})`;
                                result = (first * first_nested) / (second * second_nested);
                            }
                            break;
                    }
            }
            break;
        case 3:
            first = Math.floor(Math.random() * level) + 10;
            second = Math.floor(Math.random() * level) + 10;
            first_nested = Math.floor(Math.random() * level) + 10;
            second_nested = Math.floor(Math.random() * level) + 10;
            switch (Math.floor(Math.random() * 4) + 1){
                case 1:
                    // main sign is plus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is minus
                            if(x_mode){
                                result = (first + (second - second_nested) - first_nested);
                                problem = `x + (${second} - ${second_nested}) - ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `${first} + (${second} - ${second_nested}) - ${first_nested}`;
                                result = (first + (second - second_nested) - first_nested);
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first + (second * second_nested) * first_nested);
                                problem = `${first} + (x * ${second_nested}) * ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `${first} + (${second} * ${second_nested}) * ${first_nested}`;
                                result = (first + (second * second_nested) * first_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first + (second / second_nested) / first_nested);
                                problem = `${first} + (${second} / ${second_nested}) / x = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `${first} + (${second} / ${second_nested}) / ${first_nested}`;
                                result = (first + (second / second_nested) / first_nested);
                            }
                            break;
                    }
                    break;
                case 2:
                    // main sign is minus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first - (second + second_nested) + first_nested);
                                problem = `${first} - (${second} + x) + ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `${first} - (${second} + ${second_nested}) + ${first_nested}`;
                                result = (first - (second + second_nested) + first_nested);
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first - (second * second_nested) * first_nested);
                                problem = `x - (${second} * ${second_nested}) * ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `${first} - (${second} * ${second_nested}) * ${first_nested}`;
                                result = (first - (second * second_nested) * first_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first - (second / second_nested) / first_nested);
                                problem = `${first} - (x / ${second_nested}) / ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `${first} - (${second} / ${second_nested}) / ${first_nested}`;
                                result = (first - (second / second_nested) / first_nested);
                            }
                            break;
                    }
                    break;
                case 3:
                    // main sign is multiply
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first * (second + second_nested) + first_nested);
                                problem = `${first} * (${second} + ${second_nested}) + x = ${Math.round( result * 10 ) / 10}` ;
                                x = first_nested;
                            }else{
                                problem = `${first} * (${second} + ${second_nested}) + ${first_nested}`;
                                result = (first * (second + second_nested) + first_nested);
                            }
                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first * (second - second_nested) - first_nested);
                                problem = `${first} * (${second} - x) - ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `${first} * (${second} - ${second_nested}) - ${first_nested}`;
                                result = (first * (second - second_nested) - first_nested);
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first * (second / second_nested) / first_nested);
                                problem = `x * (${second} / ${second_nested}) / ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `${first} * (${second} / ${second_nested}) / ${first_nested}`;
                                result = (first * (second / second_nested) / first_nested);
                            }
                            break;
                    }
                    break;
                case 4:
                    // main sign is division
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first / (second + second_nested) + first_nested);
                                problem = `${first} / (x + ${second_nested}) + ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `${first} / (${second} + ${second_nested}) + ${first_nested}`;
                                result = (first / (second + second_nested) + first_nested);
                            }

                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first / (second - second_nested) - first_nested);
                                problem = `${first} / (${second} - ${second_nested}) - x = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `${first} / (${second} - ${second_nested}) - ${first_nested}`;
                                result = (first / (second - second_nested) - first_nested);
                            }
                            break;
                        case 3:
                            // main sign is multiply
                            if(x_mode){
                                result = (first / (second * second_nested) * first_nested);
                                problem = `${first} / (${second} * x) * ${first_nested} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `${first} / (${second} * ${second_nested}) * ${first_nested}`;
                                result = (first / (second * second_nested) * first_nested);
                            }
                            break;
                    }
            }
            break;
        case 4:
            first = Math.floor(Math.random() * level) + 10;
            second = Math.floor(Math.random() * level) + 10;
            first_nested = Math.floor(Math.random() * level) + 10;
            second_nested = Math.floor(Math.random() * level) + 10;
            let outer_number = Math.floor(Math.random() * level) + 10;
            switch (Math.floor(Math.random() * 4) + 1){
                case 1:
                    // main sign is plus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is minus
                            if(x_mode){
                                result = (first + (second - second_nested) - first_nested) * outer_number;
                                problem = `(x + (${second} - ${second_nested}) - ${first_nested}) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} + (${second} - ${second_nested}) - ${first_nested}) * ${outer_number}`;
                                result = (first + (second - second_nested) - first_nested) * outer_number;
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first + (second * second_nested) * first_nested) / outer_number;
                                problem = `(${first} + (x * ${second_nested}) * ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} + (${second} * ${second_nested}) * ${first_nested}) / ${outer_number}`;
                                result = (first + (second * second_nested) * first_nested) / outer_number;
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first + (second / second_nested) / first_nested) * outer_number;
                                problem = `(${first} + (${second} / x) / ${first_nested}) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} + (${second} / ${second_nested}) / ${first_nested}) * ${outer_number}`;
                                result = (first + (second / second_nested) / first_nested) * outer_number;
                            }
                            break;
                    }
                    break;
                case 2:
                    // main sign is minus
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first - (second + second_nested) + first_nested) / outer_number;
                                problem = `(${first} - (${second} + x) + ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} - (${second} + ${second_nested}) + ${first_nested}) / ${outer_number}`;
                                result = (first - (second + second_nested) + first_nested) / outer_number;
                            }
                            break;
                        case 2:
                            // main sign is multiply
                            if(x_mode){
                                result = (first - (second * second_nested) * first_nested) * outer_number;
                                problem = `(x - (${second} * ${second_nested}) * ${first_nested}) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} - (${second} * ${second_nested}) * ${first_nested}) * ${outer_number}`;
                                result = (first - (second * second_nested) * first_nested) * outer_number;
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first - (second / second_nested) / first_nested) / outer_number;
                                problem = `(${first} - (x / ${second_nested}) / ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} - (${second} / ${second_nested}) / ${first_nested}) / ${outer_number}`;
                                result = (first - (second / second_nested) / first_nested) / outer_number;
                            }
                            break;
                    }
                    break;
                case 3:
                    // main sign is multiply
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first * (second + second_nested) + first_nested) * outer_number;
                                problem = `(${first} * (${second} + ${second_nested}) + x) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} * (${second} + ${second_nested}) + ${first_nested}) * ${outer_number}`;
                                result = (first * (second + second_nested) + first_nested) * outer_number;
                            }
                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first * (second - second_nested) - first_nested) / outer_number;
                                problem = `(${first} * (${second} - x) - ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} * (${second} - ${second_nested}) - ${first_nested}) / ${outer_number}`;
                                result = (first * (second - second_nested) - first_nested) / outer_number;
                            }
                            break;
                        case 3:
                            // main sign is division
                            if(x_mode){
                                result = (first * (second / second_nested) / first_nested) * outer_number;
                                problem = `(x * (${second} / ${second_nested}) / ${first_nested}) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first;
                            }else{
                                problem = `(${first} * (${second} / ${second_nested}) / ${first_nested}) * ${outer_number}`;
                                result = (first * (second / second_nested) / first_nested) * outer_number;
                            }
                            break;
                    }
                    break;
                case 4:
                    // main sign is division
                    switch (Math.floor(Math.random() * 3) + 1) {
                        case 1:
                            // main sign is plus
                            if(x_mode){
                                result = (first / (second + second_nested) + first_nested) / outer_number;
                                problem = `(${first} / (x + ${second_nested}) + ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second;
                            }else{
                                problem = `(${first} / (${second} + ${second_nested}) + ${first_nested}) / ${outer_number}`;
                                result = (first / (second + second_nested) + first_nested) / outer_number;
                            }
                            break;
                        case 2:
                            // main sign is minus
                            if(x_mode){
                                result = (first / (second - second_nested) - first_nested) * outer_number;
                                problem = `(${first} / (${second} - ${second_nested}) - x) * ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = first_nested;
                            }else{
                                problem = `(${first} / (${second} - ${second_nested}) - ${first_nested}) * ${outer_number}`;
                                result = (first / (second - second_nested) - first_nested) * outer_number;
                            }
                            break;
                        case 3:
                            // main sign is multiply
                            if(x_mode){
                                result = (first / (second * second_nested) * first_nested) / outer_number;
                                problem = `(${first} / (${second} * x) * ${first_nested}) / ${outer_number} = ${Math.round( result * 10 ) / 10}`;
                                x = second_nested;
                            }else{
                                problem = `(${first} / (${second} * ${second_nested}) * ${first_nested}) / ${outer_number}`;
                                result = (first / (second * second_nested) * first_nested) / outer_number;
                            }
                            break;
                    }
            }
    }
    x = Math.round( x * 10 ) / 10;
    result = Math.round( result * 10 ) / 10;
    if(x_mode){
        // x_mode gives 10 more scores
        let options = genOptions(x);
        return [problem, x, options, score + 10]
    }

    let options = genOptions(result);
    return [problem, result, options, score]
};

export const retrieveRecords = async ()=>{
    try {
        const retrievedItem =  await AsyncStorage.getItem('records');
        return JSON.parse(retrievedItem);
    } catch (error) {
        console.log(error.message);
    }
};
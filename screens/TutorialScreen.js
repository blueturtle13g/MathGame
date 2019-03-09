import React  from 'react';
import TutorialSlides from '../components/TutorialSlides';
import { View} from 'react-native';
import GameStartScreen from "./GameStartScreen";
import { PROBLEMS_NUMBER } from '../actions/types';

const SLIDE_DATA = [
    { text: 'Welcome To The Math Game!', color: '#03A9F4' },
    { text: 'There Are '+ PROBLEMS_NUMBER.toString()+' Problems You Should Solve.', color: '#009688' },
    { text: 'In Each Stage, You Can Choose The Hardness Of The Next Question By The Options At The Bottom Of The Screen.', color: '#03A9F4' },
    { text: 'The Harder The Question Gets, The More Scores You Get.', color: '#009688' },
    { text: 'Also You Can Skip Any Questions You Wish!', color: '#03A9F4' },
    { text: "Note That Your Time Doesn't Affect On Your Score, So Take Your Time.", color: '#009688' },

];

export default class TutorialScreen extends React.Component{

    backHandler = ()=>{
        const { navigation } = this.props;
        let backGoesTo = navigation.getParam('backGoesTo', false);
        if(backGoesTo){
            navigation.navigate(backGoesTo);
        }else{
            navigation.navigate("GameStartScreen");
        }
    };
    render(){
        return(
            <View style={{flex: 1}}>
                <TutorialSlides data={SLIDE_DATA} onComplete={this.backHandler} />
            </View>
        )
    }
}
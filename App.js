import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './AppContainer';
import rootReducer from './reducers';

export default class App extends Component{

    componentDidMount() {
        SplashScreen.hide();
    }

    render(){
        return (
            <Provider store={createStore(rootReducer)}>
                <AppContainer/>
            </Provider>
        );
    }
}
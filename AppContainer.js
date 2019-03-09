import {
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';
import PlayGroundScreen from './screens/PlayGroundScreen';
import GameStartScreen from './screens/GameStartScreen';
import RecordScreen from './screens/RecordScreen';
import TutorialScreen from './screens/TutorialScreen';

const AppNavigator = createBottomTabNavigator(
    {
        GameStartScreen,
        PlayGroundScreen,
        RecordScreen,
        TutorialScreen,
    }, {
        defaultNavigationOptions: {
            tabBarVisible: false,
        }
    }
);

export default createAppContainer(AppNavigator);
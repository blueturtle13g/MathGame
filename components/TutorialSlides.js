import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onComplete}
                >
                    <Text style={styles.button_text}>I'm Ready</Text>
                </TouchableOpacity>
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View
                    key={slide.text}
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        padding: 5,
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        textAlign: "center"
    },
    button: {
        backgroundColor: '#027cc0',
        marginTop: 25,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    button_text:{
        fontSize: 25,
        color: "#fff",
        fontStyle: "italic",
        fontWeight: "600"
    },
};

export default Slides;
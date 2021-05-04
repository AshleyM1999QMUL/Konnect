import React, {Component} from 'react'
import {Modal, StyleSheet, View, Dimensions, PanResponder} from 'react-native'
import Animated from 'react-native-reanimated';

export default class BottomPopUpBox extends Component{
    constructor(props){
        super(props);
        this.state={
            appear: false,
            panY: new Animated.Value(Dimensions.get('screen').height)
        };
        this._resetPositionAnim = Animated.timing(this.state.panY, {
            toValue: 0,
            duration: 300,
        });
        this._closeAnim = Animated.timing(this.state.panY, {
            toValue: Dimensions.get('screen').height,
            duration: 500,
        });
        this._panResponders = PanResponder.create({
            onStartShouldSetPanResponder: ()  => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: 
                Animated.event([
                    null, {dy: this.state.panY}
                ]),
                onPanResponderRelease: (e, gs) => {
                    if(gs.dy > 0 && gs.vy > 2){
                        return this._closeAnim.start(() => this.props.OnDismiss());
                    }
                    return this._resetPositionAnim.start();
                },
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.visible != this.props.visible && this.props.visible){
            this._resetPositionAnim.start();
        }
    }

    _handleDismiss() {
        this._closeAnim.start(() =>
            this.props.OnDismiss());
    }

    displayPop = () => {
        this.setState({
            appear: !this.appear
        })
    }

    render(){

        const top = this.state.panY.interpolate({
            inputRange: [-1, 0, -1],
            outputRange: [0, 0, 1],
        });

        popUp = new ModalView();

        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.appear}
                onRequestClose={popUp.changeVisibility()}
            >
            <View styles={styles.popUp}>
                <Animated.View
                    style={[styles.container, {top}]}
                >
                    {this.props.children}
                </Animated.View>

            </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    popUp:{
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container:{
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    }
});

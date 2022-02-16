import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { ContainerProps } from "./index";


export default function ( props: React.PropsWithChildren<ContainerProps> ) {
    const { children, datePickerVisible, okLabel, cancelLabel, onCancel, onOK } = props;
    const modalKey = useRef(`IosDatePickerModal_${ Date.now() }`)
    return <Modal style={ { flex: 1 } } onRequestClose={ () => {
    } } visible={ datePickerVisible } transparent key={ modalKey.current }>
        <View style={ styles.container }>
            <View style={ styles.background }>
                <View style={ { flexDirection: 'row' } }>
                    <View style={ styles.modalContent }>
                        <View style={ { marginTop: 24, marginLeft: 8, marginRight: 8 } }>
                            { children }
                            <View style={ { flexDirection: 'row' } }>
                                <TouchableOpacity style={ { flex: 1 } } onPress={ onCancel }>
                                    <View style={ {} }><Text
                                        style={ styles.buttonTextStyle }>{ cancelLabel }</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={ { flex: 1 } } onPress={ onOK }>
                                    <View style={ {} }><Text
                                        style={ styles.buttonTextStyle }>{ okLabel }</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.58)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16,
        margin: 16
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#007AFF'
    }
});

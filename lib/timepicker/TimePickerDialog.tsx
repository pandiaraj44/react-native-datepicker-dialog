import React, { Component } from 'react';
import PickerDialog, {Props, DPProps, PickerOption } from "../Picker";
import { Platform } from "react-native";



interface State {
}

export interface TimePickerOptions extends PickerOption {
    is24Hour?: boolean;
}

export default class DatePickerDialog extends Component<Props, State> {
    picker = React.createRef<PickerDialog<TimePickerOptions>>();

    constructor( props: Props ) {
        super(props);
        this.state = {}
    }

    open( options: TimePickerOptions ) {
        this.picker.current?.open(options);
    }

    cancel = () => {
        this.picker.current?.cancel();
    }
    buildOptions = ( options: TimePickerOptions ) => {
        const isIOS = Platform.OS === "ios";
        return {
            display: isIOS ? "spinner" : "clock",
            mode: "time",
            is24Hour: options.is24Hour === true,
        } as Partial<DPProps>
    }

    render() {
        return <PickerDialog
            ref={ this.picker }
            { ...this.props }
            buildPickerProps={ this.buildOptions }
        />
    }
}


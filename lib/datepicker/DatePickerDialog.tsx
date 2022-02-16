import React, { Component } from 'react';
import PickerDialog, {Props, DPProps, PickerOption } from "../Picker";
import { Platform } from "react-native";



interface State {
}

export interface DatePickerOptions extends PickerOption {
    minDate?: Date;
    maxDate?: Date;
}

export default class DatePickerDialog extends Component<Props, State> {
    picker = React.createRef<PickerDialog<DatePickerOptions>>();

    constructor( props: Props ) {
        super(props);
        this.state = {}
    }

    open( options: DatePickerOptions ) {
        this.picker.current?.open(options);
    }

    cancel = () => {
        this.picker.current?.cancel();
    }
    buildOptions = ( options: DatePickerOptions ) => {
        const { minDate, maxDate } = options
        const isIOS = Platform.OS === "ios";
        return {
            display: isIOS ? "spinner" : "calendar",
            mode: "date",
            maximumDate: maxDate,
            minimumDate: minDate,
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


import React from "react";

export interface ContainerProps {
    datePickerVisible: boolean;
    onOK: () => void;
    onCancel: () => void;
    okLabel: string;
    cancelLabel: string;
}

export default function ( props: React.PropsWithChildren<ContainerProps> ) {
    return <>
        { props.children }
    </>
}

import React from "react";
import { ContainerProps } from "./index";

export default function ( props: React.PropsWithChildren<ContainerProps> ) {
    const { datePickerVisible, children } = props;
    return <>
        { datePickerVisible && children }
    </>
}

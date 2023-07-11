import React from "react";
import "tailwindcss/tailwind.css";
import { styles } from "./styles";

import Login from "../react/login";







const SupportWindow = props => {
    return (
        
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0' }
            }}
        >
        <Login />
        {/* <Chat /> */}

        </div>
    )
}

export default SupportWindow;
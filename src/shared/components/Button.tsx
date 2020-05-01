import React, { useState } from "react"

interface ButtonProps {
    children: React.ReactElement;
    className: string;
    mouseDownClassName: string;
    callback: Function
}

const Button: React.FC<ButtonProps> = ({ children, callback, className, mouseDownClassName }) => {
    const [mouseDown, setMouseDown] = useState(false)
    return (
        <div
            className={`${className} ${mouseDown && mouseDownClassName}`}
            onClick={() => callback()}
            onTouchStart={() => setMouseDown(true)}
            onTouchEnd={() => setMouseDown(false)}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            {children}
        </div>
    )
}

export default Button
import React from "react"

interface ButtonProps {
    children: React.ReactElement;
    callback: Function
}

const Button: React.FC<ButtonProps> = ({ children, callback }) => (
    <div className="btn" onClick={() => callback()}>
        {children}
    </div>
)

export default Button
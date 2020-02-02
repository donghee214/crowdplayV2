import React from "react"

interface ButtonProps {
    children: React.ReactElement;
    callback?: VoidFunction
}

const Button: React.FC<ButtonProps> = ({ children, callback }) => (
    <div className="btn">
        {children}
    </div>
)

export default Button
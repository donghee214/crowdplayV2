import React, { useCallback } from "react"

interface InputProps {
    customClassName?: string,
    placeholder?: string,
    errorMessage?: string,
    focusOnRender?: boolean,
    callback?: Function,
    onChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void,
    value: string,
}

const Input: React.FC<InputProps> = ({
    customClassName,
    onChangeCallback,
    placeholder,
    value,
    errorMessage,
    callback,
    focusOnRender
}) => {
    const checkIfEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && callback) {
            callback()
        }
    }

    const focusInput = useCallback((node) => {
        if (node) {
            node.focus()
        }
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <input
                className={`${customClassName} home-screen_join-room-input`}
                placeholder={placeholder || ""}
                onChange={onChangeCallback}
                onKeyPress={checkIfEnter}
                value={value}
                ref={focusOnRender ? focusInput : null}
            />
            <p className="type--error">
                {errorMessage}
            </p>
        </div>

    )
}

export default Input
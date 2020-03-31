import React from "react"

interface BackProps {
    className?: string
}

export default ({ className }: BackProps) => (
    <svg className={`back ${className}`} height="24" viewBox="0 0 24 24" width="24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
)
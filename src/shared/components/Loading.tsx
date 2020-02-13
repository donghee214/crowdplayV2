import React from "react"

interface LoadingProps {
    classNameText?: string
}

const Loading: React.FC<LoadingProps> = ({ classNameText }) => (
    <div className="loadingContainer">
        <div className="LoaderBalls">
            <div className={`${classNameText} LoaderBalls__item`}></div>
            <div className={`${classNameText} LoaderBalls__item`}></div>
            <div className={`${classNameText} LoaderBalls__item`}></div>
        </div>
    </div>

)

export default Loading
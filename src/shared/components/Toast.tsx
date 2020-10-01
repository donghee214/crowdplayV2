import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/react-hooks"
import { GET_TOAST } from "server/Apollo/Queries"
import { CSSTransition } from "react-transition-group";

const Toast = () => {
    const { data } = useQuery(GET_TOAST)
    const [mount, setMount] = useState(false)
    let timeout: any

    useEffect(() => {
        if (!data?.toast?.message) return
        if (mount === false) {
            setMount(true)
            timeout = setTimeout(() => { setMount(false) }, 2000)
        }
        else {
            setMount(false)
            setTimeout(() => {
                timeout = setTimeout(() => { setMount(false) }, 2000)
                setMount(true)
            }, 50)

        }
        // clear any existing timeouts whenever the value changes
        return () => clearTimeout(timeout)
    }, [data?.toast?.id])

    return (
        <CSSTransition
            unmountOnExit={true}
            in={mount}
            timeout={250}
            classNames="toast-animation">
            <div className="toast-container">
                <div className="toast">
                    <h3 style={{ fontSize: "0.9rem" }}>
                        {data?.toast?.message}
                    </h3>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Toast
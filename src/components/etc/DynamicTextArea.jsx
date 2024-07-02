import {  useRef } from "react"
import { useAutosizeTextArea } from "./useAutosizeTextArea"

export function DynamicTextArea({ value = '', onChange, styles = '', rows, onKeyUp, index }) {
    let pressDownEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }
    if (onKeyUp) {
        pressDownEnter = onKeyUp
    }
    const textAreaRef = useRef(null)
    useAutosizeTextArea(textAreaRef.current, value)


    return (
        <>
            <textarea
                ref={textAreaRef}
                className={styles +  " lg:border-none"}
                onChange={onChange}
                onKeyUp={(e) => { pressDownEnter(e, index) }}
                value={value}
                rows={rows}
                placeholder={"Type something..."}
            />
        </>
    )
}
import {  useRef } from "react"
import { useAutosizeTextArea } from "./useAutosizeTextArea"

export function DynamicTextArea({ placeholder = '', value = '', onChange, styles='', rows }) {
    const textAreaRef = useRef(null)
    useAutosizeTextArea(textAreaRef.current, value)

    return (
        <>
            <textarea
                ref={textAreaRef}
                className={styles}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                rows={rows}
            />
        </>
    )
}
import { useEffect } from 'react'

// Updates the height on value update.
export const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
        // Run the effect once on mount
        if (textAreaRef) {
            // We need to reset the height first to get the correct scrollHeight for the textarea
            textAreaRef.style.height = '0px'
            const { scrollHeight } = textAreaRef

            // Now we set the height directly
            textAreaRef.style.height = `${scrollHeight}px`
        }
    }, []) // Empty dependency array means it will only run once on mount
    
    useEffect(() => {
        // make sure that textAreaRef exists
        if (textAreaRef) {
            // We need to reset the height first to get the correct scrollHeight for the textarea
            textAreaRef.style.height = '0px'
            const { scrollHeight } = textAreaRef

            // Now we set the height directly
            textAreaRef.style.height = `${scrollHeight}px`
        }
    }, [textAreaRef, value])


}
import { useEffect, useState } from "react"

const useDebounce = (searchTerm: string | null, delay: number): string | null => {

    const [debouncedValue, setDebounceValue] = useState <string | null>(null);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebounceValue(searchTerm)
        }, delay);

        return () => {
            clearTimeout(timer);
        }

    }, [searchTerm, delay])



    return debouncedValue;

}

export default useDebounce;
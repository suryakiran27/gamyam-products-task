import { useEffect, useState } from "react";
import { useAppDispatch } from "../features/hooks";
import { setCurrentPage } from "../features/products/productSlice";

export function useDebounce<T>(value: T, delay: number) {
    const dispatch = useAppDispatch();
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
            dispatch(setCurrentPage(1))
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue;
}
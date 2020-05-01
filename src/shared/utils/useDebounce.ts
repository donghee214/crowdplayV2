import React, { useState, useEffect } from 'react';

interface props {

}

const useDebounce = (value: any, delay: number, callback?: Function): [string, React.Dispatch<string>] => {
    const [debouncedValue, setDebouncedValue] = useState<any>(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(() => {
                    value &&
                        callback && callback()
                    return value
                });
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );
    return [debouncedValue, setDebouncedValue];
}

export default useDebounce
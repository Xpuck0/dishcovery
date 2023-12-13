import { useState } from "react";

export default function usePersistedState(key, initValue) {
    const [state, setState] = useState(() => {
        const persisted = localStorage.getItem(key);

        if (persisted) {
            return JSON.parse(persisted)
        }

        return initValue;
    });

    const setPersistedState = (initValue) => {
        setState(initValue);

        let serialized;


        if (typeof initValue == 'function'){
            serialized = JSON.stringify(initValue(initValue));
        } else {
            serialized = JSON.stringify(initValue);
        }

        localStorage.setItem(key, serialized);
    }

    return [
        state,
        setPersistedState
    ]
}
import { useState } from "react";
import { QueryContext } from "../contexts/contexts";

export default function QueryProvider({children}) {
    const [query, setQuery] = useState('');

    const emptyQuery = () => {
        setQuery('');
    }

    const changeQuery = (val) => {
        console.log('sdfadsf')
        if (typeof val == 'string') {
            console.log('inside changequery if')
            setQuery(val);
        }
    }

    const values = {
        query: query || '',
        emptyQuery: emptyQuery,
        changeQuery: changeQuery,
        setQuery: setQuery
    }

    return (
        <QueryContext.Provider value={values}>
            {children}
        </QueryContext.Provider>
    )
}
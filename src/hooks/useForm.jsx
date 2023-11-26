import { useState } from "react";


export default function useForm(initialValue) {
    const [credentials, setCredentials] = useState(initialValue);

    const handleChange = (e) => {
        setCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setCredentials(initialValue)
    }


    const inputProps = {
        changeHandler: handleChange,
        credentials: credentials,
        submitHandler: submitHandler
    }


    return inputProps;

}
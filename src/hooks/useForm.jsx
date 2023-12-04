import { useState } from "react";


export default function useForm(submitHandler, initialValue = {}) {
    const [credentials, setCredentials] = useState(initialValue);

    const onChange = (e) => {
        setCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(credentials)
    }


    const inputProps = {
        credentials: credentials,
        onChange: onChange,
        onSubmit: onSubmit, 
    }


    return inputProps;

}
'use client';

import {useState} from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleRememberMe = (event) => {
        setValues({
            ...values,
            rememberMe: event.target.checked,
        });
    };

    const handleSubmit = (event, callback) => {
        event.preventDefault();
        if (callback) {
            callback();
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        handleRememberMe
    };
};

export default useForm;

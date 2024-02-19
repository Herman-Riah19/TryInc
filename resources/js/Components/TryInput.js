import React, { useState } from 'react'
import { TextField } from '@mui/material'
function TryInput({ name, value, label, error }) {
    const [data, setData] = useState({
        name: name,
        value: value,
        error: error
    }) 

    const handleChange = (event) => {
        console.log(event.target.value)
        const key = event.target.id
        const val = event.target.value
        setData(values => ({
            ...values,
            [key]: val
        }))
    }

    return (
        <div>
            <TextField
                margin="normal"
                fullWidth
                id={data.name}
                label={label}
                name={data.name}
                autoComplete={label}
                value={data.value}
                helperText={data.error}
                autoFocus
                onChange={handleChange} />
        </div>
    )
}

export default TryInput
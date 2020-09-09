import React from 'react'

import { useFormsio } from 'react-formsio';
import 'react-formsio/dist/index.css';

const App = () => {
    const [ Form , register ] = useFormsio();
    return(
        <Form>

            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                validations = { register() } />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register } />

            <button
                type = 'submit'>
                    Submit
            </button>

        </Form>
    )
}

export default App;

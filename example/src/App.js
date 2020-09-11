import React from 'react'

import { useFormsio } from 'react-formsio';
import 'react-formsio/dist/index.css';

const App = () => {
    // const INITIAL_STATE = {
    //     userName: '',
    //     userEmail: ''
    // };
    const [ register ] = useFormsio();
    console.log('Component');

    return(
        <form>

            <input
                type = 'text'
                placeholder = 'Enter your name'
                name = 'userName'
                ref={ register({ name: 'userName', validations: 'required|minLength:5:11|equalTo:10', initialValue: 'Akhil' }) } />

            <input
                type = 'email'
                placeholder = 'Enter your email'
                name = 'userEmail'
                ref = { register({ name: 'userEmail' }) } />

            <button
                type = 'submit'>
                    Submit
            </button>

        </form>
    )
}

export default React.memo(App);

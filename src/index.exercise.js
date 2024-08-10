import '@reach/dialog/styles.css'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'
import { VisuallyHidden } from '@reach/visually-hidden'


function LoginForm ({onSubmit, buttonText}) {
    function handleSubmit(event) {
        event.preventDefault() // This stops the form from resetting the page when you hit submit
        const {username, password} = event.target.elements
        onSubmit({
            username: username.value,
            password: password.value,
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" />  {/* This type="password keeps people from seeing the password. That's what makes the text black dots instead of letters.*/}
            </div>
            <div>
                <button type="submit">{buttonText}</button>
            </div>
        </form>
    )
}


function App () {
    const [openModal, setOpenModal] = React.useState('none')

    function login(formData) {
        console.log('login hit', formData)
    }

    function register(formData) {
        console.log('register hit', formData)
    }
    return (
        <div>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <div>
                <button onClick={() => setOpenModal('login')}>Login</button>
            </div>
            <div>
                <button onClick={() => setOpenModal('register')}>Register</button>
            </div>

            {/* The LOGIN Modal is below */}

            <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
                <button onClick={() => setOpenModal('none')}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span aria-hidden>x</span>
                </button>
                <p>Hello there. I am a login modal</p>

                <LoginForm onSubmit={login} buttonText="Login" />

            </Dialog>

            {/* The REGISTER Modal is below */}

            <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
                <button onClick={() => setOpenModal('none')}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span aria-hidden>x</span>
                </button>
                <p>Hello there. I am a register modal</p>
                <LoginForm onSubmit={register} buttonText="Register" />
            </Dialog>

        </div>

    )
}


const root = createRoot(document.getElementById('root'))
root.render(<App/>)
export {root}

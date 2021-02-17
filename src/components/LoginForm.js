import React from 'react';

class LoginForm extends React.Component {
    state = {
        input: ""
    }
    handleChange = (event) => {
        this.setState({input: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.target.reset()
        this.props.logInUser(this.state.input)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" placeholder="enter your username"
                    onChange={this.handleChange}></input>
                <input type="submit"></input>   
            </form>
        )
    }
}

export default LoginForm;
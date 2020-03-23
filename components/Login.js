import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'grommet/components/Button';
import PasswordInput from 'grommet/components/PasswordInput';
import TextInput from 'grommet/components/TextInput';
import Spinning from 'grommet/components/icons/Spinning';

import { loginUser, logoutUser } from '../redux/actions';

class Login extends Component {
    state = {
        password: '',
        email: ''
    };

    renderLogin() {
        return (
            <>
                <h3 style={{ width: '100%', textAlign: 'center' }}> Log In to Edit</h3>
                <TextInput
                    value={this.state.email}
                    onDOMChange={event => {
                        console.log(event.target.value);
                        this.setState({ email: event.target.value });
                    }}
                    placeHolder="Email"
                    style={{ width: '100%', marginBottom: '0.5vw' }}
                />
                <PasswordInput
                    value={this.state.password}
                    onChange={event => this.setState({ password: event.target.value })}
                    style={{ width: '100%', height: '3vw', margin: '0.5vw 0 1vw 0' }}
                    placeholder="Password"
                />

                <Button
                    label="Log In"
                    onClick={() => this.props.loginUser(this.state.email, this.state.password)}
                    style={{ width: '100%' }}
                />
                {this.props.error ? (
                    <h4
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            width: '100%',
                            margin: '1vw 0 0vw 0'
                        }}
                    >
                        {this.props.error}
                    </h4>
                ) : null}
            </>
        );
    }

    renderLogOut() {
        console.log(this.props.user);
        return (
            <>
                <h3 style={{ textAlign: 'center', marginBottom: '1em', fontWeight: '500' }}>
                    {' '}
                    Logged In As{' '}
                </h3>
                <h5 style={{ textAlign: 'center' }}>{this.props.user.email.trim()}</h5>
                <Button
                    label="View Admin Console"
                    href="/admin"
                    style={{ width: '100%', marginBottom: '1vw' }}
                />
                <Button
                    label="Log Out"
                    critical={true}
                    onClick={() => this.props.logoutUser()}
                    href="#"
                    style={{ width: '100%' }}
                />
            </>
        );
    }

    renderLoading() {
        return (
            <>
                <h3 style={{ textAlign: 'center' }}>
                    <Spinning /> Loading
                </h3>
            </>
        );
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '18vw',
                    padding: '1vw'
                }}
            >
                {this.props.loading
                    ? this.renderLoading()
                    : !this.props.isAuthenticated
                    ? this.renderLogin()
                    : this.renderLogOut()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated, loading, error } = state;
    return { user, isAuthenticated, loading, error };
};

export default connect(mapStateToProps, { loginUser, logoutUser })(Login);

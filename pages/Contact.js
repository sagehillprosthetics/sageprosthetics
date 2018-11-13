import React, { Component } from 'react';
import * as firebase from 'firebase';
//import * as admin from 'firebase-admin';
import { connect } from 'react-redux';
import { getGroup } from '../redux/actions';
import { Image, Transformation } from 'cloudinary-react';
import * as types from '../redux/types.js';

import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

class Contact extends Component {
    static async getInitialProps({ req, query, store }) {}

    state = {
        name: '',
        email: '',
        message: ''
    };

    renderButtons() {
        if (this.state.name && this.state.email && this.state.message) {
            return (
                <Button
                    label="Submit"
                    type="submit"
                    form="form1"
                    value="Send"
                    accent
                    style={{ margin: '20px 45% 0% 45%', width: '10%' }}
                />
            );
        }

        return (
            <Button
                label="Submit"
                accent
                style={{ margin: '20px 45% 0% 45%', width: '10%' }}
            />
        );
    }

    render() {
        console.log(this.state.message);
        return (
            <div style={{ margin: '0% 15% 0% 15%' }}>
                <h2 style={{ textAlign: 'center' }}>Contact Us</h2>
                <form
                    action="https://formspree.io/timg51237@gmail.com"
                    method="POST"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    id="form1"
                >
                    <FormField label="Name" size="medium" help="Required">
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none'
                            }}
                            type="text"
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                        />
                    </FormField>
                    <FormField
                        label="Email Address"
                        size="medium"
                        help="Required"
                    >
                        <input
                            style={{
                                fontWeight: 'lighter',
                                border: 'none'
                            }}
                            type="email"
                            onChange={event =>
                                this.setState({ email: event.target.value })
                            }
                        />
                    </FormField>

                    <FormField label="Message" size="large" help="Required">
                        <textarea
                            style={{
                                fontWeight: 'lighter',
                                height: '60%',
                                resize: 'none',
                                border: 'none'
                            }}
                            type="text"
                            placeholder="Message"
                            name="message"
                            rows={10}
                            onChange={event =>
                                this.setState({ message: event.target.value })
                            }
                        />
                    </FormField>

                    {/* <input
                        style={
                            {
                                backgroundColor: '#2B1B76',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer' ,
                                fontWeight: 'lighter',
                                fontSize: 20,
                                padding: '10px 20px',
                                marginTop: 20
                            } //Should have been avenir-book
                        }
                        type="submit"
                        value="Send"
                    /> */}
                </form>
                {this.renderButtons()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gallery: state.gallery
    };
};

export default connect(
    mapStateToProps,
    { getGroup }
)(Contact);

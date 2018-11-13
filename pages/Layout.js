import Footer from 'grommet/components/Footer';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Popover from 'react-simple-popover';
import { connect } from 'react-redux';

import Link from 'next/link';
import '../styles.scss';

import React, { Component } from 'react';

class Layout extends Component {
    state = {
        dropdown: false,
        secondDropdown: ''
    };

    renderFooter() {
        return (
            <Footer
                justify="between"
                size="small"
                style={{
                    padding: '0% 1.5% 0% 1.5%',
                    margin: '2.5vh 0 1.5vh 0'
                }}
            >
                <Title>
                    <s />
                    Sage Prosthetics
                </Title>
                <Box direction="row" align="center" pad={{ between: 'medium' }}>
                    <Paragraph margin="none">© 2018 Sage Prosthetics</Paragraph>
                    <Menu
                        direction="row"
                        size="small"
                        dropAlign={{ right: 'right' }}
                    >
                        <Anchor href="/privacy-policy">Privacy Policy</Anchor>
                        <Anchor href="/contact">Contact</Anchor>
                        <Anchor href="#">About</Anchor>
                    </Menu>
                </Box>
            </Footer>
        );
    }

    renderHeader() {
        console.log(this.state);
        return (
            <Header
                fixed={true}
                width="full"
                style={{ padding: '0% 1.5% 0% 1.5%', height: '7vw', zIndex: 1 }}
            >
                <Title>
                    <a style={{ fontSize: '30px', margin: 0 }} href="/">
                        <img
                            src="/static/biglogo.png"
                            alt="logo"
                            style={{ height: '5vw', marginBottom: 0 }}
                        />
                    </a>
                </Title>
                <Box
                    flex={true}
                    justify="end"
                    direction="row"
                    responsive={false}
                >
                    <ul
                        className="navbar-nav mr-auto"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '2.5vw'
                        }}
                    >
                        <li className="nav-item" style={styles.navlink}>
                            <a
                                ref="target"
                                style={{ color: '#7ed4c6' }}
                                href="#"
                                onClick={() => {
                                    const help = window.scrollY;
                                    this.setState({
                                        dropdown: true,
                                        secondDropdown: ''
                                    });
                                    setTimeout(
                                        () => window.scrollTo(0, help),
                                        0
                                    );
                                }}
                            >
                                <div className="text">Recipients</div>
                            </a>
                            <Popover
                                placement="bottom"
                                container={this}
                                target={this.refs.target}
                                show={this.state.dropdown}
                                onHide={() => {
                                    this.setState({
                                        dropdown: false,
                                        secondDropdown: ''
                                    });
                                }}
                                style={{
                                    marginTop: '2.5vw',
                                    zIndex: 40,
                                    opacity: '1'
                                    //position: 'absolute'
                                    //top: window.scrollY + 'px'
                                }}
                            >
                                <a
                                    ref="target2"
                                    style={{
                                        color: '#7ed4c6',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                    href="#"
                                    onClick={() => {
                                        const help = window.scrollY;
                                        this.setState({ secondDropdown: 'a' });
                                        setTimeout(
                                            () => window.scrollTo(0, help),
                                            0
                                        );
                                    }}
                                >
                                    <div className="text">Archive</div>
                                    <div className="text">></div>
                                </a>
                                <Popover
                                    placement="right"
                                    container={this}
                                    target={this.refs.target2}
                                    show={this.state.secondDropdown === 'a'}
                                    onHide={() =>
                                        this.setState({
                                            secondDropdown: '',
                                            dropdown: false
                                        })
                                    }
                                    style={{
                                        marginTop: '12vw',
                                        zIndex: 40,
                                        opacity: '1'
                                    }}
                                >
                                    {this.props.recipients.map(recipient => {
                                        return (
                                            <Link
                                                href={`/recipient/${recipient}`}
                                            >
                                                <a style={{ color: '#7ed4c6' }}>
                                                    <div className="text">
                                                        {recipient}
                                                    </div>
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </Popover>
                            </Popover>
                        </li>

                        {/* <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a
                                    className={
                                        this.props.page === 'm'
                                            ? 'active'
                                            : null
                                    }
                                    style={{ color: '#7ed4c6' }}
                                >
                                    <div
                                        style={{
                                            fontWeight: 'regular',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        className="text"
                                    >
                                        Hand Designs
                                    </div>
                                </a>
                            </Link>
                        </li> */}
                        {navlinks.map(link => {
                            return (
                                <li className="nav-item" style={styles.navlink}>
                                    <Link href={link.link}>
                                        <a style={{ color: '#7ed4c6' }}>
                                            <div className="text">
                                                {link.text}
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Box>
                <style jsx>{`
                    .text {
                        color: #416989;
                        font-weight: 500;
                    }
                    .text:hover {
                        color: #7ed4c6;
                        text-decoration: none;
                    }
                    .active {
                        color: #7ed4c6;
                        text-decoration: none;
                    }
                    ul {
                        list-style-type: none;
                    }
                `}</style>
            </Header>
        );
    }

    render() {
        return (
            <App style={{ maxWidth: '100vw' }}>
                <Article
                    style={{
                        maxWidth: '100vw',
                        padding: '0px'
                    }}
                >
                    {this.renderHeader()}

                    <div style={{ minHeight: '81vh' }}>
                        {this.props.children}
                    </div>

                    {this.renderFooter()}
                </Article>
            </App>
        );
    }
}

const navlinks = [
    { text: 'Hand Designs', link: '/hand-designs' },
    { text: 'Projects', link: '/' },
    { text: 'Gallery', link: '/gallery' },
    { text: 'Our Group', link: '/group' },
    { text: 'Contact', link: '/contact' }
];

const styles = {
    navlink: {
        margin: '6px 25px 0px 0px'
        //color: "#CCCCCC"
    },
    navBar: {
        borderWidth: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '10px'
    },
    search: {
        borderWidth: '0px',
        width: '20vw',
        marginRight: '3vw',
        height: '40px',
        marginTop: '10px',
        fontSize: '1.2vw'
    }
};

const mapStateToProps = state => {
    return {
        recipients: state.recipients
    };
};

export default connect(
    mapStateToProps,
    null
)(Layout);

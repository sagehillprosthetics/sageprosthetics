import Footer from 'grommet/components/Footer';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Actions';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';

import Link from 'next/link';

import React, { Component } from 'react';

class Layout extends Component {
    renderFooter() {
        return (
            <Footer
                justify="between"
                size="small"
                style={{ padding: '0% 1.5% 0% 1.5%' }}
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
                        <Anchor href="#">Privacy Policy</Anchor>
                        <Anchor href="#">Support</Anchor>
                        <Anchor href="#">Contact</Anchor>
                        <Anchor href="#">About</Anchor>
                    </Menu>
                </Box>
            </Footer>
        );
    }

    renderHeader() {
        return (
            <Header
                fixed={true}
                width="full"
                style={{ padding: '0% 1.5% 0% 1.5%', height: '7vw' }}
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
                            marginTop: '15px'
                        }}
                    >
                        <li className="nav-item" style={styles.navlink}>
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
                                        Recipients
                                    </div>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a style={{ color: '#7ed4c6' }}>
                                    <div className="text">Hand Designs</div>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a style={{ color: '#7ed4c6' }}>
                                    <div className="text">Projects</div>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a style={{ color: '#7ed4c6' }}>
                                    <div className="text">Gallery</div>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a style={{ color: '#7ed4c6' }}>
                                    <div className="text">Our Group</div>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <Link href="/">
                                <a style={{ color: '#7ed4c6' }}>
                                    <div className="text">Contact</div>
                                </a>
                            </Link>
                        </li>

                        <Menu
                            responsive={true}
                            label="Menu Demo"
                            style={{ background: 'white' }}
                        >
                            <Anchor href="#" className="active">
                                First action
                            </Anchor>
                            <Anchor href="#">Second action</Anchor>
                            <Anchor href="#">Third action</Anchor>
                        </Menu>
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

                    {this.props.children}

                    {this.renderFooter()}
                </Article>
            </App>
        );
    }
}

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

export default Layout;

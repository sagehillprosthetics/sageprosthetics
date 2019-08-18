import React, { Component } from 'react';
import Footer from 'grommet/components/Footer';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import { connect } from 'react-redux';
import { BrowserView, MobileView, isBrowser } from 'react-device-detect';

import '../styles.scss';
import DesktopHeader from '../components/Header';
import MobileHeader from '../components/MobileHeader';

class Layout extends Component {
    renderFooter() {
        console.log('browser');
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
                    <Paragraph margin="none">© 2019 Sage Prosthetics</Paragraph>
                    <Anchor href="/privacy-policy">Privacy Policy</Anchor>
                    <Anchor href="/contact">Contact</Anchor>
                    <Anchor href="/">About</Anchor>
                </Box>
            </Footer>
        );
    }

    renderMobileFooter() {
        console.log('Mobile');
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Box direction="row" align="center" justify="center">
                    <Paragraph margin="none">© 2019 Sage Prosthetics</Paragraph>
                    <Anchor href="/privacy-policy">Privacy Policy</Anchor>
                    <Anchor href="/contact">Contact</Anchor>
                    <Anchor href="/">About</Anchor>
                </Box>
            </div>
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
                    <BrowserView>
                        <DesktopHeader
                            recipients={this.props.recipients}
                            projects={this.props.projects}
                            page={this.props.page}
                            container={this}
                        />
                    </BrowserView>

                    <MobileView>
                        <MobileHeader
                            recipients={this.props.recipients}
                            projects={this.props.projects}
                            page={this.props.page}
                        />
                    </MobileView>

                    <div style={{ minHeight: isBrowser ? '81vh' : '60vh' }}>
                        {this.props.children}
                    </div>

                    <BrowserView>{this.renderFooter()}</BrowserView>
                    <MobileView>{this.renderMobileFooter()}</MobileView>
                </Article>
            </App>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipients: state.recipients,
        projects: state.projects,
        page: state.page
    };
};

export default connect(
    mapStateToProps,
    null
)(Layout);

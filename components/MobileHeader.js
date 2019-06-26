import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import MenuIcon from 'grommet/components/icons/base/Menu';
import CaretBackIcon from 'grommet/components/icons/base/CaretBack';
import Link from 'next/link';

class MobileHeader extends Component {
    state = {
        show: 0
    };

    archive = [];
    links = [];
    projects = [];

    componentDidMount() {
        if (this.props.recipients.links) {
            this.links = this.props.recipients.links.map(recipient => {
                return {
                    text: recipient,
                    link: `/recipient/${recipient}`,
                    page: recipient
                };
            });
        }
        this.links.push({ text: 'Archive', link: '#', page: '', onClick: 3 });
        if (this.props.recipients.archive) {
            this.archive = this.props.recipients.archive.map(recipient => {
                return {
                    text: recipient,
                    link: `/recipient/${recipient}`,
                    page: recipient
                };
            });
        }
        if (this.props.projects) {
            this.projects = this.props.projects.map(project => {
                return {
                    text: project,
                    link: `/projects/${project}`,
                    page: project
                };
            });
        }
    }

    renderPanel() {
        console.log(this.projects);

        let iterate = navlinks;
        if (this.state.show === 2) {
            iterate = this.links;
        } else if (this.state.show === 3) {
            iterate = this.archive;
        } else if (this.state.show === 4) {
            iterate = this.projects;
        }
        return (
            <div style={{ width: '100%' }}>
                {iterate.map(object => {
                    return (
                        <Link href={object.link} key={object.text} passHref>
                            <a
                                style={{ color: '#7ed4c6' }}
                                onClick={
                                    object.onClick
                                        ? () => this.setState({ show: object.onClick })
                                        : null
                                }
                            >
                                <div
                                    style={{
                                        fontSize: '300%',
                                        marginBottom: '2vh',
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                >
                                    {object.text}
                                </div>
                            </a>
                        </Link>
                    );
                })}
                <a
                    style={{ color: '#7ed4c6' }}
                    onClick={() => this.setState({ show: transform[this.state.show] })}
                >
                    <div
                        style={{
                            fontSize: '300%',
                            marginBottom: '2vh',
                            width: '100vw',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CaretBackIcon colorIndex="brand-accent-colors" />
                        <div>Go Back</div>
                    </div>
                </a>
            </div>
        );
    }

    render() {
        console.log(this.state.show);
        return (
            <div style={{ padding: '30px', height: '20vw', zIndex: 1, width: '100vw' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <a style={{ fontSize: '60px', margin: 0 }} href="/">
                            <img
                                src="/static/biglogo.png"
                                alt="logo"
                                style={{ height: '15vw', margin: '30px' }}
                            />
                        </a>
                        <MenuIcon
                            size="xlarge"
                            onClick={() => this.setState({ show: this.state.show === 0 ? 1 : 0 })}
                            colorIndex="brand"
                        />
                    </div>
                    {this.state.show !== 0 ? this.renderPanel() : null}
                </div>
            </div>
        );
    }
}

const transform = [0, 0, 1, 1, 2];

const navlinks = [
    { text: 'Recipients', link: '#', page: '', onClick: 2 },
    { text: 'Projects', link: '#', page: '', onClick: 4 },
    { text: 'Hand Designs', link: '/hand-designs', page: 'h' },
    { text: 'Gallery', link: '/gallery', page: 'g' },
    { text: 'Our Group', link: '/group', page: 't' },
    { text: 'Contact', link: '/contact', page: 'c' }
];

const styles = {
    navlink: {
        margin: '6px 25px 0px 0px',
        fontWeight: '500'
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

export default MobileHeader;

import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Popover from 'react-simple-popover';
import Title from 'grommet/components/Title';
import Link from 'next/link';

class DesktopHeader extends Component {
    state = {
        dropdown: '',
        secondDropdown: ''
    };

    render() {
        const { archive, links } = this.props.recipients;
        let archiveactive = false;

        console.log(this.state.dropdown);

        if (archive) {
            archive.forEach(recipient => {
                if (recipient === this.props.page) {
                    archiveactive = true;
                }
            });
        }

        let linksactive = archiveactive;
        if (links) {
            links.forEach(recipient => {
                if (recipient === this.props.page) {
                    linksactive = true;
                }
            });
        }

        let projectsactive = false;
        this.props.projects.forEach(project => {
            if (project === this.props.page) {
                projectsactive = true;
            }
        });

        console.log('Archive Active?', archiveactive);

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
                <Box flex={true} justify="end" direction="row" responsive={false}>
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
                                href="#!"
                                onClick={() =>
                                    this.setState({
                                        dropdown: 'r',
                                        secondDropdown: ''
                                    })
                                }
                            >
                                <div className={linksactive ? 'text active' : 'text'}>
                                    Recipients
                                </div>
                            </a>
                            <Popover
                                placement="bottom"
                                container={this.props.container}
                                target={this.refs.target}
                                show={this.state.dropdown === 'r'}
                                onHide={() =>
                                    this.setState({
                                        dropdown: false,
                                        secondDropdown: ''
                                    })
                                }
                                style={{
                                    marginTop: '5vh',
                                    zIndex: 40,
                                    opacity: '1'
                                    //position: 'absolute'
                                    //top: window.scrollY + 'px'
                                }}
                            >
                                <>
                                    {links
                                        ? links.map(recipient => {
                                              let text = 'text';
                                              if (recipient === this.props.page) {
                                                  text = 'text active';
                                              }
                                              return (
                                                  <Link
                                                      href={`/recipient/${recipient}`}
                                                      key={recipient}
                                                      passHref
                                                  >
                                                      <a
                                                          style={{
                                                              color: '#7ed4c6'
                                                          }}
                                                      >
                                                          <div className={text}>{recipient}</div>
                                                      </a>
                                                  </Link>
                                              );
                                          })
                                        : null}
                                    <a
                                        ref="target2"
                                        style={{
                                            color: '#7ed4c6',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                        href="#!"
                                        onClick={() => this.setState({ secondDropdown: 'a' })}
                                    >
                                        <div className={archiveactive ? 'text active' : 'text'}>
                                            Archive
                                        </div>
                                        <div
                                            style={{
                                                textDecoration: 'none',
                                                color: '#aaaaaa'
                                            }}
                                        >
                                            >
                                        </div>
                                    </a>

                                    <Popover
                                        placement="right"
                                        container={this.props.container}
                                        target={this.refs.target2}
                                        show={this.state.secondDropdown === 'a'}
                                        onHide={() =>
                                            this.setState({
                                                secondDropdown: '',
                                                dropdown: ''
                                            })
                                        }
                                        style={{
                                            marginTop: '16vh',
                                            zIndex: 40,
                                            opacity: '1'
                                        }}
                                    >
                                        <>
                                            {archive
                                                ? archive.map(recipient => {
                                                      let text = 'text';
                                                      if (recipient === this.props.page) {
                                                          archiveactive = true;
                                                          text = 'text active';
                                                      }
                                                      return (
                                                          <Link
                                                              href={`/recipient/${recipient}`}
                                                              key={recipient}
                                                              passHref
                                                          >
                                                              <a
                                                                  style={{
                                                                      color: '#7ed4c6'
                                                                  }}
                                                              >
                                                                  <div className={text}>
                                                                      {recipient}
                                                                  </div>
                                                              </a>
                                                          </Link>
                                                      );
                                                  })
                                                : null}
                                        </>
                                    </Popover>
                                </>
                            </Popover>
                        </li>

                        <li className="nav-item" style={styles.navlink}>
                            <a
                                ref="target3"
                                style={{ color: '#7ed4c6' }}
                                href="#!"
                                onClick={() => {
                                    const help = window.scrollY;
                                    this.setState({
                                        dropdown: 'p',
                                        secondDropdown: ''
                                    });
                                    setTimeout(() => window.scrollTo(0, help), 0);
                                }}
                            >
                                <div className={projectsactive ? 'text active' : 'text'}>
                                    Projects
                                </div>
                            </a>
                            <Popover
                                placement="bottom"
                                container={this.props.container}
                                target={this.refs.target3}
                                show={this.state.dropdown === 'p'}
                                onHide={() => {
                                    this.setState({
                                        dropdown: '',
                                        secondDropdown: ''
                                    });
                                }}
                                style={{
                                    marginTop: '5vh',
                                    zIndex: 40,
                                    opacity: '1'
                                }}
                            >
                                <>
                                    {this.props.projects.map(project => {
                                        let text = 'text';
                                        if (project === this.props.page) {
                                            text = 'text active';
                                        }
                                        return (
                                            <Link
                                                href={`/projects/${project}`}
                                                key={project}
                                                passHref
                                            >
                                                <a style={{ color: '#7ed4c6' }}>
                                                    <div className={text}>{project}</div>
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </>
                            </Popover>
                        </li>

                        {navlinks.map(link => {
                            return (
                                <li className="nav-item" style={styles.navlink} key={link.link}>
                                    <Link href={link.link} passHref>
                                        <a style={{ color: '#7ed4c6' }}>
                                            <div
                                                className={
                                                    this.props.page === link.page
                                                        ? 'text active'
                                                        : 'text'
                                                }
                                            >
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
                        text-decoration-color: #7ed4c6;
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
}

const navlinks = [
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

export default DesktopHeader;

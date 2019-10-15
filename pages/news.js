import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import firebase from 'firebase/app';
import 'firebase/database';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import NextSeo from 'next-seo';
import ReactPlayer from 'react-player';

import * as types from '../redux/types.js';

class News extends Component {
    static async getInitialProps({ req, query, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: 'n'
        });

        let db = firebase;

        const project = [];
        db.database()
            .ref('projects')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    project.push(child.key);
                });
            });

        const links = [];
        const archive = [];
        await db
            .database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    if (child.val().archive == true) {
                        archive.push(child.key);
                    } else {
                        links.push(child.key);
                    }
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: { links, archive }
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }

    state = {
        selectedImage: ''
    };

    renderNews() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100vw',
                    textAlign: 'center',
                    margin: this.props.desktop ? '20px 0 0 0' : '20vw 0 0 0'
                }}
            >
                <h3>
                    <a
                        href="https://www.hamilton.edu/news/story/3d-prosthetics-tanya-namad-lerch"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Because Hamiltonians Lend a Hand: Tanya Namad Lerch ’05
                    </a>
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: this.props.desktop ? 'row' : 'column',
                        justifyContent: 'space-around',
                        width: this.props.desktop ? '80vw' : '95vw',
                        alignItems: 'center'
                    }}
                >
                    {/* <ReactPlayer
                        width={this.props.desktop ? '35vw' : '85vw'}
                        height={this.props.desktop ? '35vh' : null}
                        controls
                        url="https://ns8-ns-twc-com.akamaized.net/news/CA/2019/02/PKG%20_2019021_3634813_20190219%20ZT%20HIGH%20SCHOOL%20PROSTHETICS%20DIRTY_2182019%208-40-18%20PM.mp4"
                    /> */}
                    <img
                        src="https://s3.amazonaws.com/mediacdn.hamilton.edu/images/base/nz76801jpg.jpg"
                        style={{ width: this.props.desktop ? '35vw' : '85vw', height: 'auto' }}
                        alt="Tanya Lerch"
                    />

                    <div
                        style={{
                            width: this.props.desktop ? '35vw' : '85vw',
                            textAlign: 'left'
                        }}
                    >
                        <div>
                            They can be pink and purple, or Superman red and blue, or have a Mickey
                            Mouse motif. With them a kid can high five a friend, ride a bike, or
                            play the ukulele in music class. Teacher Tanya Namad Lerch ’05 and her
                            high school student volunteers have made prosthetic hands that do all
                            those things using a 3D printer. They create the free, custom-designed
                            hands primarily for children and last school year delivered nine of
                            them.
                        </div>
                        <br />
                        <div>
                            Lerch teaches math at Sage Hill School in Orange County, Calif., where
                            she founded and advises Sage Prosthetics. It’s a chapter of e-NABLE, a
                            nonprofit that promotes using 3D printers and open-source designs to
                            cheaply and easily make prosthetic hands and arms. Lerch made hands even
                            before the Sage chapter, roughly 40 all told...
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        width: '80vw',
                        height: '1px',
                        borderRadius: '3px',
                        backgroundColor: '#212121',
                        margin: '50px 0 45px 0'
                    }}
                />

                <h3>
                    <a
                        href="https://spectrumnews1.com/ca/orange-county/news/2019/02/19/hand-in-hand"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        High School Senior Changing Lives With Prosthetics
                    </a>
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: this.props.desktop ? 'row' : 'column',
                        justifyContent: 'space-around',
                        width: this.props.desktop ? '80vw' : '95vw',
                        alignItems: 'center'
                    }}
                >
                    <ReactPlayer
                        width={this.props.desktop ? '35vw' : '85vw'}
                        height={this.props.desktop ? '35vh' : null}
                        controls
                        url="https://ns8-ns-twc-com.akamaized.net/news/CA/2019/02/PKG%20_2019021_3634813_20190219%20ZT%20HIGH%20SCHOOL%20PROSTHETICS%20DIRTY_2182019%208-40-18%20PM.mp4"
                    />
                    <div
                        style={{
                            width: this.props.desktop ? '35vw' : '85vw',
                            textAlign: 'left'
                        }}
                    >
                        <div>
                            LOS ANGELES, CA – A teen is lending a helping hand by creating
                            prosthetics for those in need.
                        </div>
                        <br />
                        <div>
                            The hand looks bionic and in many ways, it is. The bone structure is a
                            durable, but lightweight plastic and sinews braided fishing line. The
                            prosthetic hand was built by 17-year-old Karishma Raghuram.
                        </div>
                        <br />
                        <div>The intricate design means getting the fit just right.</div>
                        <br />
                        <div>
                            “We can do so many things with such little resources, and it’s amazing
                            to see that at such a young age where we’re able to contribute in such a
                            major way,” says Raghuram...
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        width: '80vw',
                        height: '1px',
                        borderRadius: '3px',
                        backgroundColor: '#212121',
                        margin: '50px 0 45px 0'
                    }}
                />
                <h3>
                    <a
                        href="https://abc7.com/science/cool-kid-karishma-raghuram-builds-prosthetic-limbs/5110086/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Cool Kid Karishma Raghuram builds prosthetic limbs for people in need
                    </a>
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: this.props.desktop ? 'row' : 'column',
                        justifyContent: 'space-around',
                        width: this.props.desktop ? '80vw' : '95vw',
                        alignItems: 'center'
                    }}
                >
                    <ReactPlayer
                        width={this.props.desktop ? '35vw' : '85vw'}
                        height={this.props.desktop ? '35vh' : null}
                        controls
                        url="https://res.cloudinary.com/sageprosthetics/video/upload/v1558071592/something.mov"
                    />

                    <div
                        style={{
                            width: this.props.desktop ? '35vw' : '85vw',
                            textAlign: 'left'
                        }}
                    >
                        <div>
                            NEWPORT BEACH, Calif. (KABC) -- Karishma Raghuram, 17, is a senior at
                            Sage Hill School in Newport Beach and a member of the schools'
                            prosthetic club.
                        </div>
                        <br />
                        <div>
                            She researches, troubleshoots and builds prosthetics for people in need.
                        </div>
                        <br />
                        <div>
                            "The intersection of science and technology with also community service
                            and helping others is just what makes this project unbelievably amazing
                            for everyone involved," Raghuram said.
                        </div>
                        <br />
                        <div>
                            {' '}
                            Since last year, she's already made and sent out three 3-D printed
                            prosthetic limbs to people all over the world. This year, she's building
                            a very special pink and blue arm for a local girl...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div style={{ margin: '0% 0% 0% 0%' }}>
                <NextSeo
                    config={{
                        title: 'News | Sage Prosthetics',
                        twitter: { title: 'News | Sage Prosthetics' },
                        openGraph: {
                            title: 'News | Sage Prosthetics'
                        }
                    }}
                />
                <h2 style={{ textAlign: 'center' }}>Sage Prosthetics in the News</h2>
                {this.renderNews()}
            </div>
        );
    }
}

export default News;

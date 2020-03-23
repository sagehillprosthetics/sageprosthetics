import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux';
import NextSeo from 'next-seo';
import ReactPlayer from 'react-player';
import Router from 'next/router';
import axios from 'axios';

import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';

import * as types from '../redux/types.js';
import ConfirmModal from '../components/ConfirmModal';

const cheerio = require('cheerio');

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
        db.database()
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

        const news = [];
        await db
            .database()
            .ref('news')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    news.push(child.val());
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
        store.dispatch({
            type: types.GET_NEWS,
            payload: news
        });
    }

    state = {
        url: '',
        src: '',
        text: '',
        title: '',
        video: false,
        uploadState: '',
        fetchState: false
    };

    componentDidMount() {
        this.database = firebase.database();
    }

    fetchInfo = async () => {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const data = await axios.get(this.state.url);

        const $ = cheerio.load(`<ul id="fruits">
        <li class="apple">Apple</li>
        <li class="orange">Orange</li>
        <li class="pear">Pear</li>
      </ul>`);
        console.log($('.apple', '#fruits').text());
        console.log(data);
    };

    addArticle = () => {
        const { url, src, title } = this.state;
        const text = this.state.text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length >= 1);
        const newArticle = { url, title, text };
        newArticle[this.state.video ? 'video' : 'image'] = src;
        this.updateFirebase('/' + this.props.news.length, newArticle);
    };

    removeArticle = key => {
        console.log(key);
        let newNews = this.props.news.filter((value, index) => index !== key);
        this.updateFirebase('', newNews);
    };

    updateFirebase = (item, value) => {
        this.setState({ uploadState: 'Processing...' });
        this.database
            .ref(`/news${item}`)
            .set(value)
            .then(() => {
                this.setState({
                    uploadState: 'Successfully Updated Database'
                });
                Router.replace(`/news`);
            })
            .catch(e => this.setState({ uploadState: `Error: ${e.message}` }));
    };

    renderFirebaseNews() {
        const renderedNews = [];
        this.props.news.map((article, key) => {
            if (key !== 0) {
                renderedNews.push(
                    <div
                        style={{
                            width: '80vw',
                            height: '1px',
                            borderRadius: '3px',
                            backgroundColor: '#212121',
                            margin: '50px 0 45px 0'
                        }}
                        id={key}
                    />
                );
            }
            renderedNews.push(
                <>
                    <h3>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
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
                        {article.image ? (
                            <img
                                src={article.image}
                                style={{
                                    width: this.props.desktop ? '35vw' : '85vw',
                                    height: 'auto'
                                }}
                                alt="Lexi Brooks"
                            />
                        ) : (
                            <ReactPlayer
                                width={this.props.desktop ? '35vw' : '85vw'}
                                height={this.props.desktop ? '35vh' : null}
                                controls
                                url={article.video}
                            />
                        )}

                        <div
                            style={{
                                width: this.props.desktop ? '35vw' : '85vw',
                                textAlign: 'left'
                            }}
                        >
                            {article.text.map((text, index) => (
                                <>
                                    {index != 0 ? <br /> : null}
                                    <div>
                                        {text}
                                        {index == article.text.length - 1 ? '...' : null}
                                    </div>
                                </>
                            ))}
                            {this.props.isAuthenticated ? (
                                <Button
                                    label="Remove Article"
                                    onClick={() => this.setState({ showModal: key })}
                                />
                            ) : null}
                            {this.state.uploadState}
                        </div>
                    </div>
                    <ConfirmModal
                        onToggleModal={() => this.setState({ showModal: '' })}
                        show={this.state.showModal === key}
                        onConfirm={() => this.removeArticle(key)}
                        message={`You are about to remove a news article. Are you sure?`}
                    />{' '}
                </>
            );
        });

        return renderedNews;
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
                    {this.renderFirebaseNews()}

                    {this.props.isAuthenticated ? (
                        <>
                            <div
                                style={{
                                    width: '80vw',
                                    height: '1px',
                                    borderRadius: '3px',
                                    backgroundColor: '#212121',
                                    margin: '50px 0 45px 0'
                                }}
                            />
                            <h3> Add News Article </h3>

                            <TextInput
                                placeHolder="Enter Article URL"
                                value={this.state.url}
                                onDOMChange={event => this.setState({ url: event.target.value })}
                                style={{ width: '40vw', margin: '-10px 0px 10px 0px' }}
                            />
                            {/* <Button label="Autofill Information" onClick={this.fetchInfo} /> */}
                            <div
                                style={{
                                    width: '100%',
                                    padding: '20px 20% 0% 20%',
                                    textAlign: 'left'
                                }}
                            >
                                <FormField label="Title" size="small" help="Required">
                                    <input
                                        style={{
                                            fontWeight: 'lighter',
                                            border: 'none'
                                        }}
                                        type="text"
                                        onChange={event =>
                                            this.setState({ title: event.target.value })
                                        }
                                    />
                                </FormField>
                                <FormField
                                    size="large"
                                    style={{ width: '100%' }}
                                    label="Text"
                                    help="Please put each paragraph on a new line"
                                >
                                    <textarea
                                        style={{
                                            fontWeight: 'lighter',
                                            height: '60%',
                                            resize: 'none',
                                            border: 'none'
                                        }}
                                        type="text"
                                        rows={10}
                                        onChange={event =>
                                            this.setState({ text: event.target.value })
                                        }
                                    />
                                </FormField>
                                <FormField label="Media URL" size="small" help="Required">
                                    <input
                                        style={{
                                            fontWeight: 'lighter',
                                            border: 'none'
                                        }}
                                        type="text"
                                        onChange={event =>
                                            this.setState({ src: event.target.value })
                                        }
                                    />
                                </FormField>
                                <FormField label="Media Type">
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            width: '100%'
                                        }}
                                    >
                                        <RadioButton
                                            label="Video"
                                            checked={this.state.video}
                                            onChange={() => this.setState({ video: true })}
                                        />
                                        <RadioButton
                                            label="Image"
                                            checked={!this.state.video}
                                            onChange={() => this.setState({ video: false })}
                                        />
                                    </div>
                                </FormField>
                            </div>
                            <Button
                                label="Submit"
                                onClick={
                                    this.state.title &&
                                    this.state.url &&
                                    this.state.src &&
                                    this.state.text
                                        ? this.addArticle
                                        : null
                                }
                                style={{ margin: '20px' }}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { news, isAuthenticated } = state;
    return { news, isAuthenticated };
};

export default connect(mapStateToProps, null)(News);

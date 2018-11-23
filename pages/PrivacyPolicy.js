import React, { Component } from 'react';
import * as types from '../redux/types.js';

import Paragraph from 'grommet/components/Paragraph';

class PrivacyPolicy extends Component {
    static async getInitialProps({ req, store }) {
        store.dispatch({
            type: types.CHANGE_PAGE,
            payload: '~'
        });

        const project = [];
        req.firebaseServer
            .database()
            .ref('projects')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    project.push(child.key);
                });
            });

        const links = [];
        await req.firebaseServer
            .database()
            .ref('recipients')
            .once('value')
            .then(datasnapshot => {
                datasnapshot.forEach(child => {
                    links.push(child.key);
                });
            });

        store.dispatch({
            type: types.GET_RECIPIENTS,
            payload: links
        });

        store.dispatch({
            type: types.GET_PROJECTS,
            payload: project
        });
    }

    render() {
        return (
            <div style={{ margin: '0 15% 0 15%' }}>
                <title> Privacy Policy | Sage Prosthetics </title>
                <h2 style={{ textAlign: 'center' }}> Privacy Policy </h2>
                <div>
                    This privacy policy has been compiled to better serve those
                    who are concerned with how their 'Personally identifiable
                    information' (PII) is being used online. PII, as used in US
                    privacy law and information security, is information that
                    can be used on its own or with other information to
                    identify, contact, or locate a single person, or to identify
                    an individual in context. Please read our privacy policy
                    carefully to get a clear understanding of how we collect,
                    use, protect or otherwise handle your Personally
                    Identifiable Information in accordance with our website.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    What personal information do we collect from the people that
                    visit our website?
                </h3>
                <div>
                    When filling out a contact form on our site, as appropriate,
                    you may be asked to enter your name, email address or other
                    details to help you with your experience.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    When do we collect information?
                </h3>
                <div>
                    We collect information from you when you fill out a contact
                    form or enter information on our site.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    How do we protect visitor information?
                </h3>
                <ul>
                    <li style={styles.list}>
                        {
                            'Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.'
                        }
                    </li>
                    <li style={styles.list}>
                        We use regular Malware Scanning.
                    </li>
                    <li style={styles.list}>
                        {
                            'We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.'
                        }
                    </li>
                </ul>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    Do we use 'cookies'?
                </h3>
                <div>
                    Yes. Cookies are small files that a site or its service
                    provider transfers to your computer's hard drive through
                    your Web browser (if you allow) that enables the site's or
                    service provider's systems to recognize your browser and
                    capture and remember certain information. They are also used
                    to help us understand your preferences based on previous or
                    current site activity, which enables us to provide you with
                    improved services. We also use cookies to help us compile
                    aggregate data about site traffic and site interaction so
                    that we can offer better site experiences and tools in the
                    future.
                    <br /> <br />
                    We use cookies to:
                </div>
                <ul>
                    <li style={styles.list}>
                        Compile aggregate data about site traffic and site
                        interactions in order to offer better site experiences
                        and tools in the future. We may also use trusted third
                        party services that track this information on our
                        behalf.
                    </li>
                    <li style={styles.list}>
                        You can choose to have your computer warn you each time
                        a cookie is being sent, or you can choose to turn off
                        all cookies. You do this through your browser (like
                        Internet Explorer) settings. Each browser is a little
                        different, so look at your browser's Help menu to learn
                        the correct way to modify your cookies.
                    </li>
                </ul>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    Third Party Disclosure
                </h3>
                <div>
                    We do not sell, trade, or otherwise transfer to outside
                    parties your personally identifiable information unless we
                    provide you with advance notice. This does not include
                    website hosting partners and other parties who assist us in
                    operating our website, conducting our business, or servicing
                    you, so long as those parties agree to keep this information
                    confidential. We may also release your information when we
                    believe release is appropriate to comply with the law,
                    enforce our site policies, or protect ours or others'
                    rights, property, or safety.
                    <br /> <br />
                    However, non-personally identifiable visitor information may
                    be provided to other parties for marketing, advertising, or
                    other uses.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    Third party links
                </h3>
                <div>
                    Occasionally, at our discretion, we may include or offer
                    third party products or services on our website. These third
                    party sites have separate and independent privacy policies.
                    We therefore have no responsibility or liability for the
                    content and activities of these linked sites. Nonetheless,
                    we seek to protect the integrity of our site and welcome any
                    feedback about these sites.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>Google</h3>
                <div>
                    We use Google Analytics on our website. <br /> <br />
                    <span style={{ fontWeight: '600' }}>
                        {' '}
                        We have implemented the following:{' '}
                    </span>
                    <br />
                    <ul>
                        <li style={styles.list}>
                            Demographics and Interests Reporting
                        </li>
                    </ul>
                    We along with third-party vendors, such as Google use
                    first-party cookies (such as the Google Analytics cookies)
                    and third-party cookies (such as the DoubleClick cookie) or
                    other third-party identifiers together. <br /> <br />
                    We use them to compile data regarding user interactions to
                    improve our site.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    California Online Privacy Protection Act
                </h3>
                <div>
                    CalOPPA is the first state law in the nation to require
                    commercial websites and online services to post a privacy
                    policy. The law's reach stretches well beyond California to
                    require a person or company in the United States (and
                    conceivably the world) that operates websites collecting
                    personally identifiable information from California
                    consumers to post a conspicuous privacy policy on its
                    website stating exactly the information being collected and
                    those individuals with whom it is being shared, and to
                    comply with this policy. - See more at:
                    http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
                    <br /> <br />
                    <span style={{ fontWeight: '600' }}>
                        According to CalOPPA we agree to the following:
                    </span>
                    <br /> <br />
                    Users can visit our site anonymously. <br /> <br />
                    Once this privacy policy is created, we will add a link to
                    it on our home page, or as a minimum on the first
                    significant page after entering our website. <br /> <br />
                    Our Privacy Policy link includes the word 'Privacy', and can
                    be easily be found on the page specified above. <br />{' '}
                    <br /> Users will be notified of any privacy policy changes:
                    <br />
                    <ul>
                        <li style={styles.list}>On our Privacy Policy Page</li>
                    </ul>{' '}
                    Users are able to change their personal information: <br />
                    <ul>
                        <li style={styles.list}>By emailing us</li>
                    </ul>
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    COPPA (Children Online Privacy Protection Act)
                </h3>
                <div>
                    When it comes to the collection of personal information from
                    children under 13, the Children's Online Privacy Protection
                    Act (COPPA) puts parents in control. The Federal Trade
                    Commission, the nation's consumer protection agency,
                    enforces the COPPA Rule, which spells out what operators of
                    websites and online services must do to protect children's
                    privacy and safety online. <br /> We do not specifically
                    market to children under 13.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    Fair Information Act
                </h3>
                <div>
                    The Fair Information Practices Principles form the backbone
                    of privacy law in the United States and the concepts they
                    include have played a significant role in the development of
                    data protection laws around the globe. Understanding the
                    Fair Information Practice Principles and how they should be
                    implemented is critical to comply with the various privacy
                    laws that protect personal information. <br /> <br />
                    <span style={{ fontWeight: '500' }}>
                        In order to be in line with Fair Information Practices
                        we will take the following responsive action, should a
                        data breach occur:
                    </span>
                    <ul>
                        <li style={styles.list}>
                            We will notify the users via in site notification
                            within 7 business days
                        </li>
                    </ul>
                    We also agree to the individual redress principle, which
                    requires that individuals have a right to pursue legally
                    enforceable rights against data collectors and processors
                    who fail to adhere to the law. This principle requires not
                    only that individuals have enforceable rights against data
                    users, but also that individuals have recourse to courts or
                    a government agency to investigate and/or prosecute
                    non-compliance by data processors.
                </div>

                <h3 style={{ fontWeight: '500', marginTop: '1em' }}>
                    CAN SPAM Act
                </h3>
                <div>
                    The CAN-SPAM Act is a law that sets the rules for commercial
                    email, establishes requirements for commercial messages,
                    gives recipients the right to have emails stopped from being
                    sent to them, and spells out tough penalties for violations.
                    <br /> <br />
                    <span style={{ fontWeight: '500' }}>
                        We collect your email address in order to:
                    </span>
                    <ul>
                        <li style={styles.list}>
                            Send information, respond to inquiries, and/or other
                            requests or questions.
                        </li>
                    </ul>
                    <span style={{ fontWeight: '500' }}>
                        To be in accordance with CANSPAM we agree to the
                        following:
                    </span>
                    <ul>
                        <li style={styles.list}>
                            NOT use false, or misleading subjects or email
                            addresses.
                        </li>
                        <li style={styles.list}>
                            Identify the message as an advertisement in some
                            reasonable way.
                        </li>
                        <li style={styles.list}>
                            Include the physical address of our business or site
                            headquarters.
                        </li>
                        <li style={styles.list}>
                            Monitor third party email marketing services for
                            compliance, if one is used.
                        </li>
                        <li style={styles.list}>
                            Honor opt-out/unsubscribe requests quickly.
                        </li>
                        <li style={styles.list}>
                            Allow users to unsubscribe by using the link at the
                            bottom of each email.
                        </li>
                    </ul>
                    <span style={{ fontWeight: '500' }}>
                        If at any time you would like to unsubscribe from
                        receiving future emails, you can email us at
                    </span>
                    <ul>
                        <li style={styles.list}>
                            Follow the instructions at the bottom of each email.
                        </li>
                    </ul>
                    and we will promptly remove you from{' '}
                    <span style={{ fontWeight: '500' }}>ALL</span>{' '}
                    correspondence.
                </div>
            </div>
        );
    }
}

const styles = {
    list: { maxWidth: '100%', fontWeight: '400' }
};

export default PrivacyPolicy;

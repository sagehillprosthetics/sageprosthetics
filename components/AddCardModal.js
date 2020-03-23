import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const ImageModal = props => {
    if (props.show) {
        return (
            <React.Fragment>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        backgroundColor: '#999999',
                        opacity: '0.75',

                        zIndex: 100,
                        left: '0',
                        top: '0'
                    }}
                    onClick={props.onToggleModal}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        zIndex: 150,
                        left: '0',
                        top: '0'
                    }}
                    onClick={props.onToggleModal}
                >
                    <Image
                        cloudName="sageprosthetics"
                        publicId={props.src}
                        width="1000"
                        height="750"
                        style={{
                            marginTop: 50 + window.scrollY + 'px',
                            zIndex: 200
                            //opacity: '1'
                        }}
                        //crop="scale"
                    />
                </div>
            </React.Fragment>
        );
    }

    return null;
};

export default ImageModal;

import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Person = props => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: props.horizontal ? 'row' : 'column',
                alignItems: 'center',
                margin: '1%'
            }}
            onClick={props.onClick}
        >
            <Image
                cloudName="sageprosthetics"
                publicId={props.src}
                width="150"
                //crop="scale"
            >
                <Transformation
                    width="1000"
                    height="1000"
                    gravity="face"
                    radius="500"
                    crop="thumb"
                />
            </Image>
            <div style={{ textAlign: 'center' }}>
                <h4
                    style={{
                        fontWeight: '600',
                        textAlign: 'center',
                        margin: '20px',
                        width: '150px'
                    }}
                >
                    {props.name}
                </h4>
                {props.faculty ? <h5> Faculty Advisor </h5> : null}
            </div>
        </div>
    );
};

export default Person;

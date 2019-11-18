import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import Button from 'grommet/components/Button';

const Person = props => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: props.horizontal ? 'row' : 'column',
                alignItems: 'center',
                margin: '1%',
                ...props.style
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
                {props.faculty ? <h5 style={{ marginTop: '-10px' }}> Faculty Advisor </h5> : null}
                {props.faculty && !props.horizontal ? (
                    <Button plain={true} onClick={props.onClick} style={{ marginTop: '-15px' }}>
                        {' '}
                        View Bio{' '}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default Person;

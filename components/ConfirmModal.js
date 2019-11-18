import React from 'react';
import Button from 'grommet/components/Button';

const ConfirmModal = props => {
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
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '0'
                    }}
                    //onClick={props.onToggleModal}
                >
                    <div
                        style={{
                            height: '30vh',
                            width: '30vw',
                            marginTop: 150 + window.scrollY + 'px',
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            boxShadow: 'true',
                            padding: '2%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            zIndex: 300
                        }}
                        onClick={event => event.preventDefault()}
                    >
                        <h3 style={{ textAlign: 'center' }}> Warning! </h3>
                        <h6>{props.message}</h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: '100%',
                                height: '500px'
                            }}
                        >
                            <Button label="No" onClick={props.onToggleModal} secondary={true} />
                            <Button
                                label="Yes"
                                onClick={() => {
                                    props.onToggleModal();
                                    props.onConfirm();
                                }}
                                accent={true}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return null;
};

export default ConfirmModal;

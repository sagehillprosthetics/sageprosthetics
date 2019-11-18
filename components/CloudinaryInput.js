import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import cloudinaryKeys from '../cloudinarykeys.json';

class CloudinaryInput extends Component {
    static defaultProps = {
        label: 'Upload Image to Cloudinary'
    };

    processCloudinaryResult = (error, results) => {
        if (results) {
            const result = results[0];
            const { secure_url, public_id, path } = result;
            this.props.onUploadSuccess({ url: secure_url, id: path, public_id });
        }
    };

    openCloudinaryUploader = () => {
        const { cloud_name, upload_preset } = cloudinaryKeys;
        cloudinary.openUploadWidget(
            { cloud_name, upload_preset: upload_preset },
            this.processCloudinaryResult
        );
    };

    render() {
        return (
            <div className="cloudinary-input">
                <Button
                    label={this.props.label}
                    onClick={this.openCloudinaryUploader}
                    style={this.props.style}
                />
            </div>
        );
    }
}

export default CloudinaryInput;

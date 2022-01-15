import React, { Component } from 'react';
import Button from 'grommet/components/Button';

class CloudinaryInput extends Component {
    static defaultProps = {
        label: 'Upload Image to Cloudinary',
    };

    processCloudinaryResult = (error, results) => {
        if (results) {
            const result = results[0];
            const { secure_url, public_id, path } = result;
            this.props.onUploadSuccess({ url: secure_url, id: path, public_id });
        }
    };

    openCloudinaryUploader = () => {
        cloudinary.openUploadWidget(
            {
                cloud_name: 'sageprosthetics', 
                upload_preset: 'preset1'
            },
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

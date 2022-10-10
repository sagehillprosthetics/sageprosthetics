import React, { Component } from 'react';
import Button from 'grommet/components/Button';

class CloudinaryInput extends Component {
    static defaultProps = {
        label: 'Upload Image to Cloudinary',
    };

    processCloudinaryResult = (error, results) => {
        if (typeof results.info.secure_url !== 'undefined') {
            const result = JSON.parse(JSON.stringify(results)).info;
            const secure_url = result.secure_url;
            const public_id = result.public_id;
            const path = result.path;
            this.props.onUploadSuccess({ url: secure_url, id: path, public_id });
        }
    };

    openCloudinaryUploader = () => {
        cloudinary.openUploadWidget(
            {
                cloudName: "sageprosthetics", 
                uploadPreset: "preset1",
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

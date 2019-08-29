import React from 'react';
import Image from './image';
import axios from 'axios';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image_object: null,
            image_object_details: null,
            active_type: null
        }
        this.updateImageObject = this.updateImageObject.bind(this);
        this.clearImage = this.clearImage.bind(this);
        this.processImageObject = this.processImageObject.bind(this);
    }


    updateImageObject(e) {
        const file  = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({image_object: reader.result, image_object_details: {}, active_type: null
            });
        };
 }

 processImageObject(type) {

    this.setState({ active_type: type}, () => {

        if (!this.state.image_object_details[this.state.active_type]) {
            axios.post('/api/detect_image_objects', {
                type,
                data: this.state.image_object
            }).then((response) => {
                const filtered_data = response;
                const image_details = this.state.image_object_details;
                image_details[response.data.type] = filtered_data.data;
                this.setState({image_object_details: image_details });
            });
        }
    });
}

clearImage(){
    this.setState({img: null})
}

render() {
    return (
        <div id= "input">
            {this.state.image_object ? <Image props = {this.props} image = {this.state.image_object} clearImage = {this.clearImage} processImageObject = {this.processImageObject} imageDetails = {this.state.image_object_details} /> : null }
                <input type="file" accept="image/jpeg" onChange={(e) =>  this.updateImageObject(e)} />
        </div>
        )
    }
}


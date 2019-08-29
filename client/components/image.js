import React from 'react';

class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            imageDetails: null
        }
    }

    componentDidMount(){
        this.setState({image: this.props.image, imageDetails: this.props.imageDetails})
    }

    componentDidUpdate(prevProps){
        if (this.props.image !== prevProps.image || this.props.image === null){
            this.setState({ image: this.props.image, imageDetails: this.props.imageDetails   });
        }
    }

    render(){
        return (
        <div id = "image">
            {
                <img type = "image" style = {{height: 600, width: 400}} src = {this.state.image} />
            }
            { this.props.image && <button type = "button" onClick={() => this.props.processImageObject('imagenet')} variant="contained" color="primary">
                Get Prediction
                                  </button>
        }
        { this.state.imageDetails && this.state.imageDetails.hasOwnProperty('imagenet') ? <p> Imagenet predicted that your image is most likely: {this.state.imageDetails.imagenet.data[0].className} with a probability of {Math.ceil(this.state.imageDetails.imagenet.data[0].probability * 100)}%</p> : null}
        </div>
    )
}
}

export default Image;

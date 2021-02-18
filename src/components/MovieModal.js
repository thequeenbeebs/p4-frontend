import React from 'react';

class MovieModal extends React.Component {
    state = {
        show: this.props.show
    }

    handleClick = () => {
        this.setState({show: false})
    }

    render() {
        return (
            <div className="modal" >
                <div className="modal-content">
                <span className="close-btn"
                    onClick={this.props.exitModal}>&times;</span>
                <p>{this.props.movie.title}</p>
                </div>
            </div>
        )
    }
}

export default MovieModal; 

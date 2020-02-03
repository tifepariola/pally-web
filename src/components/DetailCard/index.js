import React, { Component } from 'react';


class DetailCard extends Component {

    render () {
        return (
            <div>
                <h5 className=" text-muted font-weight-normal">{this.props.title}</h5>
                <h3 className="mb-2 mt-0 mx-0">{this.props.value}</h3>
            </div>
        );
    }
}

DetailCard.propTypes = {
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
};

export default DetailCard;

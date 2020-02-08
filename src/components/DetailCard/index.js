import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default DetailCard;

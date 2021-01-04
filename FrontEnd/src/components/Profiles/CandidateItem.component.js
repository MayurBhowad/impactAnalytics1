import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { candidateSelection } from '../../redux/actions/getCandidates.action';


export class CandidateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            Image: '',
            isSelected: false
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.candidate.id,
            name: this.props.candidate.name,
            Image: this.props.candidate.Image,
            isSelected: false,
        })
    }

    onSelected = e => {
        let data = {
            ...this.state,
            isSelected: true
        };
        this.props.candidateSelection(data)
    }
    onRejected = e => {
        let data = {
            ...this.state,
            isSelected: false
        };
        this.props.candidateSelection(data)
    }
    render() {
        const { candidate } = this.props

        return (
            <div key={candidate.id} className="col mb-4">
                <div className={
                    (candidate.isSelected === undefined) ? 'card' : (candidate.isSelected === true) ? ('card selected') : ('card rejected')
                }>
                    <Link to={`/profile/${candidate.id}`} style={{ textDecoration: 'none' }} >
                        <img className="card-img-top" src={candidate.Image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Id: {candidate.id}</h5>
                            <p className="card-text">Name: {candidate.name}</p>
                        </div>
                    </Link>
                    <div className="btns">
                        <button className="btn btn-success" hidden={candidate.isSelected && candidate.isSelected !== undefined} onClick={e => this.onSelected(e)} >Select</button>
                        <button className="btn btn-danger" hidden={!candidate.isSelected && candidate.isSelected !== undefined} onClick={e => this.onRejected(e)} >Reject</button>
                    </div>
                </div>
            </div>
        )
    }
}

CandidateItem.propTypes = {
    candidate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    candidate: state.candidate
})

export default connect(mapStateToProps, { candidateSelection })(CandidateItem);
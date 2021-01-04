import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCandidateById, candidateSelection } from '../../redux/actions/getCandidates.action';
import Spinner from '../common/Spinner';

export class Profile extends Component {


    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getCandidateById(this.props.match.params.id)
        }
    }

    onSelected = e => {
        let data = {
            ...this.props.candidate.candidate,
            isSelected: true
        };
        this.props.candidateSelection(data)
    }
    onRejected = e => {
        let data = {
            ...this.props.candidate.candidate,
            isSelected: false
        };
        this.props.candidateSelection(data)
    }
    render() {
        const { candidate, candidates, loading } = this.props.candidate;
        let profileWindow;
        if (candidate === null || loading) {
            profileWindow = <Spinner />
        } else {
            if (candidate) {
                profileWindow = (
                    <div className="profile-window">
                        <div className="img">
                            <img className="img-thumbnail"
                                src={candidate.Image} alt="" />
                        </div>
                        <div className="info">
                            <div className="tag">
                                <div className="alert alert-success" hidden={candidate.isSelected === false || candidate.isSelected === undefined} role="alert">
                                    Candidate is Selected
                                </div>
                                <div class="alert alert-danger" hidden={candidate.isSelected === true || candidate.isSelected === undefined} role="alert">
                                    Candidate is Rejected
                                </div>
                            </div>
                            <div className="details">
                                <h1>User Id: {candidate.id}</h1>
                                <h1>Name: {candidate.name}</h1>
                            </div>
                            <div className="btns">
                                <button className="btn btn-success" hidden={candidate.isSelected && candidate.isSelected !== undefined} onClick={e => this.onSelected(e)} >Select</button>
                                <button className="btn btn-danger" hidden={!candidate.isSelected && candidate.isSelected !== undefined} onClick={e => this.onRejected(e)} >Reject</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                profileWindow = <p>Not found!</p>
            }
        }
        return (
            <div className="container profile-container">
                <Link to="/"><button className="btn btn-primary">
                    Go Back
                </button></Link>
                <div className="title">
                    <h1>Candidate Profile</h1>
                </div>
                <hr />
                { profileWindow}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    candidate: state.candidate
}
)
export default connect(mapStateToProps, { getCandidateById, candidateSelection })(Profile)

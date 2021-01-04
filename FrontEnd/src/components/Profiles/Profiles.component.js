import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import Spinner from '../common/Spinner';
import { getAllCandidates, candidateSelection } from '../../redux/actions/getCandidates.action';
import { Link } from 'react-router-dom';

import { CandidateItem } from './CandidateItem.component';
import Spinner from '../common/Spinner';

export class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: []
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    componentDidMount() {
        this.props.getAllCandidates();
    }
    handleOnChange(e) {
        this.setState({ query: e.target.value });
    }

    render() {

        const { candidates, loading } = this.props.candidate;
        let candidateItems;
        let filteredArray = []
        if (candidates === null || loading) {
            candidateItems = <Spinner />;
        } else {
            if (candidates.length > 0) {

                const filteredArrayPromise = new Promise((resolve, reject) => {
                    let lenght = candidates.length
                    candidates.map((candidate, index) => {
                        let name = candidate.name;
                        if (name.includes(_.capitalize(this.state.query))) {
                            filteredArray.push(candidate)
                        }
                        if (index + 1 >= lenght) { resolve() }
                    });
                })
            } else {
                candidateItems = (<h4>No profile found...</h4>)
            }
        }

        return (
            <div className="container profile-container">
                <h1 className="display text-center">All Candidates</h1>
                <hr />
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Name</span>
                    </div>
                    {/* <input type="text" name="query" placeholder="type" onChange={this.handleOnChange} /> */}
                    <input type="text" name="query" class="form-control" placeholder="Search..." aria-label="query" aria-describedby="basic-addon1" onChange={this.handleOnChange} />
                </div>
                <hr />
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {/* {candidateItems} */}
                    {filteredArray.map(candidate => (
                        <CandidateItem key={candidate.id} candidate={candidate} />
                    ))}

                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getAllCandidates: PropTypes.func.isRequired,
    candidate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    candidate: state.candidate
})

export default connect(mapStateToProps, { getAllCandidates, candidateSelection })(Profiles);



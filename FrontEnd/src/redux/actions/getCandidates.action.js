import { GET_CANDIDATE, GET_CANDIDATES, LOADING, SELECTED, REJECTED } from '../types.redux';
const axios = require('axios');


// get All candidate
export const getAllCandidates = () => dispatch => {
    dispatch({ type: LOADING });
    axios.get('/candidate/all_candidates')
        .then(ress => {
            dispatch({
                type: GET_CANDIDATES,
                payload: ress.data
            })
        })
        .catch(err => console.log(err))
}

// get candidate by id
export const getCandidateById = (can_id) => dispatch => {
    dispatch({ type: LOADING });
    axios.get(`/candidate/get_candidate/${can_id}`)
        .then(ress => {
            dispatch({
                type: GET_CANDIDATE,
                payload: ress.data
            })
        })
        .catch(err => console.log(err))
}

//canditate selection
export const candidateSelection = (data, history) => dispatch => {
    dispatch({ type: LOADING });
    axios.post('/candidate/selection', data)
        .then(ress => {
            dispatch({
                type: SELECTED,
                payload: ress.data
            })

        })
        .catch(err => console.log(err))
}
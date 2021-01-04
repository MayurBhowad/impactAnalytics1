import { LOADING, GET_CANDIDATES, GET_CANDIDATE, SELECTED, REJECTED } from '../types.redux';

const initialState = {
    candidate: null,
    candidates: null,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_CANDIDATES:
            return {
                ...state,
                candidates: action.payload,
                loading: false
            }
        case GET_CANDIDATE:
            return {
                ...state,
                candidate: action.payload,
                loading: false
            }
        case SELECTED:
            return {
                ...state,
                candidate: action.payload,
                candidates: state.candidates.map(el => el.id === action.payload.id ?
                    { ...el, isSelected: action.payload.isSelected } : el),
                loading: false
            }

        default:
            return state;
    }
}
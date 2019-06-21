/**
 * ACTION TYPES
 */
const ADD_TRAVELED = 'ADD_TRAVELED'
const REMOVE_TRAVELED = 'REMOVE_TRAVELED'

/**
 * INITIAL STATE
 */

const initialState = {
  data: {
    USA: {fillKey: 'filled'}
  }
}

/**
 * ACTION CREATORS
 */

export const addTraveledAction = countryId => ({
  type: ADD_TRAVELED,
  countryId
})
export const removeTraveledAction = countryId => ({
  type: REMOVE_TRAVELED,
  countryId
})

/**
 * THUNK CREATORS
 */

// export const addTraveledThunk = id => {
//   console.log('runningThunk')
//   return dispatch => {
//     try {
//       dispatch(addTraveledAction(id))
//     } catch (error) {
//       console.error(error.stack)
//     }
//   }
// }
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TRAVELED:
      return {
        data: {
          ...state.data,
          [action.countryId]: {fillKey: 'filled'}
        }
      }
    case REMOVE_TRAVELED:
      delete state.data[action.countryId]
      return {
        data: {...state.data}
      }
    //   case GET_ALL_TRAVELED:
    //     return {
    //       ...state,
    //       data: {...action.data}
    //     }
    default:
      return state
  }
}

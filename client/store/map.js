import axios from 'axios'
/**
 * ACTION TYPES
 */

const ADDED_TRAVELED = 'ADD_TRAVELED'
const REMOVED_TRAVELED = 'REMOVE_TRAVELED'
const FOUND_STARTING_COUNTRY = 'FOUND_STARTING_COUNTRY'
const DECREASED_GUESSES = 'DECREASED_GUESSES'
const CLEAR = 'CLEAR'

/**
 * INITIAL STATE
 */

const initialState = {
  data: {},
  guessed: [],
  target: {},
  remaingGuesses: Number(6)
}

/**
 * ACTION CREATORS
 */

export const addTraveledAction = country => ({
  type: ADDED_TRAVELED,
  country
})
export const removeTraveledAction = countryId => ({
  type: REMOVED_TRAVELED,
  countryId
})

export const findStartingCountry = country => ({
  type: FOUND_STARTING_COUNTRY,
  country
})
export const decreaseGuesses = () => ({
  type: DECREASED_GUESSES
})
export const clearAction = () => ({
  type: CLEAR
})
/**
 * THUNK CREATORS
 */

export const findStartingCountryThunk = () => async dispatch => {
  try {
    let randomCountryId = Math.floor(Math.random() * 4)
    const {data} = await axios.get(`/api/countries/${randomCountryId}`)
    dispatch(findStartingCountry(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_TRAVELED:
      console.log('country in added travel', action.country.properties.name)
      return {
        ...state,
        data: {
          ...state.data,
          [action.country.id]: {fillKey: 'filled'}
        },
        guessed: [...state.guessed, action.country.properties.name]
      }
    case REMOVED_TRAVELED:
      state.data[action.countryId] = {fillKey: 'defaultFill'}
      return {
        ...state,
        data: {...state.data}
      }
    case DECREASED_GUESSES:
      let updatedGuesses = state.remaingGuesses - 1
      return {
        ...state,
        remaingGuesses: updatedGuesses
      }
    case FOUND_STARTING_COUNTRY:
      return {
        ...state,
        target: {...action.country}
      }
    case CLEAR:
      return {
        data: {},
        guessed: [],
        target: {},
        remaingGuesses: Number(6)
      }

    default:
      return state
  }
}

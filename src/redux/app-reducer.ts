import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType, PropertiesTypes } from "./store";

let initialState = {
    initialized: false,
    isError: false,
    errorMessage: null as string | null
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        case 'SET_IS_ERROR':
            return {
                ...state,
                isError: action.isError
            };
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                isError: action.isError,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>


export const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),
    setIsError: (isError: boolean) => ({ type: 'SET_IS_ERROR', isError } as const),
    setError: (isError: boolean, errorMessage: string) => ({ type: 'SET_ERROR_MESSAGE', isError, errorMessage } as const)
}

export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    })
}

export default appReducer;
import * as AuthActions from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    token: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
        case AuthActions.SIGNUP:
        debugger;
            return {
                ...state,
                isAuthenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null
            };
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;

    }
}

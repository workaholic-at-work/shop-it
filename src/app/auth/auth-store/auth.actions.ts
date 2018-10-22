import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SIGNUP = 'SIGNUP';
export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_LOGIN = 'DO_LOGIN';

export class LoginAction implements Action {
    readonly type = LOGIN;
}

export class LogoutAction implements Action {
    readonly type = LOGOUT;
}

export class SignupAction implements Action {
    readonly type = SIGNUP;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export class DoSignup implements Action {
    readonly type = DO_SIGNUP;

    constructor(public payload: {username: string, password: string}) {}
}

export class DoLogin implements Action {
    readonly type = DO_LOGIN;

    constructor(public payload: {username: string, password: string}) {}
}

export type AuthActions =
    LoginAction |
    LogoutAction |
    SignupAction |
    SetToken |
    DoSignup |
    DoLogin;


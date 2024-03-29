import {takeLatest, put, all, call} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from './user.action';
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInEmailPassword, signOutUser, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth,userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth,userAuth);
    } catch(error) {
       yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// google sign in
export function* signInWithGoogle() {
    try {
        const googleAuth = yield call(signInWithGooglePopup);
        const googleAuthUser = googleAuth.user;
        if(!googleAuthUser) return;
        yield call(getSnapshotFromUserAuth,googleAuthUser);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

// email & password sign in
export function* signInWithEmail(data) {
    try {
        const {email, password} = data.payload;
        const userSnapshot = yield call(signInEmailPassword,email,password);
        const user = userSnapshot.user;
        if(!user) return;
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}


// log out saga

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailed(error));
    }
}

// sign up logic


export function* signUp({payload: {email,password, displayName}}) {

    try {
        const {user}  = yield call(createAuthUserWithEmailAndPassword,email,password);
        if(!user) return;
        yield put(signUpSuccess(user,{displayName}));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth,user,additionalDetails);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignInWithGoogleStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* onSignInWithEmailStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onSignInWithGoogleStart), 
        call(onSignInWithEmailStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ]);
}
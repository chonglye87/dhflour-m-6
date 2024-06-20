import {Swagger} from 'src/utils/API';

import {setSession} from './utils';
import {customError} from "../../../utils/error";
import {setAccessToken} from "../../../utils/auth";

import type {RequestSignUp, AuthenticationRequest} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------


/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({email, password}: AuthenticationRequest): Promise<void> => {
  try {
    const data = {
      email,
      password,
    };
    const response = await Swagger.api.authAccessToken(data)

    const {accessToken} = response.data;

    // 토큰 담기
    setAccessToken(accessToken);

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

  } catch (error) {
    console.error('Error during sign in:', error);
    throw customError(error);
    // throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async (userJoin: RequestSignUp): Promise<void> => {
  console.log(
    userJoin,'userJoin'
  )
  try {
    const response = await Swagger.api.signUp(userJoin);

    const {accessToken} = response.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    // 토큰 담기
    setAccessToken(accessToken);

  } catch (error) {
    console.error('Error during sign up:', error);
    throw customError(error);
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

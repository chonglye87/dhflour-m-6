import {Swagger} from 'src/utils/API';
import axios, {endpoints} from 'src/utils/axios';

import {setSession} from './utils';
import {STORAGE_KEY} from './constant';
import {customError} from "../../../utils/error";
import {setAccessToken} from "../../../utils/auth";

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};


/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({email, password}: SignInParams): Promise<void> => {
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
export const signUp = async ({
                               email,
                               password,
                               firstName,
                               lastName,
                             }: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const {accessToken} = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
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

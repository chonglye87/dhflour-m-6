// eslint-disable-next-line import/no-cycle
import {Swagger} from 'src/utils/API';

import {customError} from "../../../utils/error";
import {setAccessToken, removeAccessToken} from "./utils";

import type {RequestSignUp, AuthenticationRequest} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------


/** **************************************
 * Sign in (로그인)
 *************************************** */
export const signInWithPassword = async ({email, password}: AuthenticationRequest): Promise<void> => {
  try {
    // 서버로 보낼 데이터 객체 생성
    const data = {
      email,
      password,
    };
    // 서버에 로그인 요청을 보내고 응답을 기다림
    const response = await Swagger.api.authAccessToken(data)
    // 응답에서 액세스 토큰을 추출
    const {accessToken} = response.data;

    // 액세스 토큰을 설정
    setAccessToken(accessToken);

    // 액세스 토큰이 없는 경우 오류를 발생시킴
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
 * Sign up (회원가입)
 *************************************** */
export const signUp = async (userJoin: RequestSignUp): Promise<void> => {
  console.log(
    userJoin, 'userJoin'
  )
  try {
    // 서버에 회원가입 요청을 보내고 응답을 기다림
    const response = await Swagger.api.signUp(userJoin);
    // 응답에서 액세스 토큰을 추출
    const {accessToken} = response.data;
    // 액세스 토큰이 없는 경우 오류를 발생시킴
    if (!accessToken) {
      throw new Error('Access token not found in response');
    }
    // 액세스 토큰을 설정
    setAccessToken(accessToken);

  } catch (error) {
    console.error('Error during sign up:', error);
    throw customError(error);
  }
};

/** **************************************
 * Sign out (로그아웃)
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    // 액세스 토큰을 제거
    removeAccessToken()
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

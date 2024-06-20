import Cookies from 'js-cookie';

// eslint-disable-next-line import/no-cycle
import {Axios} from "./API";
import {CONFIG} from "../config-global";
// ----------------------------------------------------------------------

// 토큰 가져오기
export function getAccessToken() {
  return Cookies.get(CONFIG.auth.accessTokenName as string);
}

export function getRefreshToken() {
  return Cookies.get(CONFIG.auth.refreshTokenName as string);
}

// 토큰 저정하기
export function setAccessToken(accessToken: string | null) {
  console.log('accessToken',accessToken)
  if (accessToken) {
    Cookies.set(
      CONFIG.auth.accessTokenName as string,
      accessToken,
    );

    Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    removeAccessToken();
    delete Axios.defaults.headers.common.Authorization;
  }
}

export function setRefreshToken(refreshToken: string | null) {
  if (refreshToken) {
    // refreshToken 유효기간 끝나면 토큰 삭제하기
    const tokenExpired = isTokenExpired(refreshToken);
    if (tokenExpired) {
      removeAccessToken();
      removeRefreshToken();
    } else {
      Cookies.set(
        CONFIG.auth.refreshTokenName as string,
        refreshToken,
      );
    }
  } else {
    removeRefreshToken();
  }
}

// 토큰 제거
export function removeAccessToken() {
  Cookies.remove(CONFIG.auth.accessTokenName as string, {
    path: '/',
  });
}

export function removeRefreshToken() {
  Cookies.remove(CONFIG.auth.refreshTokenName  as string, {
    path: '/',
  });
}

// 토큰 기간 확인
export function isTokenExpired(token: string) {
  try {
    const decodedToken = atob(token.split('.')[1]);
    const tokenData = JSON.parse(decodedToken);
    if (!tokenData || !tokenData.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000)
    return tokenData.exp < currentTime;
  } catch (error) {
    return true;
  }
}


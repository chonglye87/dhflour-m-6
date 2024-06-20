import Cookies from 'js-cookie';

// eslint-disable-next-line import/no-cycle
import {Axios} from "../../../utils/API";
import {CONFIG} from "../../../config-global";

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
  if (accessToken) {
    Cookies.set(
      CONFIG.auth.accessTokenName as string,
      accessToken,
    );
    // Axios 기본 헤더에 액세스 토큰 설정
    Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    // 액세스 토큰이 없으면 쿠키와 Axios 헤더에서 제거
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
    // 토큰을 디코딩하여 만료 시간을 확인
    const decodedToken = atob(token.split('.')[1]);
    const tokenData = JSON.parse(decodedToken);
    if (!tokenData || !tokenData.exp) {
      return true;
    }
    // 현재 시간과 토큰 만료 시간 비교
    const currentTime = Math.floor(Date.now() / 1000)
    return tokenData.exp < currentTime;
  } catch (error) {
    // 토큰이 유효하지 않으면 만료된 것으로 간주
    return true;
  }
}


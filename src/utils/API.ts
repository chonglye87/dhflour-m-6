import axios from "axios";

// config
import {CONFIG} from "../config-global";
import {Api} from "../generated/swagger/swagger.api";
// eslint-disable-next-line import/no-cycle
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken, setRefreshToken,
  removeAccessToken,
  removeRefreshToken
} from "./auth";

// ----------------------------------------------------------------------
// JWT 인증이 필요한 경우 아래와 같은 보안 작업자(securityWorker) 함수를 작성할 수 있습니다.
// 이 함수는 JWT 토큰을 인증 헤더에 추가하는 역할을 합니다.
// const securityWorker = async (securityData: string | null) => {
//   console.log(securityData, 'securityData');
//   if (securityData) {
//     return {
//       headers: {
//         Authorization: `Bearer ${securityData}`,
//       },
//     };
//   }
// };

// API 클래스 생성
const swagger = new Api({
  baseURL: CONFIG.site.apiURL,
  secure: true, // API 요청에 보안 작업자를 사용하려면 이 값을 true로 설정하세요.
});

// 응답 인터셉터
swagger.instance.interceptors.response.use(
  // 정상 응답
  (response) => response,
  async (error) => {
    // accessToken 값
    const accessToken = getAccessToken();
    // refreshToken 값
    const refreshToken = getRefreshToken();
    const originalRequest = error.config;
    // 401 Unauthorized 응답을 받고, 이전에 이미 재시도한 적이 없는 경우, accessToken이 있을 때
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      accessToken
    ) {
      originalRequest._retry = true; // 재시도 했다는 표시를 설정

      // refreshToken이 있으면 access_token 재발급 필요
      if (refreshToken) {
        try {
          // refresh 토큰을 사용하여 새로운 access 토큰을 요청
          const response = await axios.post(
            `${CONFIG.site.apiURL}/api/v1/user/refresh-token`,
            {
              refresh_token: refreshToken,
            }
          );

          // 새로운 토큰 담기
          const { access_token, refresh_token } = response.data;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);

          // 실패한 요청을 새 토큰으로 재시도
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return await swagger.instance(originalRequest);
        } catch (refreshError) {
          // refresh 토큰이 유효하지 않은 경우 등의 에러 처리
          console.error('Unable to refresh access token', refreshError);
          // 로그아웃 처리
          removeAccessToken();
          removeRefreshToken();
          return Promise.reject(refreshError);
        }
      } else {
        // refreshToken이 없으면 로그아웃 처리
        removeAccessToken();
        removeRefreshToken();
        return Promise.reject();
      }
    } else {
      // 다른 모든 에러는 그대로 반환
      console.log(error, 'axios error');
      const errorResponse = error.response && error.response.data;
      const errorMessage = errorResponse
        ? errorResponse.message
        : 'Something went wrong';
      const errorStatus = error.response.status ? error.response.status : null;

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        message: errorMessage,
        data: errorResponse,
        status: errorStatus,
      });
    }
  }
);
const Swagger = swagger;
const Axios = swagger.instance;

export {Swagger};
export {Axios};

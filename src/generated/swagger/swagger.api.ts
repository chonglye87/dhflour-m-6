/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RefreshTokenRequest {
  refreshToken?: string;
}

export interface AuthenticationResponse {
  /**
   * JWT Access Token
   * @example "접근 토큰"
   */
  accessToken: string;
  /**
   * JWT Refresh Token
   * @example "접근 토큰"
   */
  refreshToken: string;
  user: RUser;
}

export interface RUser {
  /** @format int64 */
  id?: number;
  /**
   * 사용자명
   * @example "홍길동"
   */
  username: string;
  /**
   * 휴대폰번호
   * @example "01011112222"
   */
  mobile: string;
  /**
   * 이메일
   * @example "test@test.com"
   */
  email: string;
  /**
   * 이용약관동의 여부
   * @example true
   */
  policy: boolean;
  /**
   * 개인정보처리방침동의 여부
   * @example true
   */
  privacy: boolean;
  /**
   * 마케팅수신동의 여부
   * @example true
   */
  marketing?: boolean;
  /**
   * 등록시간
   * @format date-time
   */
  createdAt?: string;
  /**
   * 수정시간
   * @format date-time
   */
  updatedAt?: string;
}

export interface AuthenticationRequest {
  /**
   * email
   * @example "test@test.com"
   */
  email: string;
  /**
   * password
   * @example "1234"
   */
  password: string;
}

export interface UserSampleBody {
  /** @format int64 */
  id?: number;
  username?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API 문서
 * @version v1.0.0
 * @baseUrl http://localhost:8080
 *
 * 대한제분 API, powered by Spring Boot 3
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags init-web-flux-controller
   * @name Example
   * @request GET:/
   */
  example = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  api = {
    /**
     * @description JWT Refresh Token 발행합니다.
     *
     * @tags 인증 API
     * @name AuthRefreshToken
     * @summary [auth-2] JWT Refresh Token 발행
     * @request POST:/api/v1/authenticate/refresh-token
     */
    authRefreshToken: (data: RefreshTokenRequest, params: RequestParams = {}) =>
      this.request<AuthenticationResponse, any>({
        path: `/api/v1/authenticate/refresh-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description JWT Access Token 발행합니다.
     *
     * @tags 인증 API
     * @name AuthAccessToken
     * @summary [auth-1] JWT Access Token 발행
     * @request POST:/api/v1/authenticate/access-token
     */
    authAccessToken: (data: AuthenticationRequest, params: RequestParams = {}) =>
      this.request<AuthenticationResponse, any>({
        path: `/api/v1/authenticate/access-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 대칭키 JWT API
     * @name AccessToken
     * @request POST:/api/symmetric/jwt/verify-token
     */
    accessToken: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/symmetric/jwt/verify-token`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 대칭키 JWT API
     * @name AccessToken1
     * @request POST:/api/symmetric/jwt/access-token
     */
    accessToken1: (data: UserSampleBody, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/symmetric/jwt/access-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 비대칭키 JWT API
     * @name AccessToken2
     * @request POST:/api/asymmetric/jwt/verify-token
     */
    accessToken2: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/asymmetric/jwt/verify-token`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 비대칭키 JWT API
     * @name AccessToken3
     * @request POST:/api/asymmetric/jwt/access-token
     */
    accessToken3: (data: UserSampleBody, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/asymmetric/jwt/access-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 테스트 API
     * @name Cpu
     * @request GET:/api/v1/test/cpu
     */
    cpu: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/test/cpu`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Process 상태 API
     * @name MemoryLoad
     * @request GET:/api/v1/memory-load
     */
    memoryLoad: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/memory-load`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Process 상태 API
     * @name MemoryLoadSize
     * @request GET:/api/v1/memory-load-size
     */
    memoryLoadSize: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/memory-load-size`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Process 상태 API
     * @name MemoryLoadClear
     * @request GET:/api/v1/memory-load-clear
     */
    memoryLoadClear: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/memory-load-clear`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Process 상태 API
     * @name Env
     * @request GET:/api/v1/env
     */
    env: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/env`,
        method: "GET",
        ...params,
      }),

    /**
     * @description JWT를 통해 인증된 사용자 정보 또는 기본 정보를 조회합니다.
     *
     * @tags 인증 API
     * @name GetOptionalUserInfo
     * @summary 옵션 사용자 정보 조회
     * @request GET:/api/v1/authenticate/optional-info
     * @secure
     */
    getOptionalUserInfo: (params: RequestParams = {}) =>
      this.request<RUser, any>({
        path: `/api/v1/authenticate/optional-info`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description JWT를 통해 인증된 사용자 정보를 조회합니다.
     *
     * @tags 인증 API
     * @name GetAuthenticatedUserInfo
     * @summary 인증된 사용자 정보 조회
     * @request GET:/api/v1/authenticate/authenticated-info
     * @secure
     */
    getAuthenticatedUserInfo: (params: RequestParams = {}) =>
      this.request<RUser, any>({
        path: `/api/v1/authenticate/authenticated-info`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 대칭키 JWT API
     * @name Env1
     * @request GET:/api/symmetric/jwt/create-key
     */
    env1: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/symmetric/jwt/create-key`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags [샘플] 비대칭키 JWT API
     * @name Env2
     * @request GET:/api/asymmetric/jwt/create-key
     */
    env2: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/asymmetric/jwt/create-key`,
        method: "GET",
        ...params,
      }),
  };
}

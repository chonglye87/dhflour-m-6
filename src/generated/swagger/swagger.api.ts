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

export interface RequestUpdatePassword {
  oldPassword?: string;
  newPassword?: string;
}

export interface RequestRUser {
  /**
   * 이메일
   * @maxLength 255
   * @example "test@gmail.com"
   */
  email: string;
  /**
   * 사용자명
   * @maxLength 255
   * @example "홍길동"
   */
  username: string;
  /**
   * 휴대폰번호
   * @maxLength 255
   * @example "01011112222"
   */
  mobile: string;
  /**
   * 비밀번호
   * @maxLength 255
   * @example "Yuio1234!"
   */
  password: string;
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
}

export interface RequestRBoard {
  /**
   * 제목
   * @maxLength 255
   */
  title: string;
  /** 내용 */
  content?: string;
  /** 카테고리 ID */
  categoryIds?: number[];
}

export interface RequestRBoardCategory {
  /**
   * 카테고리명
   * @example "공지"
   */
  name: string;
}

export interface RUser {
  /**
   * 등록시간
   * @format int32
   */
  createdAt: number;
  /**
   * 등록자
   * @format int64
   */
  createdBy: number;
  /**
   * 수정시간
   * @format int32
   */
  updatedAt: number;
  /**
   * 수정자
   * @format int64
   */
  updatedBy: number;
  /**
   * 버전
   * @format int64
   */
  version: number;
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
}

export interface RBoard {
  /**
   * 등록시간
   * @format int32
   */
  createdAt: number;
  /**
   * 등록자
   * @format int64
   */
  createdBy: number;
  /**
   * 수정시간
   * @format int32
   */
  updatedAt: number;
  /**
   * 수정자
   * @format int64
   */
  updatedBy: number;
  /**
   * 버전
   * @format int64
   */
  version: number;
  /**
   * ID
   * @format int64
   */
  id: number;
  /** 제목 */
  title: string;
  /** 내용 */
  content: string;
  categories?: RBoardCategory[];
}

export interface RBoardCategory {
  /**
   * 등록시간
   * @format int32
   */
  createdAt: number;
  /**
   * 등록자
   * @format int64
   */
  createdBy: number;
  /**
   * 수정시간
   * @format int32
   */
  updatedAt: number;
  /**
   * 수정자
   * @format int64
   */
  updatedBy: number;
  /**
   * 버전
   * @format int64
   */
  version: number;
  /** @format int64 */
  id?: number;
  /** 카테고리명 */
  name: string;
}

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

export interface RequestSignUp {
  /**
   * 이메일
   * @maxLength 255
   * @example "test@gmail.com"
   */
  email: string;
  /**
   * 사용자명
   * @maxLength 255
   * @example "홍길동"
   */
  username: string;
  /**
   * 휴대폰번호
   * @maxLength 255
   * @example "01011112222"
   */
  mobile: string;
  /**
   * 비밀번호
   * @maxLength 255
   * @example "Yuio1234!"
   */
  password: string;
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
}

export interface UserSampleBody {
  /** @format int64 */
  id?: number;
  username?: string;
}

/** 사용자 페이지네이션 응답 */
export interface RUserPaginationResponse {
  /**
   * 현재 페이지 번호
   * @format int32
   * @example 0
   */
  page: number;
  /**
   * 페이지 크기
   * @format int32
   * @example 20
   */
  size: number;
  /**
   * 전체 요소 수
   * @format int64
   * @example 100
   */
  totalElements: number;
  /**
   * 전체 페이지 수
   * @format int32
   * @example 5
   */
  totalPages: number;
  /** 페이지에 포함된 콘텐츠 */
  content?: RUser[];
}

/** 게시판 페이지네이션 응답 */
export interface RBoardPaginationResponse {
  /**
   * 현재 페이지 번호
   * @format int32
   * @example 0
   */
  page: number;
  /**
   * 페이지 크기
   * @format int32
   * @example 20
   */
  size: number;
  /**
   * 전체 요소 수
   * @format int64
   * @example 100
   */
  totalElements: number;
  /**
   * 전체 페이지 수
   * @format int32
   * @example 5
   */
  totalPages: number;
  /** 페이지에 포함된 콘텐츠 */
  content?: RBoard[];
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
     * @description 사용자의 비밀번호를 수정합니다.
     *
     * @tags 회원 API
     * @name UpdatePassword
     * @summary [user-6] 비밀번호 수정 (Update Password)
     * @request PUT:/api/v1/user/{id}/password
     * @secure
     */
    updatePassword: (id: number, data: RequestUpdatePassword, params: RequestParams = {}) =>
      this.request<RequestUpdatePassword, any>({
        path: `/api/v1/user/${id}/password`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자를 ID로 조회합니다.
     *
     * @tags 회원 API
     * @name GetUserById
     * @summary [user-2] 사용자 상세 조회 (Get by ID)
     * @request GET:/api/v1/user/{id}
     * @secure
     */
    getUserById: (id: number, params: RequestParams = {}) =>
      this.request<RUser, any>({
        path: `/api/v1/user/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 사용자를 수정합니다.
     *
     * @tags 회원 API
     * @name UpdateUser
     * @summary [user-4] 사용자 수정 (Update)
     * @request PUT:/api/v1/user/{id}
     * @secure
     */
    updateUser: (id: number, data: RequestRUser, params: RequestParams = {}) =>
      this.request<RequestRUser, any>({
        path: `/api/v1/user/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 사용자를 삭제합니다.
     *
     * @tags 회원 API
     * @name DeleteUser
     * @summary [user-5] 사용자 삭제 (Delete)
     * @request DELETE:/api/v1/user/{id}
     * @secure
     */
    deleteUser: (id: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/user/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 게시판를 ID로 조회합니다.
     *
     * @tags 게시판 API
     * @name GetBoardById
     * @summary [board-2] 게시판 상세 조회 (Get by ID)
     * @request GET:/api/v1/board/{id}
     * @secure
     */
    getBoardById: (id: number, params: RequestParams = {}) =>
      this.request<RBoard, any>({
        path: `/api/v1/board/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 게시판를 수정합니다.
     *
     * @tags 게시판 API
     * @name UpdateBoard
     * @summary [board-4] 게시판 수정 (Update)
     * @request PUT:/api/v1/board/{id}
     * @secure
     */
    updateBoard: (id: number, data: RequestRBoard, params: RequestParams = {}) =>
      this.request<RequestRBoard, any>({
        path: `/api/v1/board/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 게시판를 삭제합니다.
     *
     * @tags 게시판 API
     * @name DeleteBoard
     * @summary [board-5] 게시판 삭제 (Delete)
     * @request DELETE:/api/v1/board/{id}
     * @secure
     */
    deleteBoard: (id: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/board/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 게시물 카테고리를 ID로 조회합니다.
     *
     * @tags 게시판 API
     * @name GetBoardCategoryById
     * @summary [board-category-2] 게시판 카테고리 상세 조회 (Get by ID)
     * @request GET:/api/v1/board-category/{id}
     * @secure
     */
    getBoardCategoryById: (id: number, params: RequestParams = {}) =>
      this.request<RBoardCategory, any>({
        path: `/api/v1/board-category/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 게시물 카테고리를 수정합니다.
     *
     * @tags 게시판 API
     * @name UpdateBoardCategory
     * @summary [board-category-4] 게시판 카테고리 수정 (Update)
     * @request PUT:/api/v1/board-category/{id}
     * @secure
     */
    updateBoardCategory: (id: number, data: RequestRBoardCategory, params: RequestParams = {}) =>
      this.request<RequestRBoardCategory, any>({
        path: `/api/v1/board-category/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 기존 게시물 카테고리를 삭제합니다.
     *
     * @tags 게시판 API
     * @name DeleteBoardCategory
     * @summary [board-category-5] 게시판 카테고리 삭제 (Delete)
     * @request DELETE:/api/v1/board-category/{id}
     * @secure
     */
    deleteBoardCategory: (id: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/board-category/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 사용자 목록 조회합니다.
     *
     * @tags 회원 API
     * @name PageUser
     * @summary [user-1] 사용자 페이지 조회 (Pagination)
     * @request GET:/api/v1/user
     * @secure
     */
    pageUser: (
      query?: {
        /**
         * Page Size 페이지 크기 (default : 20)
         * @format int32
         * @example 20
         */
        size?: number;
        /**
         * 현재 페이지 0부터 (Current Page)  현재 페이지 (default : 0)
         * @format int32
         * @example 0
         */
        page?: number;
        /**
         * 정렬 (Sort Page)
         * @example "created_at,desc"
         */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RUserPaginationResponse, any>({
        path: `/api/v1/user`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 새로운 사용자를 생성합니다.
     *
     * @tags 회원 API
     * @name CreateUser
     * @summary [user-3] 사용자 생성 (Create)
     * @request POST:/api/v1/user
     * @secure
     */
    createUser: (data: RequestRUser, params: RequestParams = {}) =>
      this.request<RUser, any>({
        path: `/api/v1/user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 게시물 카테고리 목록 조회합니다.
     *
     * @tags 게시판 API
     * @name ListBoardCategory
     * @summary [board-category-1] 게시판 카테고리 목록 조회 (List)
     * @request GET:/api/v1/board-category
     * @secure
     */
    listBoardCategory: (
      query?: {
        /**
         * 정렬 (Sort Page)
         * @example "created_at,desc"
         */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RBoardCategory[], any>({
        path: `/api/v1/board-category`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 새로운 게시물 카테고리를 생성합니다.
     *
     * @tags 게시판 API
     * @name CreateBoardCategory
     * @summary [board-category-3] 게시판 카테고리 생성 (Create)
     * @request POST:/api/v1/board-category
     * @secure
     */
    createBoardCategory: (data: RequestRBoardCategory, params: RequestParams = {}) =>
      this.request<RequestRBoardCategory, any>({
        path: `/api/v1/board-category`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 게시판 목록 조회합니다.
     *
     * @tags 게시판 API
     * @name PageBoard
     * @summary [board-1] 게시판 페이지 조회 (Pagination)
     * @request GET:/api/v1/board
     * @secure
     */
    pageBoard: (
      query?: {
        /** @default "" */
        query?: string;
        /** @default "" */
        startTime?: string;
        /** @default "" */
        endTime?: string;
        /** @default [] */
        categoryIds?: number[];
        /**
         * Page Size 페이지 크기 (default : 20)
         * @format int32
         * @example 20
         */
        size?: number;
        /**
         * 현재 페이지 0부터 (Current Page)  현재 페이지 (default : 0)
         * @format int32
         * @example 0
         */
        page?: number;
        /**
         * 정렬 (Sort Page)
         * @example "created_at,desc"
         */
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RBoardPaginationResponse, any>({
        path: `/api/v1/board`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 새로운 게시판를 생성합니다.
     *
     * @tags 게시판 API
     * @name CreateBoard
     * @summary [board-3] 게시판 생성 (Create)
     * @request POST:/api/v1/board
     * @secure
     */
    createBoard: (data: RequestRBoard, params: RequestParams = {}) =>
      this.request<RBoard, any>({
        path: `/api/v1/board`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

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
     * @description 회원가입을 합니다.
     *
     * @tags 인증 API
     * @name SignUp
     * @summary [auth-3] 회원가입 (Sign Up)
     * @request POST:/api/v1/authenticate
     */
    signUp: (data: RequestSignUp, params: RequestParams = {}) =>
      this.request<AuthenticationResponse, any>({
        path: `/api/v1/authenticate`,
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
     * @description JWT를 통해 인증된 사용자 정보를 조회합니다.
     *
     * @tags 인증 API
     * @name GetAuthenticatedUserInfo
     * @summary [auth-3] 인증된 사용자 정보 조회
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

/**
 * Base Response Codes
 * 
 * This file contains the base response codes used across the application.
 * It defines the structure and common codes for success and error responses.
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Application Status Codes
export const APP_STATUS = {
  SUCCESS: 1,
  ERROR: 0
};

// Common Success Codes
export const commonSuccessCode = {
  OPERATION_SUCCESSFUL: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Operation completed successfully',
    status: 'success'
  },
  RESOURCE_CREATED: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.CREATED,
    message: 'Resource created successfully',
    status: 'success'
  },
  RESOURCE_UPDATED: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Resource updated successfully',
    status: 'success'
  },
  RESOURCE_DELETED: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Resource deleted successfully',
    status: 'success'
  },
  RESOURCE_RETRIEVED: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Resource retrieved successfully',
    status: 'success'
  },
  RESOURCES_RETRIEVED: {
    code: APP_STATUS.SUCCESS,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Resources retrieved successfully',
    status: 'success'
  }
};

// Common Error Codes
export const commonErrorCode = {
  BAD_REQUEST: {
    code: 100,
    httpStatusCode: HTTP_STATUS.BAD_REQUEST,
    message: 'Bad request',
    status: 'error'
  },
  UNAUTHORIZED: {
    code: 101,
    httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
    message: 'Unauthorized access',
    status: 'error'
  },
  FORBIDDEN: {
    code: 102,
    httpStatusCode: HTTP_STATUS.FORBIDDEN,
    message: 'Access forbidden',
    status: 'error'
  },
  NOT_FOUND: {
    code: 103,
    httpStatusCode: HTTP_STATUS.NOT_FOUND,
    message: 'Resource not found',
    status: 'error'
  },
  VALIDATION_ERROR: {
    code: 104,
    httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    message: 'Validation error',
    status: 'error'
  },
  CONFLICT: {
    code: 105,
    httpStatusCode: HTTP_STATUS.CONFLICT,
    message: 'Resource conflict',
    status: 'error'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    httpStatusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
    status: 'error'
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    httpStatusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
    message: 'Service temporarily unavailable',
    status: 'error'
  }
};

export default {
  HTTP_STATUS,
  APP_STATUS,
  commonSuccessCode,
  commonErrorCode
}; 
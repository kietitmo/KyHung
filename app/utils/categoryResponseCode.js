export const successCode = {
    CATEGORY_CREATED: {
      code: 1,
      httpStatusCode: 201,
      message: 'Category created',
    },
    CATEGORIES_GET_ALL: {
      code: 1,
      httpStatusCode: 200,
      message: 'Get categories successfully',
    },
    CATEGORY_GET: {
      code: 1,
      httpStatusCode: 200,
      message: 'Get category successfully',
    },
    CATEGORY_UPDATED: {
      code: 2,
      httpStatusCode: 200,
      message: 'Category updated',
    },
    CATEGORY_DELETED: {
      code: 3,
      httpStatusCode: 200,
      message: 'Category deleted',
    },
  };
  
  export const errorCode = {
    CATEGORY_BAD_REQUEST: {
      code: 102,
      httpStatusCode: 400,
      message: 'Category bad request',
    },
    CATEGORY_NAME_INVALID: {
      code: 104,
      httpStatusCode: 400,
      message: 'Category name is invalid',
    },
    CATEGORY_NOT_FOUND: {
      code: 106,
      httpStatusCode: 404,
      message: 'Category not found',
    },
    CATEGORY_ALREADY_EXISTS: {
      code: 102,
      httpStatusCode: 400,
      message: 'Category already exists',
    },
  };
  
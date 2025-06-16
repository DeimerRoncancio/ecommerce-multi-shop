import { TypeWithKey } from "../types/type-with-key"

export const getValidationError = (errorCode: any) => {
  const errorMatcher: TypeWithKey<string> = {
    ERR_BAD_REQUEST: 'Not found error'
  }

  return errorMatcher[errorCode];
}
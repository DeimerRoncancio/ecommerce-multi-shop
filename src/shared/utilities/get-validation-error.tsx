import { TypeWithKey } from "../types/type-with-key"

export const getValidationError = (errorCode: any, errorStack: any) => {
  const errorMatcher: TypeWithKey<string> = {
    ERR_BAD_REQUEST: 'Not found error',
    ERR_NETWORK: 'There has an error network',
  }

  return `${errorMatcher[errorCode]}-${errorStack}`;
}

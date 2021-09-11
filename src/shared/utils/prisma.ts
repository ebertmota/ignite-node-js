/* eslint-disable @typescript-eslint/no-explicit-any */
type IFilter = any;

export const optional = (filter: IFilter): any | undefined => {
  if (filter) {
    return filter;
  }

  return undefined;
};

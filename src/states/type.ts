/* eslint-disable @typescript-eslint/no-explicit-any */

export type reduceActionType<AtomType> = {
  data?: AtomType;
  [key: string]: any;
};

export type reduceFn<AtomType, FnName> = (
  prev: AtomType,
  action: {
    type: FnName;
    payload?: reduceActionType<AtomType>;
  }
) => AtomType;

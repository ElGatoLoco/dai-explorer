export type WithStringValuesOnly<T> = Partial<
  Pick<
    T,
    {
      [K in keyof T]: T[K] extends string ? K : never;
    }[keyof T]
  >
>;

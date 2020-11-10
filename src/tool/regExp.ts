export const numberFilter = (value: string): string => {
  return String(
    Number( value.replace(/[^0-9]+/g, "") )
  );
};

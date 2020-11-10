import dayjs from "dayjs";

export const YYYYMMDD = (dateString: string) => {
  return dayjs(dateString).format("YYYY/MM/DD");
}

export const KB = (bytes: number) => {
  return Math.round(bytes / 1024);
}

export const MB = (bytes: number) => {
  return Math.round(bytes / (1024 * 1024));
}

export const parseImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => {

      const image = new Image();
      image.src = fileReader.result as string;
      image.onload = function () {
        resolve(this as HTMLImageElement);
      }
    });
  });
}

interface ListDataItem {
  TID: number;
  [key: string]: any;
}
export const generateIDHandler = ( sourceData: ListDataItem[] ) => {
  // ID <= 0 ，對後端視為新增資料
  const minID = Math.min( ...sourceData.map((item) => item.TID) );

  return minID > 0 ? 0 : minID - 1;
}

export default class StringHelpers {
  //   static baseURL: string | undefined = process.env.VITE_URL;
  static baseURL: string | undefined = import.meta.env.VITE_IMAGE;

  static getProfile = (data: any, code?: string | number) => {
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${
      data?.fileName || code
    }${data?.ext}`;
  };
}

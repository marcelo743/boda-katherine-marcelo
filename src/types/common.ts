export type UUID = string & { __brand: "uuid" };
export type ISODate = string & { __brand: "iso-date" };

export type ControlField =  {
    created_at: ISODate;
    deleted_at: ISODate | null;
}

export type FocusState = {
  hasFocus: boolean;
  isVisible: boolean;
  isActive: boolean;
};

export const AUTHENTICATED = "authenticated";
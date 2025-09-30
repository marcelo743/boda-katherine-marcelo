import { UUID, ControlField } from "./common";

export interface GuestDTO extends ControlField {
  id: UUID;
  invitation_id: UUID;
  first_name: string;
  last_name: string;
};

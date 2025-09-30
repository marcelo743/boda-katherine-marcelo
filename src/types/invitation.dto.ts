import { UUID, ControlField } from "./common";
import { GuestDTO } from "./guest.dto";

export interface InvitationDTO extends ControlField {
  id: UUID;
  title: string;
  guest: GuestDTO[];
};

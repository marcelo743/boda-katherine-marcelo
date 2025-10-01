// src/services/invitation.service.ts
import { api } from "@/utils/axios";
import { GuestDTO } from "@/types/guest.dto";
import { InvitationDTO } from "@/types/invitation.dto";
import { Response } from "@/types/response";

export async function getInvitationGuest(invitationId: string): Promise<Response<GuestDTO[]>> {
  const { data } = await api.get<Response<GuestDTO[]>>(`/invitation/${invitationId}/guest`);
  return data;
}

export async function getInvitation(invitationId: string): Promise<Response<InvitationDTO>> {
  const { data } = await api.get<Response<InvitationDTO>>(`/invitation/${invitationId}`);

  return data;
}

export async function sendConfirmedGuests(guestIds: string[], invitationId: string) {
  if(invitationId == "") return;

  const { data } = await api.post<Response<{ error: string; status: string }>>(
    `/invitation/confirm`,
    { guestIds, invitationId }
  );

  return data;
}
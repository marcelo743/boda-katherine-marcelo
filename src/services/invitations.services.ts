import { InvitationDTO } from "@/types/invitation.dto";
import { InvitationRow } from "@/types/invitationTable";
import { Response } from "@/types/response";
import { api } from "@/utils/axios";

export async function GetAllInvitations() {
  const { data: { data } } = await api.get<Response<InvitationDTO[]>>(`/admin/invitations`);

  return data?.map(i => (
    { 
        id: i.id,
        title: i.title,
        seen: i.seen,
        invitationUrl: `${process.env.NEXT_PUBLIC_HOST}?invitationId=${i.id}` }
    )) as InvitationRow[] ?? [];
}
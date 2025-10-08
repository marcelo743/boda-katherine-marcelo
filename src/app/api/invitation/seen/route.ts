import { supabase } from "@/utils/supabase";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { invitationId } = await req.json();

    
    if (invitationId === null || invitationId === "") {
      return NextResponse.json({ error: 'Invalid payload', status: HttpStatusCode.BadRequest });
    }
    
    const { data: invitation, error: fetchError } = await supabase
    .from('invitation')
      .select('seen')
      .eq('id', invitationId)
      .is('deleted_at', null)
      .single();
      
      if (fetchError) {
        return NextResponse.json({ error: fetchError.message, status: HttpStatusCode.BadGateway });
      }

      if(invitation.seen) {
        return NextResponse.json({ error: 'Invitation already seen', status: HttpStatusCode.Ok });
      }
      
      if (invitation && !invitation.seen) {
        const { error: updateError } = await supabase
        .from('invitation')
        .update({ seen: true })
        .eq('id', invitationId);
        
      if (updateError) {
        return NextResponse.json({ error: updateError.message, status: HttpStatusCode.BadGateway });
      }
    }

    return NextResponse.json({ error: null, status: HttpStatusCode.Ok });
  } catch (err) {
    return NextResponse.json({ err, status: HttpStatusCode.InternalServerError });
  }
}

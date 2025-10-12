
import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: invitationId } = await context.params;

  const { data, error } = await supabase
    .from("guest")
    .select(`
      *
    `)
    .is("deleted_at", null)
    .eq("invitation_id", invitationId);

  if (error) {
    return NextResponse.json({error: error.message, status: HttpStatusCode.InternalServerError, data: null })
  };
  
  return NextResponse.json({data, error:null, status: HttpStatusCode.Ok});
}

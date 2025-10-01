import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { HttpStatusCode } from 'axios';
import { PostgrestError } from '@supabase/supabase-js';
import { sameStringSet } from '@/utils/helper';

export async function POST(req: Request) {
  try {
    const { guestIds, invitationId } = await req.json();
    let updatedError: PostgrestError | null = null;
    
    if (!Array.isArray(guestIds) || invitationId === null || invitationId === "") {
      return NextResponse.json({ error: 'Invalid payload', status: HttpStatusCode.BadRequest });
    }

    const { data: guests, error: fetchError } = await supabase
      .from('guest')
      .select('id, confirmed')
      .eq('invitation_id', invitationId)
      .is('deleted_at', null);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message, status: HttpStatusCode.BadGateway });
    }
    
    const alreadyConfirmedIds = guests
    .filter(guest => guest.confirmed)
    .map(guest => guest.id);

    const idsToConfirm = guestIds.filter(id => !alreadyConfirmedIds.includes(id));
    
    const falselyConfirmedIds = guests
    .filter(guest => guest.confirmed && !guestIds.includes(guest.id))
    .map(guest => guest.id);

    if (sameStringSet(alreadyConfirmedIds, guestIds)) {
      return NextResponse.json({ error: 'Todos los invitados ya están confirmados', status: HttpStatusCode.Ok });
    }
    
    if(idsToConfirm.length > 0) {
      const { error: confirmError } = await supabase
        .from('guest')
        .update({ confirmed: true })
        .in('id', idsToConfirm);

        updatedError = confirmError;
    }

    if(falselyConfirmedIds.length > 0) {
      const { error: unconfirmError } = await supabase
        .from('guest')
        .update({ confirmed: false })
        .in('id', falselyConfirmedIds);

        updatedError = unconfirmError;
    }

    if (updatedError) {
      return NextResponse.json({ error: updatedError.message, status: HttpStatusCode.BadGateway });
    }

    return NextResponse.json({ error: null, status: HttpStatusCode.Ok });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error', status: HttpStatusCode.InternalServerError });
  }
}
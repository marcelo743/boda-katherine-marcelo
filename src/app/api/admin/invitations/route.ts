import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { HttpStatusCode } from 'axios';

export async function GET() {
    const { data, error } = await supabase
    .from('invitation')
    .select('*');

    if (error) {
        return NextResponse.json({
            error: error.message,
            status: HttpStatusCode.InternalServerError,
            data: null
        });
    }

    return NextResponse.json({
        error: null,
        status: HttpStatusCode.Ok,
        data
    });
}

import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

export async function routeResponse(req: NextRequest, res: Response) {
  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    return res;
  }
}

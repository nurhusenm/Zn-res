// src/app/api/menu/route.ts
import { NextResponse } from 'next/server';
import {
  getMenuItems,
  createMenuItem,
} from '../../../../lib/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const data = await req.json();
    const item = await createMenuItem(data);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}

// src/app/api/menu/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateMenuItem, deleteMenuItem } from '../../../../../lib/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth/options';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Check for admin user
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Await the params
    const { id } = await params;

    // 3. Get update data from request body
    const data = await request.json();

    // 4. Call the updated MongoDB function
    const result = await updateMenuItem(id, data);

    if (!result) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Check for admin user
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Await the params
    const { id } = await params;

    // 3. Call the updated MongoDB function
    const result = await deleteMenuItem(id);

    if (!result) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}

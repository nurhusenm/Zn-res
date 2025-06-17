import { NextResponse } from 'next/server';
import { getMenuItems } from '../../../../lib/db/schema';

export async function GET() {
  try {
    console.log('🔍 Testing MongoDB connection on Vercel...');
    
    const items = await getMenuItems();
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Found', items.length, 'menu items');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection working',
      itemCount: items.length,
      sampleItem: items[0] || null
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 
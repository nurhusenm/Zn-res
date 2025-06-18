import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Check if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Development: Save to local file system
      try {
        // Create a unique filename with original extension
        const fileExtension = file.name.split('.').pop();
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqueSuffix}.${fileExtension}`;
        
        // Ensure uploads directory exists
        const publicDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(publicDir)) {
          await mkdir(publicDir, { recursive: true });
        }
        
        const path = join(publicDir, filename);
        await writeFile(path, buffer);
        
        // Return the URL path
        const url = `/uploads/${filename}`;
        
        console.log('✅ File uploaded successfully (development):', url);
        
        return NextResponse.json({ 
          url,
          filename,
          size: file.size,
          type: file.type
        });
      } catch (fsError) {
        console.error('❌ File system error:', fsError);
        // Fall through to base64 conversion
      }
    }

    // Production (Vercel) or fallback: Convert to base64 data URL
    try {
      const base64 = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;
      
      console.log('✅ File converted to base64 (production):', file.name);
      
      return NextResponse.json({ 
        url: dataUrl,
        filename: file.name,
        size: file.size,
        type: file.type,
        isBase64: true
      });
    } catch (base64Error) {
      console.error('❌ Base64 conversion error:', base64Error);
      
      // Final fallback: Return a placeholder image
      const placeholderUrl = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(file.name)}`;
      
      console.log('✅ Using placeholder image as fallback:', placeholderUrl);
      
      return NextResponse.json({ 
        url: placeholderUrl,
        filename: file.name,
        size: file.size,
        type: file.type,
        isPlaceholder: true
      });
    }

  } catch (error) {
    console.error('❌ Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file. Please try again.' },
      { status: 500 }
    );
  }
} 
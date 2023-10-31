import fs from 'fs';
import sharp from 'sharp';
import { NextResponse, ImageResponse } from 'next/server';


export async function GET(req, { params }) {
  if (fs.existsSync('/' + params.image.join('/')) === false) {
    return new NextResponse('', { status: 404 })
  } else {
    var data = fs.readFileSync('/' + params.image.join('/'))
    // const metadata = await sharp(data).metadata();
    // if(metadata.width == undefined) {
    //   return new NextResponse('', { status: 404 })
    // }
    // const resizedData = await sharp(data).resize({ width: Math.round(metadata.width / 2) }).toBuffer();
    // const response = new NextResponse(resizedData)
    const response = new NextResponse(data);
    response.headers.set('content-type', 'image/gif');
    return response;
  }
}
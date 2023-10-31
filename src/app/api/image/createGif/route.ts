import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from 'fs';

export async function GET(req) {
  return NextResponse.json({helo: 'world'})
}

export async function POST(req) {
  const images = await req.json();
  const inputPattern = `concat:${images.fileList.join('|')}`;

  var output = images.metadata.dir + '/' + images.metadata.channel + 'gif.gif'

  
  if (fs.existsSync(output)) { fs.unlinkSync(output) }

  const ffmpeg = spawn('ffmpeg', ['-i', inputPattern, '-vf', 'scale=1280:-1', output]);

  ffmpeg.on('exit', (code, signal) => {
    console.log(`ffmpeg exited // ${code}`);
    return NextResponse.json({ status: 200 });
  });

  return new Promise(resolve => {
    ffmpeg.on('exit', () => {
      resolve(NextResponse.json({ status: 200 }));
    });
  });
}
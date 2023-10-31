// extremely dumb
export default function PostGif(dir: string, file: string[], channel: string, type: string): Promise<boolean> {
  var fileList: string[] = [];
  file && file.map((file) => {
    if (!file.endsWith('.gif')) {
      fileList.push(dir + '/' + file);
    }
  });

  return fetch('/api/image/createGif', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({fileList: fileList, metadata: {channel: channel, dir: dir}})
  })
  .then((res) => {
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  })
  .catch((error) => {
    console.error(error);
    return false;
  });
}
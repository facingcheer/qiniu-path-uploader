# qiniu uploader

>A qiniu file uploader will auto upload files in the path

# install 
```
npm install qiniu-path-uploader --save-dev
```

# usage:

```

const QiniuUploader = require('./src/index')
const path = require('path')

const conf = {
  accessKey: 'your aaccessKey',
  secretKey: 'your secretKey',
  bucket: 'your bucket name'
}

let qiniuup = new QiniuUploader(conf.accessKey, conf.secretKey, conf.bucket)

qiniuup.upload(path.resolve(__dirname, 'build'))

```
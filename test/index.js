const QiniuUploader = require('../dist/index')
const path = require('path')

const conf = {
  accessKey: 'BbvN1PCyllBkWTkoSfewMvOiBYLvWuQvgyAD5fS5',
  secretKey: 'Z8UGi_sUcoGJdvUhMt4PwwwSb-ShVK6-sJkN5KQc',
  bucket: 'image'
}

let qiniuup = new QiniuUploader(conf.accessKey, conf.secretKey, conf.bucket)

qiniuup.upload(path.resolve(__dirname, '../build'))
const qiniu = require('qiniu')
const fs = require('fs');
const path = require('path')

class QiniuUploader {
  constructor(accessKey, secretKey, bucket) {
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    this.bucket = bucket
  
    this.config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(this.config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }
  async upload(path) {
    const files = await readFiles(path)
    files.forEach(async ({name, path}) => {
      const options = {
        scope: this.bucket + ":" + name,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        expires: 7200
      }
      this.putPolicy = new qiniu.rs.PutPolicy(options);
      this.uploadToken=this.putPolicy.uploadToken(this.mac);
      const res = await this.putFiles(name, path)
      console.log(res)
    })
  }
  async putFiles(name, path) {
    return new Promise((resolve, reject) => {
      this.formUploader.putFile(this.uploadToken, name, path, this.putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          resolve(respBody);
        }
      });
    })
  }
}

async function readFiles(p) {
  dirname = p
  const fileList = []
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        reject(err);
        return;
      }
      filenames.forEach(function(filename) {
        const filePath = path.resolve(dirname, filename)
        const stats = fs.statSync(filePath);
        if (stats.isFile()) fileList.push({name:filename, path:filePath})
      });
      resolve(fileList)
    });
  }) 
}

module.exports = QiniuUploader



var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  //文件目录
  // var filePath = path.join(__dirname, "../public/");
  // let fileType = ['js'];
  //获取文件目录
  // let returnData = [];
  // //需要写入的文件流
  // let writeFileData = fileDisplay(filePath, returnData, fileType);
  // //写入文件
  // console.log('writeFileData', writeFileData);
  // //数组去重
  // writeFileData = [... new Set(writeFileData)];
  // //写入文件
  // fs.writeFileSync('./doc/message.json', `{\r${writeFileData.join('\r')}\r}`);
  // //返回给页面
  // res.send(`{\r${writeFileData.join('\r')}\r}`);
  let returnData = new getFileData();
  res.send(`{\r${returnData.writeFileData.join('\r')}\r}`);
});

//根据规则读写页面文件
class getFileData {
  constructor() {
    this.filePath = 'E:/JWXM/rdf-uc-frontend/src/views/main/'; //文件路径
    this.fileType = []; //需要的值， 默认不传
    this.writeFileData = []; //最后返回的值
    this.filterFile = ['mock', 'languageManage'] // 過濾文件夾
    this.init();
  }
  init(){
    //需要写入的文件流
    console.log(this.filePath)
    this.fileDisplay(this.filePath);
    //数组去重
    this.writeFileData = [... new Set(this.writeFileData)];
    //写入文件
    fs.writeFileSync('./doc/message.json', `{\r${this.writeFileData.join('\r')}\r}`);
  }
  /**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @return [] 文件需要写入的内容
 */
  fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach(filename => {
      //如果用户传输了类型 那么就判断是否是这个类型的
      let flage = true;
      if (this.fileType && this.fileType.length) {
        //获取类型
        let isfileType = filename.split('.')[filename.split('.').length - 1];
        flage = this.fileType.includes(isfileType);
      }
      //获取当前文件的绝对路径
      var filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      let stats = fs.statSync(filedir);
      var isFile = stats.isFile();//是文件
      var isDir = stats.isDirectory();//是文件夹
      if (isFile && flage) { //文件
        let fileData = this.getFile(filedir);
        //如果返回的有数据 并且数据有长度的话
        if (fileData && fileData.length) {
          this.writeFileData.push(...fileData);
        }
      }
      if (isDir) { //文件夹 回调自身
        //要是文件的名字在列表中那麽跳過
        console.log('filename:', filename)
        if (filename == 'mock') {
          console.log(999)
        }
        if (this.filterFile.includes(filename) ) {
          console.log('filename:', filename)
          return
        }
        this.fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    });
    //返回最后的结果
    // return returnData;
  }

  /**
   * 同步获取文件内容
   * @param filePath 文件路径
   * retuen [] 返回文件内的中文数据
   */
  getFile(filePath) {
    var data = fs.readFileSync(filePath, 'utf-8');
    let returnData = this.dataTransference(data);
    return returnData;
  }
  //最后的数据转换
  dataTransference(str) {
    let fileData = str.toString();
    // 去html備注
    fileData = fileData.replace(/<!--.*?-->/g, "")
    // 去备注
    let reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)|/g;
    fileData = fileData.replace(reg, function (word) {
      // 去除注释后的文本 
      return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
    });
    //取中文
    fileData = fileData.replace(/[^\u4e00-\u9fa5]/gi, ",");
    fileData = fileData.split(',');
    //数据组装
    let returnData = [];
    //数据去空，斌且按格式来
    fileData = fileData.filter(res => res).map(res => `${res}<br>`);
    returnData.push(...fileData);
    //返回数据 格式化后的数据
    return returnData
  }
}

module.exports = router;

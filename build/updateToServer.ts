const axios = require('axios');
const chalk = require('chalk')
  
axios.get('http://192.168.0.232:8896/job/Gmt_wechat/build?token=1m3z5g4qwv3zq')
 .then(response => {
    if (response.status === 201) {
        console.log(chalk.cyan('服务器已开始构建，大概需要40秒，请稍候...'))
    }
 })
 .catch(error => {
  console.log(error);
 });
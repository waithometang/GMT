/*
    大文件上传
    2020-08-19
    BenWen
*/


import OriginAxios from 'axios'
import { storage } from '@/js/until'
import { CommonOption } from '@/api/config.js'
import Bobolink from 'bobolink';
let recordid,count
let perSize = 10485760 //20971520  //分割单文件大小
let Token

const httpOnly = OriginAxios.create({
    baseURL: '',
    timeout: 40000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
  });

async function beginUpload(filename,count){
    let result = await Axios({url:'api/system/BeforeUpload',data:{filename,count}})
    console.log(result);
    if (!result.data.success) return Promise.reject({message:result.data.message})
    recordid = result.data.content
}

async function Axios(SettingOptions){
    CommonOption.headers.Authorization = 'Bearer '+ Token
    return httpOnly.post(SettingOptions.url,SettingOptions.data,CommonOption)
}

async function uploadHttp(file,index){
    CommonOption.headers.Authorization = 'Bearer ' + Token
    let fileParms = new FormData();
    fileParms.append('file0', file)
    fileParms.append('key', recordid)
    fileParms.append('index', index)
    let option = {
        url: 'api/system/Upload',
        data: fileParms,
        ...CommonOption,
    }
    let result =  await Axios(option)
    if (!result.data.success) return Promise.reject({message:result.data.message})
}

async function upload(file){
    let start = 0
    let end
    let taskArray = []
    let queue = new Bobolink({
        // 最大并行数，最小为1
        concurrency: 5,
        // 任务超时时间ms，0不超时
        timeout: 0,
        // 任务失败重试次数，0不重试
        retry: 1,
        // 是否优先处理失败重试的任务，为true则失败的任务会被放置到队列头
        retryPrior: false,
        // 是否优先处理新任务，为true则新任务会被放置到队列头
        newPrior: false,
        // 最大可排队的任务数, -1为无限制, 超过最大限制时添加任务将返回错误'bobolink_exceeded_maximum_task_number'
        max: -1,
        // 指定任务的调度模式，仅在初始化时设置有效
        scheduling: {
          // 默认为'immediately'，任务将在队列空闲时立即得到调度。
          // 你也可以将它设置为'frequency', 并且指定countPerSecond, Bobolink将严格地按照设定的频率去调度任务。
          enable: 'immediately',
          frequency: {
            // 每秒需要调度的任务数，仅在任务队列有空闲时才会真正调度。
            countPerSecond: 10000
          }
        },
        // 任务失败的handler函数，如果设置了重试，同个任务失败多次会执行catch多次
        catch: (err) => {
     
        }
     });
    for (let index = 0; index < count; index++) {
        end = start + perSize
        let _file = file.slice(start, end)
        start = end
        // taskArray.push(uploadHttp(_file,index))
        taskArray.push(()=>uploadHttp(_file,index))
    }
    await queue.put(taskArray)
    // await Promise.all(taskArray)
}



async function finishUpload(){
    let result = await Axios({url:'api/system/FinishUpload',data:{key:recordid}})
    if (!result.data.success) return Promise.reject({message:result.data.message})
    return result.data.content
}

async function uploadFile(file){
    Token = storage.fetch('Token').data
    count = Math.ceil(file.size / perSize)
    try {
        await beginUpload(file.name,count)
        await upload(file)
        let res = await finishUpload()
        return res
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
}

export default uploadFile
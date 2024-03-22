import OriginAxios from 'axios'
import { storage } from '@/js/until'
import { formOption } from './config'


export default function fileAxios(files, mainId) {
    let Token = storage.fetch('Token').data
    if (Token) {
        formOption.headers.Authorization = 'Bearer ' + Token
    }
    let fileParms = new FormData();
    for (let i = 0; i < files.length; i++) {
        fileParms.append('file' + i, files[i])
    }
    if (mainId) {
        fileParms.append('MainId', mainId)
    }
    let option = {
        url: 'api/Wechat/UploadToMainId',
        data: fileParms,
        ...formOption,
    }
    return OriginAxios(option)
}
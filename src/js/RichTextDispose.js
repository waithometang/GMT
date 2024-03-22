import { WcChatPreviewImage }from '@/js/WeChatpreviewImage'
  /**
   *  富文本内容集中处理
   */
 export const _RichTextDispose =  function RichTextDispose() {
  GetTable()
  GetImageChage()
}

/**
 *  富文本图片集中处理
 */
function GetImageChage () {
  let image = document.getElementsByTagName('img')
  let dome = document.getElementsByTagName('a')
  for (let i = 0; i<dome.length; i++) {
    let elenm = dome[i]
    let str = elenm.innerHTML
    if (str.indexOf('img') > 0) {
      elenm.onclick = function (params) {
        return false
      }
    }
  }
  const clientWidth = document.documentElement.clientWidth
  for (let index = 0; index < image.length; index++) {
    const img = image[index]
    const img_id = img.id
    if ( img_id !== 'GMT_min_icon') {
      if (img.src.indexOf('/gmt/FiWebEditor/sysimage/icon16/') === -1) {
        img.style.width = 94 + 'vw'
        img.style.pointerEvents  = 'all'
        img.onclick = function () {
          let url = img.src
          let arr = [url]
          WcChatPreviewImage(url, arr)
        }
      }
    }
  }
}
/**
 * 富文本 表格集中处理
 * */
function GetTable () {
  let dome = document.getElementsByTagName('table')
  const clientWidth = document.documentElement.clientWidth
  for (let index = 0; index < dome.length; index++) {
    const element = dome[index];
    element.style.width = 94+ 'vw'
  }
}
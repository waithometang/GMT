
import Axios from './axios'

export function PartyMemberLogin (SettingData) {
  let url =  'api/MemberLogin/PartyMemberLogin'
  let data = SettingData

  return Axios({
    url,
    data
  })
}
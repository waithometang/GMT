export default {
  SET_showToast (state, v) {
    state.showToast = v
  },
  Set_toastMsg (state, v) {
    state.toastMsg = v
  },
  SetDocumentTitle (state, v) {
    document.title=v.v
    state.documentTitle[v.k] = v.v
  },
  SET_StateType (state, v) {
    state.StateType = v
  },
  SET_StateFlag (state, v) {
    state.StateFlag = v
  },
  SET_StateTypeData (state, v) {
    state.StateTypeData = v
  },
  SetHeadImageBanner (state, v) {
    state.HeadImageBanner = v
  },
  Set_ButtomTageState(state, v) {
    state.ButtomTageState = v
  },
  SetUploadPicturesSrc(state, v) {
    state.UploadPicturesSrc = v
  },
  SetMedialdsList(state, v) {
    state.MedialdsList = v
  },
  SetMainIdData(state, v) {
    state.MainIdData = v
  },
  SetStartRecordId(state, v) {
    state.StartRecordId = v
  },
  SetWaChetLatitude(state, v) {
    state.WaChetLatitude = v
  },
  SetWaChetLongitude(state, v) {
    state.WaChetLongitude = v
  },
  SetsetIphoneShareUrl (state, v) {
    state.setIphoneShareUrl = v
  },
  SET_TxGeocodeData (state, v) {
    state.TxGeocodeData = v
  },
  Set_TopTagState (state, v) {
    state.TopTagState = v
  },
  Set_party_stateType (state, v) {
    state.party_stateType = v
  },
  Set_userinfo (state, v) {
    state.userinfo = v
  },
  Set_GmtLoadingState (state, v) {
    state.GmtLoadingState = v
  },
  Set_GmtpopupState (state, v) {
    state.GmtpopupState = v
  },
  Set_GmtpopupContent (state, v) {
    state.GmtpopupContent = v
  },
  Set_GmtpopupCancel (state, v) {
    state.GmtpopupCancel = v
  },
  Set_GmtpopupConfirm (state, v) {
    state.GmtpopupConfirm = v
  },
  Set_failStata (state, v) {
    state.failStata = v
  },
  Set_FbInfo (state, v) {
    state.FbInfo = v
  },
  Set_FbInfoTag (state, v) {
    state.FbInfoTag = v
  },
  Set_GmtMessageBox (state, v) {
    state.GmtMessageBox = v
  },
  Set_GmtMessageBoxContent (state, v) {
    state.GmtMessageBoxContent = v
  },
  Set_GmtMessageBoxCancel (state, v) {
    state.GmtMessageBoxCancel = v
  },
  SetpublicMessage (state, v) {
    state.publicMessage = v
  },
  SetinFoData (state, v) {
    state.inFoData = v
  },
  SetzxdtTagStata (state, v) {
    state.zxdtTagStata = v
  },
  SetindexBenner (state, v) {
    state.indexBenner = v
  },
  SetbuttomTab (state, v) {
    state.buttomTab = v
  },
  SetlbTab (state, v) {
    state.lbTab = v
  },
  SetlbTab1 (state, v) {
    state.lbTab1 = v
  },
  SetruleInfo (state, v) {
    state.ruleInfo = v
  },
  SetmessageBut (state, v) {
    state.messageBut = v
  },
  SetvoteMessage (state, v) {
    state.voteMessage = v
  },
  SetvoteHasTj (state, v) { //是否有投票抽奖
    state.voteHasTj = v
  },
  SetvoteContent (state, v) {
    state.voteContent = v
  },
  SetshowIcon (state, v) {
    state.showIcon = v
  },
  Setincrease (state, v) {
    state.increase = v
  },
  SetincreaseNumber (state, v) {
    state.increaseNumber = v
  },
  SetfntrlState (state, v) {
    state.fntrlState = v
  },
  Setquestionnaire_bg (state, v) {
    state.questionnaire_bg = v
  },
  Clear_ZkbmData (state, id) {
    state.zkbmData = {}
    localStorage.removeItem('tempZkbmData'+id)
  },
  Clear_JszpData (state, id) {
    state.jszpData = {}
    sessionStorage.removeItem('jszpDataGWXX') 
    localStorage.removeItem('tempJszpData'+id)
  }
}

import Vue from 'vue';
import SubscribeCom from './SubscribeCom';

const Subscribe = Vue.extend(SubscribeCom)
SubscribeCom.install = () => {
  let instance = new Subscribe({}).$mount()
  document.body.appendChild(instance.$el)
  return instance.install()
}

export default SubscribeCom
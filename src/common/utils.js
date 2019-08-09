import CryptoJS from "crypto-js";

export const filter = {
  // 正则千分符
  kiloReg: (str) => {
    let num = str ? str.toFixed(2) : '0.00'
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  formatDate: (string) => {
    if (!string || string === '') {
      return ''
    }
    let dateObject = new Date(string)
    let year = dateObject.getFullYear()
    let month = dateObject.getMonth() + 1
    let date = dateObject.getDate()
    let hour = dateObject.getHours()
    let minutes = dateObject.getMinutes()
    let seconds = dateObject.getSeconds()
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds
  },
  formatNull: (item) => item || '--',
  hideCardNo: (cardNo) => (cardNo.substr(-4)),
  formatAmount: (money) => (parseFloat(money) / 100), //将分转换成元
  formatTime: (time) => (time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6))

}

function format (num) {
  return num >= 10 ? num : '0' + num
}

//获取当前时间 格式为YYYYMMDD HH:MM:SS
export const formatDate = () => {
  let dateObject = new Date()
  let year = dateObject.getFullYear()
  let month = dateObject.getMonth() + 1
  let date = dateObject.getDate()
  let hour = dateObject.getHours()
  let minutes = dateObject.getMinutes()
  let seconds = dateObject.getSeconds()
  return year + format(month) + format(date) + ' ' + format(hour) + ':' + format(minutes) + ':' + format(seconds)
}

//将金额转换为分
export const formatMoney = (money) => {
  return (parseFloat(money) * 100).toString()
}

export const regCollection = {
  mobileReg: /^1[3456789]\d{9}$/,
  phoneReg: /^0\d{2,3}-?\d{7,8}$/,
  smsCodeReg: /^\d{6}$/,
  idCardReg: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
  emailReg: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  numberReg: /^[0-9]*$/,
  positiveInteger: /^[1-9]\d*$/,
  bankNumReg: /^\d{16,19}$/,
  userNameReg: /^[0-9A-Za-z]{6,20}$/,
  payPwdReg: /^(\d)\1{5}$/ //不重复6位
}

export const formatBanners = (Banners) => {
  return Banners.map((item) => (item.title || '') + '@' + item.imgurl + '@' + (item.link || '')).join(';')
}

export const encryptByDES = (message) => {
  const keyHex = CryptoJS.enc.Utf8.parse('f38e365d31a585ccce4d3f63');
  const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    iv: CryptoJS.enc.Utf8.parse("01234567"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// export const formatNull = (item) => item || '--'

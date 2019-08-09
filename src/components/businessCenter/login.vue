<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="box">
      <div class="left">
        <img :src="loginLeft" alt/>
      </div>
      <div class="right">
        <el-col :span="18">
          <el-form :model="params" :rules="rules" ref="loginForm">
            <el-form-item prop="mobile">
              <el-input v-model="params.mobile" prefix-icon="iconfont icon-shouji" clearable
                        placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="params.password" prefix-icon="iconfont icon-42" clearable type="password"
                        placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" clearable>
              <el-col :span="18">
                <el-input v-model="params.captcha" prefix-icon="iconfont icon-yanzhengyanzhengma"
                          clearable placeholder="验证码">
                  <i slot="suffix" class="iconfont icon-update" @click.prevent="refreshCaptcha"></i>
                </el-input>
              </el-col>
              <el-col :span="6">
                <img :src="codeImgPath" alt="验证码" width="100%" height="40px" @click.prevent="refreshCaptcha">
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="6">
                <router-link to="/b_register">注册账户</router-link>
              </el-col>
              <el-col :span="6" :offset="12">
                <router-link to="/forgetLogin">忘记密码?</router-link>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button class="login" plain @click="login('loginForm')">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import {login, getIdentifyingCode} from '../../apis/login'
import {getPwdByEncrypt} from '@/apis/common'
import {regCollection,encryptByDES} from '@/common/utils'
// import {md5} from 'js-md5'
import axios from 'axios'

export default {
  data () {
    return {
      phoneToken: "",
      params: {},
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      refresh: require("../../assets/img/refresh.png"),
      loginLeft: require("../../assets/img/loginLeft.png"),
      passImg: require("../../assets/img/password.png"),
      mobileImg: require("../../assets/img/mobile.png"),
      secure: require("../../assets/img/secure.png"),
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")",
        height: ""
      },
      rules: {
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (value && value !== '') {
                console.log(value)
                if (!regCollection.mobileReg.test(value)) {
                  callback(new Error(`"${value}"手机号格式不正确`))
                }
                callback()
              } else {
                callback(new Error('请输入手机号码'))
              }
            },
            trigger: ['blur']
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        captcha: {required: true, message: '请输入验证码', trigger: 'blur'}
      },
      codeImgPath: this.$api.api + '/gw/personalCenter/captcha.jpg' //图片验证码地址
    };
  },
  mounted () {
    this.backgroundDiv1.height = document.documentElement.clientHeight + "px";
    // this.getCaptcha();
    console.log(this.codeImgPath)
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {mobile, password, captcha} = this.params
          //校验图片验证码
          axios.get(this.$api.api + '/gw/personalCenter/vertifyCaptcha?captcha=' + captcha).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.refreshCaptcha()
              getPwdByEncrypt({
                password:encryptByDES(password),
                type: '2'
              }).then(res => {
                if (res.code === 0) {
                  let encryptionPwd = res.data
                  login({
                    user_id: mobile,
                    password: encryptionPwd,
                    log_type: "01",
                    channel_no: "10",
                    op: "0",
                    res_id: "Pcweb"
                  }).then(res => {
                    if (res.code === '0000') {
                      this.$notify.success({
                        title: '成功',
                        message: '登录成功'
                      })
                      localStorage.setItem('user_id',res.user_id)
                      localStorage.setItem('userNumber',mobile)
                      localStorage.setItem('smid',res.smid)
                      this.$router.push('/b_frame01')
                    } else {
                      this.$notify.error({
                        title: '错误',
                        message: res.desc
                      })
                    }
                  })
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.msg
                  })
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              })
            }
          })
        }
      })
    },
    //刷新获取图形验证码
    refreshCaptcha () {
      this.codeImgPath = this.codeImgPath + '?' + Math.random()
    },
    // encryptByDES (message) {
    //   const keyHex = CryptoJS.enc.Utf8.parse('f38e365d31a585ccce4d3f63');
    //   const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    //     iv: CryptoJS.enc.Utf8.parse("01234567"),
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    //   return encrypted.toString();
    // },
    //图形验证码验证
    // captchaChecked () {
    //   let {mobile,captcha} = this.params
    //   console.log(captcha)
    //   axios.get(this.$api.api + '/gw/personalCenter/vertifyCaptcha?captcha=' + captcha).then(res => {
    //
    //   })
    // },
    //获取验证码
    getIdentifyingCode () {
      let {mobile} = this.params
      getIdentifyingCode({
        mobile,
        business_type: '02'
      }).then(res => {
        console.log(res)
      })
    },
    identifyingCodeChecked () {

    },
    //获取流水号
    randomNumber (len) {
      var day = new Date().getTime().toString();
      var len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZ0123456789";
      var maxPos = chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd + day;
    },
    getCode () {
      var that = this;
      var times = that.codeTime;
      if (this.mobile.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$notify.error({
          title: "手机号码格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (that.codetext !== "获取验证码") {
        // //console..log("stop");
        return;
      } else {
        var ti = setInterval(function () {
          times--;
          // //console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.$axios
        .post(
          this.SEVER,
          {
            mobile: this.mobile,
            business_type: "02" //登陆
          },
          {
            headers: {
              _si: "TRA003010152",
              _cn: "IFSP01",
              _tn: this.randomNumber(17)
            }
          }
        )
        .then(res => {
          console.log("发送验证码", res);
          if (res.data.code == "0000") {
            this.$notify({
              title: res.data.message,
              message: "请注意查收",
              type: "success",
              position: "bottom-right"
            });
          } else {
            clearInterval(ti);
            this.$notify.info({
              title: res.data.message,
              message: "",
              position: "bottom-right"
            });
          }
        });
    }
  },

  destroyed () {
    // loading.colse()
  }
};
</script>
<style scoped lang="scss">
  input {
    height: 36px;
    width: 120px;
  }

  .warp {
    width: 100%;
    background: no-repeat center top;
    background-size: 100% 100%;
  }

  @media all and (max-width: 1200px) {
    .warp {
      width: 1200px;
    }
  }

  .box {
    position: absolute;
    width: 724px;
    height: 520px;
    top: 50%;
    left: 50%;
    margin-left: -362px;
    margin-top: -260px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }

  .left {
    width: 254px;
    height: 520px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background: linear-gradient(0, #1eb381 0%, #7ade92 100%);

    img {
      height: 520px;
    }
  }

  .right {
    width: 470px;
    height: 520px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a {
      cursor: pointer;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 143, 255, 1);
    }
  }

  .login {
    cursor: pointer;
    width: 100%;
    height: 42px;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  }
</style>

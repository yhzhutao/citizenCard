<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="box">
      <div class="left">
        <img :src="loginLeft" alt/>
      </div>
      <div class="right">
        <p class="title">注册</p>
        <el-form :model="params" :rules="rules" ref="registerForm">
          <el-form-item prop="mobile">
            <el-input v-model="params.mobile" clearable placeholder="11位手机号码">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="veriCode">
            <el-row>
              <el-col :span="14">
                <el-input v-model="params.veriCode" clearable placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="6" :offset="2">
                <el-button @click="getIdentifyingCode">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="params.password" type="password" clearable placeholder="设置登陆密码（8~20位）"></el-input>
          </el-form-item>
          <el-form-item prop="passwordChecked">
            <el-input v-model="params.passwordChecked" type="password" clearable placeholder="确认密码(8~20位)"></el-input>
          </el-form-item>
          <div class="promise">
            <span>注册即表示同意</span>
            <p @click="openUrl('https://weixin.96225.com/weixin/yhzcxy.html')">《用户注册协议》</p>
            <p @click="openUrl('https://smkmpop.96225.com/storage/protocol/smkzhxy.html')">《账户服务协议》</p>
          </div>
          <el-form-item>
            <el-button class="register" plain @click="register('registerForm')">注册</el-button>
          </el-form-item>
          <div class="login">
            <router-link to="/b_login">使用已有账户登录</router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
import {getIdentifyingCode, identifyingCodeChecked, createUser} from '@/apis/register'
import {getPwdByEncrypt} from '@/apis/common'
import {regCollection, encryptByDES} from '@/common/utils'

export default {
  data () {
    return {
      params: {},
      ti: "",
      phoneToken: "",
      name: "",
      password: "",
      passwordT: "",
      number: "",
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      loginLeft: require("../../assets/img/loginLeft.png"),
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")",
        height: ""
      },
      rules: {
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (value && value !== '') {
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
          {
            validator: (rule, value, callback) => {
              if (value && value !== '') {
                if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/).test(value)) {
                  callback(new Error('密码必须是8-20位（数字+字母）'))
                }
                callback()
              } else {
                callback(new Error('请输入密码'))
              }
            },
            trigger: ['blur']
          }
          // {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        passwordChecked: [
          {
            validator: (rule, value, callback) => {
              if (value && value !== '') {
                if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/).test(value)) {
                  callback(new Error('密码必须是8-20位（数字+字母）'))
                }
                callback()
              } else {
                callback(new Error('请输入确认密码'))
              }
            },
            trigger: ['blur']
          }
        ],
        veriCode: {required: true, message: '请输入验证码', trigger: 'blur'}
      }
    };
  },
  mounted () {
    this.backgroundDiv1.height =
      document.documentElement.clientHeight - 0 + "px";
  },
  methods: {
    register (formName) {
      let {mobile, veriCode, password, passwordChecked} = this.params
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (password === passwordChecked) {
            //校验验证码
            identifyingCodeChecked({
              mobile,
              business_type: '01',
              veri_code: veriCode
            }).then(res => {
              if (res.code === '0000') {
                // 这里还需要多调用一个获取加密后的密码的接口
                getPwdByEncrypt({
                  password: encryptByDES(password),
                  type: '2'
                }).then(res => {
                  if (res.code === 0) {
                    let encryptionPwd = res.data
                    //注册用户
                    createUser({
                      user_id: mobile,//用户名
                      // password: 'AC7728125A1A0A86',//密码
                      password: encryptionPwd,
                      user_system: '0035',//用户子系统
                      user_type: '0',//用户类型
                      user_name_type: '1'//用户名类型
                    }).then(res => {
                      if (res.code === '0000') {
                        this.$notify.success({
                          title: '成功',
                          message: '用户注册成功'
                        })
                        localStorage.setItem("user_id", res.user_id)
                        localStorage.setItem("userNumber", mobile)
                        this.$router.push('/authentication_name')
                      } else {
                        this.$notify.error({
                          title: '错误',
                          message: res.message
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
                  message: res.desc
                })
              }
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '两次输入的密码不一致'
            })
          }
        }
      })
    },
    //获取验证码
    getIdentifyingCode () {
      let {mobile} = this.params
      getIdentifyingCode({
        mobile,
        business_type: '01'
      }).then(res => {
        if (res.code === '0000') {
          this.$notify.success({
            title: '成功',
            message: '验证码发送成功'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    //校验验证码
    identifyingCodeChecked () {
      let {mobile} = this.params
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
      var ti = "";
      var that = this;
      var times = that.codeTime;
      if (this.number.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.$notify.error({
          title: "手机号码格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (that.codetext !== "获取验证码") {
        return;
      } else {
        this.ti = setInterval(function () {
          times--;
          ////console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(this.ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.$axios
        .post(
          this.SEVER,
          {
            mobile: this.number,
            business_type: "01" //注册
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
            clearInterval(this.ti);
            this.codetext = "获取验证码";
            this.$notify.info({
              title: res.data.message,
              message: "",
              position: "bottom-right"
            });
          }
        });
    },
    //验证 验证码
    verify_sms_code () {
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      const _key = "f38e365d31a585ccce4d3f63";
      const _password = this.password;
      var md5 = encryptByDES(_password, _key);
      console.log(_password);
      console.log(md5);
      //创建用户
      this.$axios
        .post(
          this.SEVER,
          {
            user_id: this.number,
            password: "AC7728125A1A0A86",
            user_name_type: "1",
            user_system: "0035",
            user_type: "0"
          },
          {
            headers: {
              _si: "TRA003010101",
              _cn: "IFSP01",
              _tn: "1EE5C59F0A1700100057306C855BFBB0"
            }
          }
        )
        .then(res => {
          loading.close();
          console.log('注册', res);
          if (res.data.code == "0000") {
            this.$notify({
              title: "注册成功",
              message: "",
              type: "success",
              position: "bottom-right"
            });
            localStorage.setItem("user_id", res.data.user_id);
            localStorage.setItem("invite_code", res.data.invite_code);
            localStorage.setItem("userNumber1", this.number);
            localStorage.setItem(
              "userNumber",
              this.number.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
            );
            this.$router.replace({name: "authentication_name"});
          } else {
            clearInterval(this.ti);
            this.codetext = "获取验证码";
            this.code = "";
            this.number = "";
            this.passwordT = "";
            this.password = "";
            this.$notify.info({
              title: res.data.message,
              message: "",
              position: "bottom-right"
            });
          }
        });

      //加密 Des3
      function encryptByDES (message, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
          iv: CryptoJS.enc.Utf8.parse("01234567"),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
      }
    },
    openUrl (url) {
      window.open(url);
    }
  },
  destroyed () {
    // loading.colse()
  }
};
</script>
<style scoped lang="scss">
  .warp {
    width: 100%;
    background: no-repeat center top;
    background-size: 100% 100%;
  }

  .title {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    letter-spacing: 3px;
    margin-bottom: 20px;
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
  }

  .left img {
    height: 520px;
  }

  .right {
    width: 470px;
    height: 520px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .number {
    width: 50px;
    text-align: center;
    height: 23px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 23px;
    border-right: 1px solid rgba(151, 151, 151, 1);
  }

  .other {
    width: 270px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 143, 255, 1);
    margin: 6px auto 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register {
    width: 100%;
    height: 42px;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  }

  .login {
    cursor: pointer;
    margin-top: 20px;
    color: #000;
  }

  .login a {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 143, 255, 1);
  }

  .promise {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 11.5px;
    margin-bottom: 15px;
  }

  .promise p {
    color: rgba(0, 143, 255, 1);
    cursor: pointer;
  }
</style>

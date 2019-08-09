<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="box">
      <div class="left">
        <img :src="loginLeft" alt>
      </div>
      <div class="right">
        <p class="title">重置登陆密码</p>
        <el-form :model="params" :rules="rules" ref="resetPasswordForm">
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
                <el-button @click="getIdentifyingCode()">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="params.password" type="password" clearable placeholder="8~20位密码（数字+字母），区分大小写"></el-input>
          </el-form-item>
          <el-form-item prop="passwordChecked">
            <el-input v-model="params.passwordChecked" type="password" clearable placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="register" plain @click="reset('resetPasswordForm')">确认重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
import {getIdentifyingCode, identifyingCodeChecked, resetLoginPwd} from '@/apis/forgetL'
import {getPwdByEncrypt} from '@/apis/common'
import {regCollection, encryptByDES} from '@/common/utils'

export default {
  data () {
    return {
      ti: "",
      phoneToken: "",
      name: "",
      password: "",
      passwordT: "",
      number: "",
      loginLeft: require("../../assets/img/loginLeft.png"),
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")",
        height: ""
      },
      params: {},
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
      document.documentElement.clientHeight - 1 + "px";
  },
  methods: {
    getIdentifyingCode () {
      console.log(88888888)
      let {mobile} = this.params
      getIdentifyingCode({
        mobile,
        business_type: '02'
      }).then(res => {
        if (res.code === '0000') {
          this.$notify.success({
            title: '成功',
            message: res.message
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    reset (formName) {
      let {mobile, veriCode, password, passwordChecked} = this.params
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (password === passwordChecked) {
            //验证码校验
            identifyingCodeChecked({
              mobile,
              business_type: '02',
              veri_code: veriCode
            }).then(res => {
              if (res.code === '0000') {
                //获取加密后的密码
                getPwdByEncrypt({
                  password:encryptByDES(password),
                  type: '2'
                }).then(res => {
                  if (res.code === 0) {
                    let encryptionPwd = res.data
                    //重置登录密码
                    resetLoginPwd({
                      user_name: mobile,
                      password_new: encryptionPwd
                    }).then(res => {
                      if (res.code === '0000') {
                        this.$notify.success({
                          title: '成功',
                          message: '密码重置成功'
                        })
                        this.$router.push('/b_login')
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
                      message: res.message
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
    }
  }
};
</script>
<style scoped>
  input {
    height: 36px;
    width: 90%;
    padding-left: 10px;
  }

  .warp {
    width: 100%;
    /* height: 800px; */
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

  .right ul li {
    border-radius: 2px;
    border: 1px solid rgba(151, 151, 151, 1);
    width: 270px;
    height: 36px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .right ul li:hover {
    border: 1px solid rgb(39, 192, 146);
  }

  .right ul li:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right ul li:last-child div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* width: 100px; */
  }

  .right-li-p {
    cursor: pointer;
    width: 130px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(19, 174, 127, 1);
    padding: 0 10px;
    height: 23 ps;
    line-height: 23px;
    border: none;
    border-radius: 0;
    border-left: 1px solid rgba(151, 151, 151, 1);
    /*background-color: none;*/
  }

  .right img {
    width: 16px;
    height: 20px;
    background: rgba(153, 153, 153, 1);
    margin: 0 11px 0 20px;
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
    /*cursor: pointer;*/
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
</style>

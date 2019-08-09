<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="modify">
      <p class="balance-tit">支付密码更改</p>
      <el-form :model="params" :rules="rules" ref="form" label-width="200px">
        <el-form-item label="手机号" prop="mobile">
          <el-col :span="10">
            <el-input v-model="params.mobile" placeholder="手机号" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="10">
            <el-input v-model="params.code" placeholder="验证码" clearable></el-input>
          </el-col>
          <el-col :span="3" :offset="3">
            <el-button type="success" @click="getCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="设置支付密码" prop="password">
          <el-col :span="10">
            <el-input v-model="params.password" type="password" placeholder="设置支付密码" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认支付密码" prop="passwordChecked">
          <el-col :span="10">
            <el-input v-model="params.passwordChecked" type="password" placeholder="确认支付密码" clearable></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="promise">
        <el-checkbox style="margin-right:0;" v-model="checked">已查看</el-checkbox>
        <span class="desc" @click="openUrl('https://mobilepay.96225.com/exthtml/agreement/kuaijiezhifuxieyi.html')">《快捷支付服务相关协议》</span>
        <!--<router-link to="https://mobilepay.96225.com/exthtml/agreement/kuaijiezhifuxieyi.html">《快捷支付服务相关协议》</router-link>-->
      </div>
      <el-row>
        <el-col :span="5" :offset="9">
          <el-button type="success" :disabled="!checked" @click="goNext('form')">确认</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame02";
import {resetPassword} from '@/apis/frame02.js'
import {regCollection, encryptByDES} from '@/common/utils'

export default {
  data () {
    return {
      codetext: "获取验证码",
      codeTime: 60,
      isNot: false,
      checked: false,
      name: [
        {value: "", name: "姓名"},
        {value: "", name: "身份证号"},
        {value: "", name: "身份证有效期"},
        {value: "", name: "职业"},
        {value: "", name: "联系地址"},
        {value: "", name: "支付密码"},
        {value: "", name: "密码确认"}
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      params: {},
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
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        password: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1 || !(/^\d{6}$/).test(value)) {
                callback('支付密码必须是6位数字且不能重复和连续')
              }
              callback()
            } else {
              callback(new Error('请输入支付密码'))
            }
          },
          trigger: 'blur'
        }],
        passwordChecked: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1 || !(/^\d{6}$/).test(value)) {
                callback('支付密码必须是6位数字且不能重复和连续')
              }
              callback()
            } else {
              callback(new Error('请输入确认支付密码'))
            }
          },
          trigger: 'blur'
        }]
      },
      phoneToken: '' //第二次调用resetPassword时的必传参数
    };
  },
  components: {
    frame
  },
  methods: {
    openUrl (url) {
      window.open(url);
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
      let {mobile} = this.params
      if (mobile) {
        resetPassword({
          version: '1.0.0',
          transCode: 'UP0007',
          reqSeq: this.randomNumber(17),
          chainNo: '008',
          psnid: localStorage.getItem('psnid'),
          userid: localStorage.getItem('user_id'),
          mobile,
          certType: '0',
          certNo: localStorage.getItem('id_no')
        }).then(res => {
          if (res.respCode === '00') {
            this.phoneToken = res.phoneToken
            this.$notify.success({
              title: '成功',
              message: '获取验证码成功'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.respDesc
            })
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请输入手机号'
        })
      }
    },
    getInput (e) {
      console.log(this.name[e].value);
    },
    goNext (formName) {
      let {mobile, code, password, passwordChecked} = this.params
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (password === passwordChecked) {
            resetPassword({
              version: '1.0.0',
              transCode: 'UP0007',
              reqSeq: this.randomNumber(17),
              chainNo: '008',
              psnid: localStorage.getItem('psnid'),
              userid: localStorage.getItem('user_id'),
              mobile,
              certType: '0',
              certNo: localStorage.getItem('id_no'),
              password: encryptByDES(password),
              verifycode: code,
              phoneToken: this.phoneToken
            }).then(res => {
              if (res.respCode === '00') {
                this.$notify.success({
                  title: '成功',
                  message: '支付密码重置成功'
                })
                this.$router.replace({name: "b_frame02"});
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.respDesc
                })
              }
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '两次输入的密码不一致'
            })
          }
        } else {
          return false
        }
      })
    }
    // getCode () {
    //   var that = this;
    //   var times = that.codeTime;
    //   if (that.codetext !== "获取验证码") {
    //     return;
    //   } else {
    //     var ti = setInterval(function () {
    //       times--;
    //       that.codetext = times + "s后获取";
    //       if (times < 1) {
    //         clearInterval(ti);
    //         that.codetext = "获取验证码";
    //       }
    //     }, 1000);
    //   }
    // }
  }
};
</script>
<style scoped>
  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .flex-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .modify {
    width: 1100px;
    margin: 50px auto;
    border-radius: 10px;
    box-shadow: 0 0 3px 3px #e5e5e5;
    padding: 60px;
  }

  .balance-tit {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 0 0 20px 30px;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 30px;
  }

  .input-ul li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 30px 0;
  }

  .input-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .input-left {
    width: 170px;
    margin-right: 32px;
    text-align: right;
  }

  .input-left-p2 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .name-tit {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 0 0 20px 30px;
    border-bottom: 1px solid #e7e7e7;
  }

  .forgetP {
    width: 130px;
    color: #62bd72;
    font-size: 14px;
    margin-left: 20px;
  }

  .next-go {
    text-align: center;
    margin: 50px auto 0;
    width: 180px;
    height: 40px;
    border-radius: 100px;
    line-height: 40px;
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  /* 获取验证码 */
  .code {
    width: 100px;
    height: 38px;
    margin-left: 18px;
    color: #ffffff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  }

  .promise {
    text-align: center;
    padding-top: 30px;
    margin-bottom: 30px;
  }

  .promise a {
    color: #4a90e2;
    font-size: 15px;
  }
  .desc{
    color: #4a90e2;
    cursor: pointer;
  }
</style>

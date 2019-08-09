<template>
  <div class="name">
    <el-card class="card">
      <div slot="header">
        身份信息认证
      </div>
      <el-row>
        <el-col :span="16">
          <el-form :model="params" :rules="rules" ref="identityForm" label-width="150px">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="params.name" placeholder="真实姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idnumber">
              <el-row>
                <el-input v-model="params.idnumber" placeholder="身份证号" @blur="createAccount" clearable></el-input>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有效截止日期" prop="idvldEnd">
                  <el-date-picker
                    v-model="params.idvldEnd"
                    type="date"
                    clearable
                    value-format="yyyyMMdd"
                    @change="changeDate"
                    placeholder="有效截止日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-checkbox v-model="checked" @change="changeChecked">长期有效</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="选择职业" prop="occupationCode">
              <el-select v-model="params.occupationCode" clearable placeholder="请选择">
                <el-option
                  v-for="item in occOptions"
                  :key="item.occupation_code"
                  :label="item.occupation_name"
                  :value="item.occupation_code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="params.address" type="textarea" clearable placeholder="联系地址"></el-input>
            </el-form-item>
            <el-form-item v-if="operation==='01'" label="确认支付密码" prop="confirmPwd">
              <el-input v-model="params.confirmPwd" type="password" clearable placeholder="请输入6位支付密码（6位数字）"></el-input>
            </el-form-item>
            <el-form-item v-if="operation==='02'" label="设置6位支付密码">
              <p>密码不可与交易密码一致</p>
            </el-form-item>
            <el-form-item v-if="operation==='02'" label="支付密码" prop="paymentPwd">
              <el-input v-model="params.paymentPwd" type="password" clearable
                        placeholder="支付密码（6位数字且不能重复或连续）"></el-input>
            </el-form-item>
            <el-form-item v-if="operation==='02'" label="确认支付密码" prop="paymentPwdAgain">
              <el-input v-model="params.paymentPwdAgain" type="password" clearable
                        placeholder="确认支付密码（6位数字且不能重复或连续）"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="9">
          <el-button type="success" @click="nextStep('identityForm')">下一步</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  getOccOptions,
  createAccount,
  userDtlUpd,
  paymentPwdChecked,
  updateUser,
  setPaymentPwd,
  addPsnidInfo
} from '@/apis/authentication'
import {getPwdByEncrypt} from '@/apis/common'
import {encryptByDES, regCollection} from '@/common/utils'

export default {
  name: "name",
  data () {
    return {
      params: {
        idvldEnd:''
      },
      occOptions: [],
      operation: '02',
      rules: {
        name: {required: true, message: '请输入姓名', trigger: 'blur'},
        idnumber: {required: true, message: '请输入身份证号码', trigger: 'blur'},
        // idvldEnd: {required: true, message: '请选择有效截止日期', trigger: 'change'},
        idvldEnd: [{
          validator: (rule, value, callback) => {
            if (!this.checked) {
              if (value && value !== '') {
                callback()
              }else{
                callback('必须选择身份证有效结束日期或勾选长期有效')
              }
            } else {
              callback()
            }
          }
        }],
        occupationCode: {required: true, message: '请选择职业', trigger: 'change'},
        address: {required: true, message: '请输入联系地址', trigger: 'blur'},
        paymentPwd: [{
          validator: (rule, value, callback) => {
            if (this.operation === '02') {
              if (value && value !== '') {
                if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1 || !(/^\d{6}$/).test(value)) {
                  callback('支付密码必须是6位数字且不能重复和连续')
                }
                callback()
              } else {
                callback(new Error('请输入支付密码'))
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        paymentPwdAgain: [{
          validator: (rule, value, callback) => {
            if (this.operation === '02') {
              if (value && value !== '') {
                if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1 || !(/^\d{6}$/).test(value)) {
                  callback('支付密码必须是6位数字且不能重复和连续')
                }
                callback()
              } else {
                callback(new Error('请输入支付密码'))
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        confirmPwd: [{
          validator: (rule, value, callback) => {
            if (this.operation === '01') {
              if (value && value !== '') {
                // if([...[...value].reduce((res,c)=>{res[c]?res[c]++:res[c]=1;return res},{})].length!==1){
                //   callback()
                // }else{
                //   callback(new Error('密码不能全部重复'))
                // }
                callback()
              } else {
                callback(new Error('请输入确认密码'))
              }
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      },
      checked: false
    }
  },
  methods: {
    changeDate(){
      this.checked = false
    },
    changeChecked(){
      if(this.checked){
        this.params.idvldEnd=''
      }
    },
    nextStep (formName) {
      this.$refs[formName].validate((valid) => {
        let {name, idnumber, idvldEnd, occupationCode, address, paymentPwd, paymentPwdAgain, confirmPwd} = this.params
        if(this.checked){
          idvldEnd = '20991231'
        }
        if (valid) {
          updateUser({
            user_id: localStorage.getItem('user_id'),
            name,
            id_type: '01',//证件类型(1-身份证)
            id_no: idnumber,//证件号码
            idvld_end: idvldEnd,//有效截止日期
            occupation: occupationCode, //职业
            address //地址
          }).then(res => {
            if (res.code === '0000') {
              if (this.operation === '01') {
                paymentPwdChecked({
                  version: '1.0.0',
                  transCode: 'UP0009',
                  reqSeq: this.randomNumber(17), //请求流水号
                  chainNo: '008',
                  userid: localStorage.getItem('user_id'),
                  psnid: localStorage.getItem('psnid'),
                  paypassword: encryptByDES(confirmPwd)
                }).then(res => {
                  if (res.respCode == '00') {
                    this.$notify.success({
                      title: '成功',
                      message: '支付密码验证成功'
                    })
                    this.$router.push('/authentication_bank')
                  } else {
                    this.$notify.error({
                      title: '错误',
                      message: res.respDesc
                    })
                  }
                })
              } else {
                if (paymentPwd === paymentPwdAgain) {
                  // getPwdByEncrypt({
                  //   password: encryptByDES(paymentPwd),
                  //   type: '1'
                  // }).then(res => {
                  //   if (res.code === 0) {
                  let encryptionPwd = res.data
                  setPaymentPwd({
                    version: '1.0.0',
                    transCode: 'UP0006',
                    reqSeq: this.randomNumber(17), //请求流水号
                    chainNo: '008',
                    userid: localStorage.getItem('user_id'),
                    psnid: localStorage.getItem('psnid'),
                    type: 1,
                    oldpassword: '',
                    // newpassword: "LyJOr9uub/u5jNChYC873k8aGxsJdnORhJNVpaVoXdtEJgWMyw9EDRStDMblLXd3VjDqAggAZyvUF6LP/fI4W3OJqS9ELxE9yNEoLroJvlU+o/qiwtiKIcui4eGOluJLObMvHsoY/9jS16fg58LAb4OfGELSAe2/tnafmivPmq6f/ZMhdjH9hyPlhMpRZ/+RxvcnrchEHC1aB1Ov+i9nutZ5I80nDI5rUOP4w8kiKQ7+svnlM633aqFLgMBiAI3fkGZDMGLIad0o1djD5e1FpE4dQT7yG/hvyQYBOXH2An5zdcT8xpOxyjyB3aIhtnpHp9rgOo02kJSGMyA2rBFlkgHDs2cEBxmOTYla+mARJ10="
                    newpassword: encryptByDES(paymentPwd)
                  }).then(res => {
                    if (res.respCode === '00') {
                      this.$notify.success({
                        title: '成功',
                        message: '支付密码设置成功'
                      })
                      this.$router.push('/authentication_bank')
                    } else {
                      this.$notify.error({
                        title: '错误',
                        message: res.respDesc
                      })
                    }
                  })
                  // }
                  // })
                } else {
                  // console.log(333333)
                  this.$notify.error({
                    title: '错误',
                    message: '两次输入的密码不一致'
                  })
                }
              }
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              })
            }
          })
        }
      })
    },
    //获取职业类型
    getOccOptions () {
      getOccOptions({}).then(res => {
        if (res.code === '0000') {
          this.occOptions = res.list
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    },
    createAccount () {
      let {idnumber, name} = this.params
      if (idnumber && name) {
        createAccount({
          version: "1.0.1", //版本
          transCode: "UP0008", //交易代码
          chainNo: "008", //渠道号
          reqSeq: this.randomNumber(17), //请求流水号
          idnumber, //证件号码
          name,//姓名
          userid: localStorage.getItem("user_id"),
          mobile: localStorage.getItem("userNumber")
        }).then(res => {
          if (res.respCode === '00') {
            this.operation = res.operation
            localStorage.setItem('psnid', res.psnid)
            addPsnidInfo({
              userId: localStorage.getItem('user_id'),
              psnid: localStorage.getItem('psnid')
            }).then(res => {
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
          message: '姓名和身份证号码都不能为空'
        })
      }
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
  },
  mounted () {
    this.getOccOptions()
  }
}
</script>

<style scoped lang="scss">
  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh);

    .card {
      width: 80%;
      height: calc(90vh);
    }

    .el-select {
      width: 300px;
    }
  }
</style>

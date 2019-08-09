<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="nameBorder">
      <p class="name-tit">绑定银行卡</p>
      <el-form :model="params" :rules="rules" label-width="120px" ref="form">
        <el-form-item label="持卡人姓名" prop="name">
          <el-col :span="12">
            <el-input v-model="params.name" placeholder="持卡人姓名" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="银行卡号" prop="cardNo">
          <el-col :span="12">
            <el-input v-model="params.cardNo" placeholder="银行卡号" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="卡类型" prop="subCardType">
          <el-col :span="12">
            <el-select v-model="params.subCardType" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item v-if="params.subCardType==='C'" label="有效期" prop="validDate">
          <el-col :span="12">
            <el-date-picker
              v-model="params.validDate"
              type="date"
              placeholder="选择日期"
              clearable>
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item v-if="params.subCardType==='C'" label="cvv2" prop="cvv2">
          <el-col :span="12">
            <el-input v-model="params.cvv2" placeholder="cvv2" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-col :span="12">
            <el-input v-model="params.mobile" placeholder="手机号" clearable></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="identifyingCode">
          <el-col :span="6">
            <el-input v-model="params.identifyingCode" placeholder="验证码" clearable></el-input>
          </el-col>
          <el-col :span="3" :offset="3">
            <el-button @click="signAndGetCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="promise">
        <el-checkbox style="margin-right:0;" v-model="checked">已阅读并同意</el-checkbox>
        <span @click="openUrl('https://mobilepay.96225.com/exthtml/agreement/kuaijiezhifuxieyi.html')">《快捷支付协议》</span>
      </div>
      <!--<button @click="goNext('form')" class="next-go" :disabled="checked">确认绑定</button>-->
      <el-row>
        <el-col :span="3" :offset="9">
          <el-button type="success" @click="goNext('form')" :disabled="!checked">确认绑定</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame01";
import {sign,getBankInfo,verifySmsCode} from '@/apis/frame01.js'
import {regCollection } from '@/common/utils'

export default {
  data () {
    return {
      codetext: "获取验证码",
      codeTime: 60,
      isNot: false,
      checked: true,
      name: [
        {value: "", name: "姓名"},
        {value: "", name: "身份证号"},
        {value: "", name: "身份证有效期"},
        {value: "", name: "职业"},
        {value: "", name: "联系地址"},
        {value: "", name: "支付密码"},
        {value: "", name: "密码确认"}
      ],
      options: [{
          value: "D",
          label: "借记卡"
        },{
          value: "C",
          label: "贷记卡"
        }],
      value: "",
      mobile: '',
      params: {},
      rules:{
        name: {required: true, message: '请输入持卡人姓名', trigger: 'blur'},
        cardNo: {required: true, message: '请输入持卡人银行卡号', trigger: 'blur'},
        subCardType: {required: true, message: '请选择卡类型', trigger: 'change'},
        validDate:[
          {
            validator: (rule, value, callback) => {
              if(this.params.subCardType==='C'){
                if (value && value !== '') {
                  callback()
                } else {
                  callback(new Error('请选择有效期'))
                }
              }else{
                callback()
              }
            },
            trigger: ['blur']
          }
        ],
        cvv2:[
          {
            validator: (rule, value, callback) => {
              if(this.params.subCardType==='C'){
                if (value && value !== '') {
                  callback()
                } else {
                  callback(new Error('请输入cvv2'))
                }
              }else{
                callback()
              }
            },
            trigger: ['blur']
          }
        ],
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (value && value !== '') {
                if (!regCollection.mobileReg.test(value)) {
                  callback(new Error(`"${value}"手机号格式不正确`))
                }
                callback()
              } else {
                callback(new Error('请输入绑定银行卡手机号'))
              }
            },
            trigger: ['blur']
          }
        ],
        identifyingCode: {required: true, message: '请输入验证码', trigger: 'blur'},
      },
      token:'',
      phoneToken:''
    };
  },
  components: {
    frame
  },
  methods: {
    //获取17位流水号
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
    //获取验证码
    getIdentifyingCode () {
      let {mobile} = this.params
      this.$axios
        .post(
          this.SEVER,
          {
            mobile,
            business_type: '03'
          },
          {
            headers: {
              _si: "TRA003010152",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        ).then(res => {
        if (res.data.code === '0000') {
          this.$notify.success({
            title: '成功',
            message: '发送验证码成功'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.message
          })
        }
      })
    },
    getInput (e) {
      console.log(this.name[e].value);
    },
    goNext (formName) {
      this.$refs[formName].validate((valid)=>{
        if(valid){
          // let {mobile,identifyingCode} = this.params
          // verifySmsCode({
          //   mobile,
          //   business_type:'03',
          //   veri_code:identifyingCode
          // }).then(res=>{
          //   if(res.code==='0000'){
          //     this.sign()
          //   }else{
          //     this.$notify.error({
          //       title:'错误',
          //       message:res.desc
          //     })
          //   }
          // })
          this.sign()
        }
      })
    },
    getCode () {
      var that = this;
      var times = that.codeTime;
      if (that.codetext !== "获取验证码") {
        return;
      } else {
        var ti = setInterval(function () {
          times--;
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.getIdentifyingCode()
    },
    openUrl (url) {
      window.open(url);
    },
    //获取验证码 签约 先调一遍
    signAndGetCode () {
      let {name,mobile,subCardType,cardNo,validDate,cvv2} = this.params
      if(name&&mobile&&subCardType&&cardNo){
        if(subCardType==='D'){
          sign({
            version: "1.0.1", //版本
            transCode: "UP0011", //交易代码
            reqSeq: this.randomNumber(17), //请求流水号
            chainNo: "008", //渠道号
            psnid: localStorage.getItem('psnid'),
            name,
            certType:'0',
            certNo:localStorage.getItem('id_no'),
            phone:mobile,
            cardType: "YHK",
            subCardType,
            cardNo
          }).then(res => {
            if(res.respCode==='00'){
              this.$notify.success({
                title:'成功',
                message:'验证码发送成功'
              })
              this.token = res.token
              this.phoneToken = res.phoneToken
            }else{
              this.$notify.error({
                title:'错误',
                message:res.respDesc
              })
            }
          })
        }else{
          if(validDate&&cvv2){
            sign({
              version: "1.0.1", //版本
              transCode: "UP0011", //交易代码
              reqSeq: this.randomNumber(17), //请求流水号
              chainNo: "008", //渠道号
              psnid: localStorage.getItem('psnid'),
              name,
              certType:'0',
              certNo:localStorage.getItem('id_no'),
              phone:mobile,
              cardType: "YHK",
              subCardType,
              cardNo,
              validDate,
              cvv2
            }).then(res => {
              if(res.respCode==='00'){
                this.$notify.success({
                  title:'成功',
                  message:'验证码发送成功'
                })
                this.token = res.token
                this.phoneToken = res.phoneToken
              }else{
                this.$notify.error({
                  title:'错误',
                  message:res.respDesc
                })
              }
            })
          }else{
            this.$notify.error({
              title:'错误',
              message:'有效期 cvv2必填'
            })
          }
        }
      }else{
       this.$notify.error({
         title:'错误',
         message:'持卡人姓名 银行卡号 卡类型 手机号必填'
       })
      }
    },
    //确认绑定
    sign () {
      let {name,mobile,subCardType,cardNo,identifyingCode} = this.params
      sign({
        version: "1.0.1", //版本
        transCode: "UP0011", //交易代码
        reqSeq: this.randomNumber(17), //请求流水号
        chainNo: "008", //渠道号
        psnid: localStorage.getItem('psnid'),
        name,
        certType:'0',
        certNo:localStorage.getItem('id_no'),
        phone:mobile,
        cardType: "YHK",
        subCardType,
        cardNo,
        verCode:identifyingCode,
        token:this.token,
        phoneToken:this.phoneToken
      }).then(res => {
        if(res.respCode==='00'){
            this.$notify.success({
              title:'成功',
              message:'银行卡绑定成功'
            })
          this.$router.go(-1)
        }else{
          this.$notify.error({
            title:'错误',
            message:res.respDesc
          })
        }
      })
    },
    // getBankInfo(){
    //   let {cardNo} = this.params
    //   getBankInfo({
    //     version: "1.0.0", //版本
    //     transCode: "UP0005", //交易代码
    //     chainNo: "008", //渠道号
    //     reqSeq: this.randomNumber(17), //请求流水号
    //     cardNo
    //   }).then(res=>{
    //     // console.log(res)
    //     if(res.respCode=='00'){
    //       let {bankName} = res
    //       this.sign()
    //     }else{
    //       this.$notify.error({
    //         title:'错误',
    //         message:res.respDesc
    //       })
    //     }
    //   })
    // }
  }
};
</script>
<style scoped>
  .display-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .display-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .nameBorder {
    width: 1100px;
    border-radius: 15px;
    padding: 30px;
    margin: 50px auto;
    box-shadow: #e5e5e5 0 0 10px;
  }

  .input-ul li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 30px 0;
  }

  .input-left {
    width: 170px;
    margin-right: 32px;
  }

  .input-left-p1 {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 64, 43, 0);
    margin-right: 5px;
  }

  .input-left-p2 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .name-tit {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 0 0 20px 30px;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 30px;
  }

  .forgetP {
    width: 130px;
    color: #62bd72;
    font-size: 14px;
    margin-left: 20px;
  }

  .next-go {
    text-align: center;
    margin: 50px auto 30px;
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

  .promise span {
    color: #4a90e2;
    font-size: 15px;
    cursor: pointer;
  }
</style>

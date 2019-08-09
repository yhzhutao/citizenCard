<template>
  <div class="frame02">
    <frame/>
    <div style="height:80px;"></div>
    <div class="setting">
      <div style="border:1px solid #e5e5e5;" class="space-between">
        <div class="choiceTit">
          <p @click="choiceTit(0)" :class="{'choiceTit-p':choiceTr0}">基本信息</p>
          <p @click="choiceTit(1)" :class="{'choiceTit-p':choiceTr1}">安全设置</p>
        </div>
        <div v-if="choiceTr0" class="showCon">
          <ul class="showCon1">
            <li class="showCon1-li1">
              <span>姓名：</span>
              <p v-html="userDtl.name">张丹向</p>
              <span>性别：</span>
              <p v-html="sex">男</p>
              <span>手机号：</span>
              <p v-html="this.userNumber"></p>
              <!-- <img class="sex" :src="mlae" alt /> -->
            </li>
            <li>
              <span>实名认证：</span>
              <p v-if="userDtl">已实名认证</p>
              <p v-else>未实名，去实名</p>
            </li>
            <li>
              <span>国籍（地区）：</span>
              <p>中国大陆</p>
            </li>
            <li>
              <span>证件类型：</span>
              <p>身份证</p>
            </li>
            <li class="idCard">
              <span>身份证号：</span>
              <p v-html="userDtl.id_no">31272*********2216</p>
              <span>身份证有效截止期：</span>
              <p v-if="userDtl.idvld_end">{{userDtl.idvld_end|formatTime}}</p>
            </li>
          </ul>
          <ul class="showConDet">
            <li>
              <p class="showConDet-p">职业信息：</p>
              <div @click="dialogTableVisible0 = true" class="changeCon flex-end">
                <span v-html="userDtl.occupation">公务员</span>
                <img :src="next" alt/>
              </div>
            </li>
            <li>
              <p class="showConDet-p">联系方式：</p>
              <div class="changeCon flex-end">
                <span>{{showMobile}}</span>
                <!--<img :src="next" alt/>-->
              </div>
            </li>
            <li>
              <p class="showConDet-p">详细地址：</p>
              <div @click="dialogTableVisible2 = true" class="changeCon flex-end">
                <span v-html="userDtl.address">这家昂生</span>
                <img :src="next" alt/>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="choiceTr1" class="showCon">
          <div class="showCon2">
            <div class="pasCh">
              <div class="flex-start">
                <img :src="passW" alt/>
                <div>
                  <p>登录密码</p>
                  <p>登录密码为登录时所填写的密码</p>
                </div>
              </div>
              <button @click="dialogTableVisible3=true">修改</button>
            </div>
          </div>
          <div class="showCon2">
            <div class="pasCh">
              <div class="flex-start">
                <img :src="secure" alt/>
                <div>
                  <p>支付密码</p>
                  <p>支付密码为支付时所需填写的6位密码</p>
                </div>
              </div>
              <button @click="dialogTableVisible4=true">修改</button>
            </div>
          </div>
        </div>
        <!-- 修改职业信息 -->
        <el-dialog
          top="35vh"
          width="350px"
          :center="true"
          title="请选择职业信息"
          :visible.sync="dialogTableVisible0"
        >
          <div class="occupation">
            <el-select style="width:300px;" v-model="occupation" placeholder="请选择">
              <el-option
                @change="getInput(3)"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <p style="height:30px"></p>
            <button class="contact" @click="updateUser">确 定</button>
          </div>
        </el-dialog>
        <!-- 联系方式 -->
        <el-dialog
          top="35vh"
          width="350px"
          :center="true"
          title="修改联系方式"
          :visible.sync="dialogTableVisible1"
        >
          <div style="text-align:center">
            <el-input
              @change="getInput(1)"
              style="width:300px;"
              placeholder="请输入"
              v-model="mobile"
              type="number"
              oninput="if(value.length>11)value=value.slice(0,11)"
              clearable
            ></el-input>
            <p style="height:30px"></p>
            <button class="contact" @click="updateUser">确 定</button>
          </div>
        </el-dialog>
        <!-- 详细地址 -->
        <el-dialog
          top="35vh"
          width="350px"
          :center="true"
          title="修改详细地址"
          :visible.sync="dialogTableVisible2"
        >
          <div style="text-align:center">
            <el-input
              @change="getInput(2)"
              style="width:300px;"
              placeholder="请输入"
              v-model="address"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              clearable
            ></el-input>
            <p style="height:30px"></p>
            <button class="contact" @click="updateUser">确 定</button>
          </div>
        </el-dialog>
        <!-- 修改登陆密码 -->
        <el-dialog width="350px" :center="true" title="修改登陆密码" :visible.sync="dialogTableVisible3">
          <el-form :model="loginParams" :inline="true" :rules="loginRules" ref="loginForm">
            <p class="desc">密码请设置8-20位（数字+字母）</p>
            <el-form-item label="当前密码" prop="passwordOld">
              <el-input v-model="loginParams.passwordOld" type="password" placeholder="当前密码"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="passwordNew">
              <el-input v-model="loginParams.passwordNew" type="password" placeholder="新的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordNewChecked">
              <el-input v-model="loginParams.passwordNewChecked" type="password" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="2" :offset="10">
                <el-button type="success" @click="modifyPwd('loginForm')">确认</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
        <!-- 修改支付密码 -->
        <el-dialog width="350px" :center="true" title="修改支付密码" :visible.sync="dialogTableVisible4">
          <el-form :model="payParams" :inline="true" :rules="payRules" ref="payForm">
            <el-form-item label="当前密码" prop="passwordPayOld">
              <el-input v-model="payParams.passwordPayOld" type="password" placeholder="请输入旧支付密码"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="passwordPayNew">
              <el-input v-model="payParams.passwordPayNew" type="password" placeholder="请输入新的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordPayNewChecked">
              <el-input v-model="payParams.passwordPayNewChecked" type="password" placeholder="请输入新的确认密码"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="8" :offset="9">
                <el-button type="success" @click="modifyPayPwd('payForm')">确定</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="9">
                <p class="forgetPas">
                  <router-link to="/forgetPay">
                    忘记密码
                  </router-link>
                </p>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame02";
import {updateUser, changeLoginPwd, modifyPayPwd} from '@/apis/frame02.js'
import {getPwdByEncrypt} from '@/apis/common'
import {encryptByDES, regCollection} from '@/common/utils'

export default {
  data () {
    return {
      userDtl: "",
      userNumber: "",
      sex: '',//性别
      choiceTr0: true,
      choiceTr1: false,
      passW: require("../../../assets/img/password.png"),
      secure: require("../../../assets/img/secure.png"),
      next: require("../../../assets/img/nextB.png"),
      femlae: require("../../../assets/img/female.png"),
      dialogTableVisible0: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      loginErr: [
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false}
      ],
      loginPas: [{value: ""}, {value: ""}, {value: ""}],
      payErr: [
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false},
        {tr: false}
      ],
      payPas: [{value: ""}, {value: ""}, {value: ""}],
      name: [{value: ""}, {value: ""}, {value: ""}],
      options: [],
      showMobile: '',
      mobile: '',
      occupation: '',
      address: '',
      loginParams: {},//修改登录密码的参数
      payParams: {},//修改支付密码的参数
      loginRules: {
        passwordOld: {required: true, message: '请输入原密码', trigger: 'blur'},
        passwordNew: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/).test(value)) {
                callback(new Error('密码必须是8-20位（数字+字母）'))
              }
              callback()
            } else {
              callback(new Error('请输入新密码'))
            }
          },
          trigger: ['blur']
        }],
        passwordNewChecked: [{
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
        }]
      },
      payRules: {
        passwordPayOld: {required: true, message: '请输入原密码', trigger: 'blur'},
        passwordPayNew: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1) {
                callback('支付密码必须是6位数字且不能重复和连续')
              }
              callback()
            } else {
              callback(new Error('请输入新密码'))
            }
          },
          trigger: ['blur']
        }],
        passwordPayNewChecked: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (value.length !== 6 || regCollection.payPwdReg.test(value) || '0123456789_9876543210'.indexOf(value) > -1) {
                callback('支付密码必须是6位数字且不能重复和连续')
              }
              callback()
            } else {
              callback(new Error('请输入确认密码'))
            }
          },
          trigger: ['blur']
        }]
      }
    };
  },
  inject: ['reload'],
  components: {
    frame
  },
  methods: {
    //修改登录密码
    modifyPwd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {passwordOld, passwordNew, passwordNewChecked} = this.loginParams
          if (passwordNew === passwordNewChecked) {

            // let encryptionPwd = res.data
            // let encryptionPwd = await getPwdByEncrypt()
            getPwdByEncrypt({
              password: encryptByDES(passwordNew),
              type: '2'
            }).then(res => {
              if (res.code === 0) {
                let encryptionPwdNew = res.data
                getPwdByEncrypt({
                  password: encryptByDES(passwordOld),
                  type: '2'
                }).then(res => {
                  if (res.code === 0) {
                    let encryptionPwdOld = res.data
                    changeLoginPwd({
                      user_id: localStorage.getItem('user_id'),
                      password_old: encryptionPwdOld,
                      password_new: encryptionPwdNew,
                      action: '01'
                    }).then(res => {
                      if (res.code === '0000') {
                        this.$notify.success({
                          title: '成功',
                          message: '登录密码修改成功'
                        })
                        this.dialogTableVisible3 = false
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
                  message: res.message
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
    },
    //修改支付密码
    modifyPayPwd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let {passwordPayOld, passwordPayNew, passwordPayNewChecked} = this.payParams
          if (passwordPayNew === passwordPayNewChecked) {
            getPwdByEncrypt({
              password: encryptByDES(passwordPayNew),
              type: '1'
            }).then(res => {
              if (res.code === 0) {
                let encryptionPayPwdNew = res.data
                getPwdByEncrypt({
                  password: encryptByDES(passwordPayOld),
                  type: '1'
                }).then(res => {
                  if (res.code === 0) {
                    let encryptionPayPwdOld = res.data
                    modifyPayPwd({
                      version: "1.0.0", //版本
                      transCode: "UP0006", //交易代码
                      chainNo: "008", //渠道号
                      reqSeq: this.randomNumber(17), //请求流水号
                      psnid: localStorage.getItem('psnid'),
                      userid: localStorage.getItem("user_id"),
                      type: '2',
                      oldpassword: encryptionPayPwdOld,
                      newpassword: encryptionPayPwdNew
                    }).then(res => {
                      // console.log(222222, res)
                      if(res.respCode==='00'){
                        this.$notify.success({
                          title:'成功',
                          message:'支付密码修改成功'
                        })
                        this.dialogTableVisible4 = false
                      }else{
                        this.$notify.error({
                          title:'错误',
                          message:res.respDesc
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
                  message: res.message
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
    },
    //获取加密后的密码
    getPwdByEncrypt (password) {
      getPwdByEncrypt({
        password: encryptByDES(password),
        type: '2'
      }).then(res => {
        if (res.code === 0) {
          return res.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    choiceTit (e) {
      if (e == 0) {
        this.choiceTr0 = true;
        this.choiceTr1 = false;
      } else {
        this.choiceTr0 = false;
        this.choiceTr1 = true;
      }
    },
    // 登陆密码
    loginBlur (e, name, vi) {
      var pas = "";
      var err = "";
      if (name == "login") {
        pas = this.loginPas;
        err = this.loginErr;
      } else {
        pas = this.payPas;
        err = this.payErr;
      }
      if (e == 0) {
        if (pas[e].value.length < 1) {
          err[0].tr = true;
          return;
        } else {
          err[0].tr = false;
        }
        if (pas[0].value == pas[1].value) {
          err[7].tr = true;
          return;
        } else {
          err[7].tr = false;
        }
      }
      if (e == 1) {
        if (pas[e].value.length < 1) {
          err[1].tr = true;
          return;
        } else {
          err[1].tr = false;
        }
        if (pas[0].value == pas[1].value) {
          err[2].tr = true;
          return;
        } else {
          err[2].tr = false;
        }
        if (name == "login") {
          if (
            !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(pas[1].value)
          ) {
            err[3].tr = true;
            return;
          } else {
            err[3].tr = false;
          }
        } else {
          if (!/^\d{6}$/.test(pas[1].value)) {
            err[3].tr = true;
            return;
          } else {
            err[3].tr = false;
          }
        }
      }
      if (e == 2) {
        if (pas[e].value.length < 1) {
          err[4].tr = true;
          return;
        } else {
          err[4].tr = false;
        }
        if (pas[2].value == pas[1].value) {
          err[5].tr = false;
        } else {
          err[5].tr = true;
          return;
        }
        if (name == "login") {
          if (
            !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(pas[2].value)
          ) {
            err[6].tr = true;
            return;
          } else {
            err[6].tr = false;
          }
        } else {
          if (!/^\d{6}$/.test(pas[2].value)) {
            err[6].tr = true;
            return;
          } else {
            err[6].tr = false;
          }
        }

        if (vi == "999") {
          alert("ok");
        }
      }
    },
    //确认登陆密码
    confirmLogin (e) {
      for (var i = 0; i < 3; i++) {
        this.loginBlur(i, e, "999");
      }
    },
    //去实名
    goName () {
      this.$confirm("您还未进行实名认证，是否去实名认证", "实名认证", {
        closeOnClickModal: false,
        distinguishCancelAndClose: true,
        confirmButtonText: "确 定",
        cancelButtonText: "取 消"
      })
        .then(() => {
          this.$router.replace({name: "authentication_name"});
        })
        .catch(action => {
          this.$router.replace({name: "b_frame01"});
        });
    },
    //查询用户资料
    userDtlQuery () {
      this.$axios
        .post(
          this.SEVER,
          {user_id: localStorage.getItem("user_id")},
          {
            headers: {
              _si: "TRA003010136",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        )
        .then(res => {
          console.log("查询用户信息", res);
          if (res.data.code == "0000") {
            if (res.data.name) {
              this.sex = this.getSex(res.data.id_no)
              res.data.id_no = parseStringToStar(res.data.id_no);
              this.userDtl = res.data;
              this.getOcc();
            } else {
              this.goName();
            }
          }
        });

      function parseStringToStar (str) {
        return str.length > 5
          ? str.substr(0, 5) +
          new Array(str.length - 5).join("*") +
          str.substr(-5)
          : str;
      }
    },
    //获取用户基本信息 获取手机号
    getUserInfoSimp () {
      this.$axios
        .post(
          this.SEVER,
          {user_id: localStorage.getItem("user_id")},
          {
            headers: {
              _si: "TRA003010105",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        ).then(res => {
        if (res.data.code === '0000') {
          this.showMobile = res.data.list[0].mobile
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.message
          })
        }
      })
    },
    //获取职业种类
    getOcc () {
      this.$axios
        .post(
          this.SEVER,
          {},
          {
            headers: {
              _si: "TRA003010149",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        )
        .then(res => {
          console.log("职业类型", res);
          var occ = this.userDtl.occupation.replace(/\s/g, "");
          console.log(occ)
          if (res.data.code == "0000") {
            var list = res.data.list;
            for (var i in list) {
              this.options.push({
                value: list[i].occupation_code,
                label: list[i].occupation_name
              });
              if (occ == list[i].occupation_code) {
                this.userDtl.occupation = list[i].occupation_name;
                console.log(this.userDtl.occupation)
              }
            }
          }
        });
    },
    //获取17位随机数
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
    //获取性别
    getSex (cardNum) {
      if (parseInt(cardNum.substr(16, 1)) % 2 == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    //个人资料修改
    updateUser () {
      this.dialogTableVisible0 = false
      this.dialogTableVisible1 = false
      this.dialogTableVisible2 = false
      updateUser({
        user_id: localStorage.getItem('user_id'),
        mobile: this.mobile,
        occupation: this.occupation,
        address: this.address
      }).then(res => {
        console.log(1111122222222, res)
        if (res.code === '0000') {
          this.$notify.success({
            title: '成功',
            message: '个人信息修改成功'
          })
          this.reload()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    }
  },
  mounted () {
    if (localStorage.getItem("userNumber")) {
      this.userNumber = localStorage.getItem("userNumber");
    }
    this.userDtlQuery();
    this.getUserInfoSimp();
    if (this.$route.params.modify === 1) {
      this.choiceTr0 = false;
      this.choiceTr1 = true;
      this.dialogTableVisible4 = true;
    }
  }
};
</script>
<style scoped lang="scss">
  .frame02 {

    .desc{
      margin-bottom: 30px;
    }

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

    .setting {
      width: 1100px;
      margin: 50px auto;
      border-radius: 10px;
      box-shadow: 0 0 3px 3px #e5e5e5;
      padding: 60px;
    }

    .choiceTit {
      width: 25%;
      height: 700px;
      background: #f3f1f1;
    }

    .choiceTit p {
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 17px;
      color: #666666;
      background: #f3f1f1;
      cursor: pointer;
    }

    .choiceTit-p {
      color: #62bd72 !important;
      background: #ffffff !important;
    }

    .showCon {
      width: 75%;
    }

    .showCon1 {
      border-bottom: 1px solid #e5e5e5;
      padding: 0 0 30px;
      margin: 30px;
    }

    .showConDet {
      padding: 0 0 30px;
      margin: 30px;
    }

    .showConDet li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 30px;
      padding: 25px 0;
      border-bottom: 1px dashed #e5e5e5;
    }

    .showCon1 li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 30px;
    }

    .showCon1 li span {
      color: #666666;
      font-size: 15px;
      font-weight: 300;
    }

    .showCon1 li p {
      color: #333333;
      font-size: 16px;
      font-weight: 400;
      margin-right: 50px;
    }

    .idCard p:last-child {
      margin-right: 0 !important;
    }

    .showConDet-p {
      color: #666666;
      font-size: 15px;
      font-weight: 300;
    }

    .sex {
      width: 30px;
    }

    .changeCon {
      color: #333333;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
    }

    .changeCon img {
      width: 25px;
      height: 20px;
    }

    .pasCh {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      margin: 0 30px;
      padding: 20px 30px;
    }

    .pasCh p:first-child {
      font-size: 18px;
      color: #333333;
      line-height: 25px;
      font-weight: bold;
    }

    .pasCh p:last-child {
      font-size: 15px;
      color: #9d9d9d;
      line-height: 25px;
    }

    .pasCh img {
      width: 40px;
      margin-right: 10px;
    }

    .pasCh button {
      background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
      width: 80px;
      height: 35px;
      border-radius: 100px;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }

    /* 修改职业 */
    .occupation {
      text-align: center;
    }

    .contact {
      background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
      width: 80px;
      height: 35px;
      border-radius: 100px;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }

    .contactPas {
      margin-top: 30px;
      background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
      width: 230px;
      height: 42px;
      border-radius: 5px;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
    }

    .inputPas {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
    }

    .inputPas p {
      color: #666666;
      font-size: 15px;
      margin-right: 15px;
    }

    .msg {
      position: absolute;
      left: 80px;
      top: 42px;
      font-size: 12px;
      color: red;
    }

    .forgetPas {
      margin-top: 10px;
    }

    .forgetPas a {
      font-size: 14px;
      color: #4a90e2;
      text-decoration: underline;
    }

  }
</style>

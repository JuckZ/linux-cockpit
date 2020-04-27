// TODO:清理输入框默认值，修改滑块方式为下拉菜单
<template>
  <a-form
    id="login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'domainOrIP',
          {
            rules: [
              {
                required: true,
                message: 'Please input your server\'s ip address or domain!'
              }
            ]
          }
        ]"
        placeholder="IP address or Domin"
      >
        <a-icon slot="prefix" type="laptop" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-group>
        <a-row :gutter="0">
          <a-col :span="4">
            <a-switch
              defaultChecked
              checkedChildren="密码"
              unCheckedChildren="私钥"
              @change="changeLoginType"
            />
          </a-col>
          <a-col :span="20">
            <!-- 密码输入框 -->
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                }
              ]"
              type="password"
              placeholder="Password"
              v-show="userInfo.loginType === 'password'"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
            <!-- 文件选择框 -->
            <a-upload
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              v-show="userInfo.loginType === 'privateKey'"
              @change="uploadPrivateKey"
            >
              <a-button> <a-icon type="upload" />Click to Upload </a-button>
            </a-upload>
          </a-col>
        </a-row>
      </a-input-group>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true
          }
        ]"
        >Remember me</a-checkbox
      >
      <a-button type="primary" html-type="submit" class="login-form-button"
        ><a-icon type="login" />Log in</a-button
      >
      <a-button type="default" @click="skipLogin"
        >Skip Login<a-icon type="right"
      /></a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// 导入事件BUS
import BUS from '@/platform/bus'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 不过，你可以通过传一个回调给 next来访问组件实例。
    // 在导航被确认的时候执行回调，并且把组件实例作为回
    // 调方法的参数。
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.isLogined) {
        vm.$router.push('/')
      }
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  mounted() {
    // 如果已经登录则直接跳转
    if (sessionStorage.getItem('isLogined')===true) {
      // 设置vuex的值（因为刷新页面后session未清空，但是vuex清空了）
      // this.login(sessionStorage.getItem('userInfo'))
    }
    // 初始化登录参数
    this.form.setFieldsValue({
      domainOrIP: 'juck.site',
      userName: 'root',
      password: 'Zc1998zc'
    })
  },
  computed: {
    ...mapState('login', {
      isLogined: 'isLogined',
      userInfo: 'userInfo',
      socket: 'socket'
    })
  },
  methods: {
    ...mapActions({
      login: 'login/login',
      changeLoginType: 'login/changeLoginType',
      setAppStatus: 'config/setAppStatus',
      runApp: 'config/runApp',
      shutdownApp: 'config/shutdownApp'
    }),
    // 上传私钥
    uploadPrivateKey(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    openNotification(loginRes) {
      let message = ''
      let description = ''
      let icon = ''
      if (loginRes.code === 200) {
        message = '登录成功'
        description = `${loginRes.msg}`
        icon = <a-icon type="smile" style="color: #108ee9" />
      } else {
        message = '登录失败'
        description = `失败原因：${loginRes.msg}`
        icon = <a-icon type="exclamation-circle" style="color: red" />
      }
      this.$notification.open({
        message: message,
        description: description,
        icon: icon
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values).then(res => {
            // 提示登录结果
            this.openNotification(res.data.login)
            // 登录成功则跳转到首页，否则不作任何操作
            if (res.data.login.code === 200) {
              // 存储登录信息(isLogined,userInfo)
              sessionStorage.setItem('isLogined', true)
              sessionStorage.setItem('userInfo', JSON.stringify(values))
            }
          })
        }
      })
    },
    skipLogin() {
      // TODO
    }
  }
}
</script>
<style>
#login {
}
</style>
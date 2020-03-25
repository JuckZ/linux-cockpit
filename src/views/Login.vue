// TODO:清理输入框默认值，修改滑块方式为下拉菜单
<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'IP',
          { rules: [{ required: true, message: 'Please input your server\'s ip address or domain!' }] },
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
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <!-- <a-form-item>
  <div>
    <a-select key=1 :value=value defaultValue="lucy" style="width: 120px" @change="handleChange">
      <a-icon slot="suffixIcon" type="smile" />
      <a-select-option key="1" value="jack">Jack</a-select-option>
      <a-select-option key="2" value="lucy">Lucy</a-select-option>
      <a-select-option key="3" value="disabled" disabled>Disabled</a-select-option>
      <a-select-option key="4" value="Yiminghe">yiminghe</a-select-option>
    </a-select>
  </div>
    </a-form-item>-->
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
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
              type="password"
              placeholder="Password"
              v-if="loginType === 'password'"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
            <!-- 文件选择框 -->
            <a-upload
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              v-if="loginType == 'privateKey'"
              @change="uploadPrivateKey"
            >
              <a-button>
                <a-icon type="upload" />Click to Upload
              </a-button>
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
            initialValue: true,
          },
        ]"
      >Remember me</a-checkbox>
      <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// 导入apollo客户端相关api
import gql from "graphql-tag";
import io from "socket.io-client";
export default {
  name: "Comment",
  apollo: {
    books: {
      query: gql`
        query books {
          books {
            title
            author
          }
        }
      `
    }
  },
  data() {
    return {
      // info表示服务端返回的数据
      info: {
        books: []
      },
      value: "lucy",
      loginType: "password"
    };
  },
  // value: "lucy",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    // 初始化登录参数
    this.form.setFieldsValue({
      IP: 'juck.site',
      userName: 'root',
      password: 'Zc1998zc'
    })
  },
  methods: {
    // 切换登录方式
    changeLoginType(checked) {
      if (checked) this.loginType = "password";
      else this.loginType = "privateKey";
    },
    // 上传私钥
    uploadPrivateKey(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    async createSocket() {
      const formData = {
        IP: "juck.site",
        userName: "root",
        password: "Zc1998zc",
        remember: true
      };
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation login($loginInput: LoginInput) {
              login(loginInput: $loginInput) {
                # 返回的数据格式为loginRes，字段如下
                code
                msg
              }
            }
          `,
          variables: {
            loginInput: formData
          }
        })
        .then(res => {
          this.openNotification(res.data.login);
          console.log(formData);
        });
    },
    openNotification(loginRes) {
      let message = "";
      let description = "";
      let icon = "";
      if (loginRes.code === 200) {
        message = "登录成功";
        description = `${loginRes.msg}`;
        icon = <a-icon type="smile" style="color: #108ee9" />;
        // 创建socket连接
      } else {
        message = "登录失败";
        description = `失败原因：${loginRes.msg}`;
        icon = <a-icon type="exclamation-circle" style="color: red" />;
      }
      this.$notification.open({
        message: message,
        description: description,
        icon: icon
      });
    },
    login: async function(formData) {
      if(this.$parent.$store.state.isLogined) {
        this.$parent.$router.push("/apps/shell");
        return;
      }
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation login($loginInput: LoginInput) {
              login(loginInput: $loginInput) {
                # 返回的数据格式为loginRes，字段如下
                code
                msg
              }
            }
          `,
          variables: {
            loginInput: formData
          }
        })
        .then(res => {
          // 注意此处的this指向，是表单
          this.openNotification(res.data.login);
          if (res.data.login.code == 200) {
            this.$router.push("/apps/shell");
            // 修改vuex中的登录状态为true
            this.$parent.$store.state.isLogined = true;
            this.$parent.$store.state.socket = io("http://localhost");
          }
        });
    },
    addBook: function() {
      this.$apollo.mutate({
        mutation: gql`
          mutation addBook($bookInput: BookInput) {
            addBook(bookInput: $bookInput) {
              title
              author
            }
          }
        `,
        variables: {
          bookInput: {
            title: "how to study",
            author: "juck"
          }
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values);
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login {
  margin: auto;
  width: 40%;
  min-width: 300px;
}
#components-form-demo-normal-login {
  width: 50%;
}
</style>
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
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
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
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // const axios = require('axios')
          this.axios.post("http://localhost/api/login",values).then((response) => {
            console.log(response.data)
          })
          //======================================================================
          // 提交表单内容并验证登录---原生实现方法
          // Login(values.IP,values.userName,values.password,values.remember)
          // const httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
          // httpRequest.open("POST", "http://localhost/api/login", true); //第二步：打开连接
          // httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          // httpRequest.send(JSON.stringify(values));
          // httpRequest.onreadystatechange = function() {
          //   if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          //     const json = httpRequest.response; //获取到服务端返回的数据
          //     console.log(typeof(json));  //string
          //     console.log(json);
          //   }
          // };
          //=====================================================================
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
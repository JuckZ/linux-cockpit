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

// 导入apollo客户端相关api
import gql from 'graphql-tag'
export default {
  name: 'Comment',
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
  data () {
    return {
      // info表示服务端返回的数据
      info: {
        books: []
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    login: function() {
      this.$apollo.mutate({
        mutation: gql`
          mutation addBook($bookInput: BookInput) {
            addBook( bookInput: $bookInput) {
              title
              author
            }
          }
        `,
        variables: {
          bookInput: {
              title: 'how to study',
              author: 'juck'
            }
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login()
          // 如何设置请求头，并将Accept字段设置为json（可以按照优先级设置多个）
          // this.axios.post("http://localhost/api/login",values).then((response) => {
          //   console.log(response.data)
          // })
          //======================================================================
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
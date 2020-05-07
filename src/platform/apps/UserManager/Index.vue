<!--
 * @Author: Juck
 * @Date: 2020-04-10 13:13:40
 * @LastEditTime: 2020-05-07 16:32:27
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\platform\apps\UserManager\Index.vue
 * @Juck is coding...
 -->
<template>
  <div>
    <a-button type="primary" @click="showModal">
      添加用户
    </a-button>
    <a-modal v-model="visible" title="添加用户" @ok="handleSubmit">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
    <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
        提交
      </a-button>
    </a-form-item>
  </a-form>
    </a-modal>
    <a-button>添加组</a-button>
    <a-list item-layout="horizontal" :data-source="users">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">编辑</a>
        <a
          slot="actions"
          @click="
            socket.emit('uploadScript', {
              target: 'userManager',
              options: {
                operation: 'deleteUser',
                user: item,
              },
            })
          "
          >删除</a
        >
        <a-list-item-meta
          :description="`上次登录: ${item.lastLogin} 其他信息: ${item.gecos}`"
        >
          <span slot="title">用户名：{{ item.user }}</span>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>content</div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      //
      visible: false,
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    }
  },
  computed: {
    ...mapState('userManager', {
      users: 'users',
    }),
    ...mapState('login', {
      socket: 'socket',
    }),
  },
  beforeMount() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
    // 读取linux的用户信息，并初始化列表数据
    this.socket.emit('uploadScript', {
      target: 'userManager',
      options: {
        operation: 'setUsers',
      },
    })
    this.socket.on('userManagerScriptRes', (payload) => {
      switch (payload.originPayload.options.operation) {
        case 'setUsers':
        case 'deleteUser':
        case 'addUser': {
           // FIXME deleteUser 暂时也是通过linux获取删除后的用户名单
          const resultLines = payload.chunk.trim().split('\n')
          const users = []
          for (let i = 1; i < resultLines.length; i++) {
            const userItemProperties = resultLines[i].trim().split(/\s+/)
            const userItem = {
              uid: userItemProperties[0],
              user: userItemProperties[1],
              proc: userItemProperties[2],
              lastLogin: userItemProperties[5],
              gecos: userItemProperties[6],
            }
            users.push(userItem)
          }
          this.setUsers({
            options: {
              users: users,
            },
          })
          break
        }
        default:
          console.log('nothing to do with userManager');
      }
    })
  },
  destroyed() {
    // 清除socket的监听器
    this.socket.removeAllListeners(['userManagerScriptRes'])
  },
  methods: {
    ...mapActions({
      addUser: 'userManager/addUser',
      deleteUser: 'userManager/deleteUser',
      setUsers: 'userManager/setUsers',
    }),
    showModal() {
      this.visible = true;
    },
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.socket.emit('uploadScript', {
            target: 'userManager',
            options: {
              operation: 'addUser',
              user: {
                ...values,
              }
            }
          })
          this.visible = false
        }
      });
    },
  },
}
</script>
<style></style>

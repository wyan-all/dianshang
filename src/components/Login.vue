<template>
  <div class="container">
    <div class="loginbox">
      <el-form :model="loginForm" ref="loginFormRef" label-width="0px">
        <el-form-item>
          <el-input
            v-model="loginForm.name"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">
            登录
          </el-button>
          <el-button type="info">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: 'www',
        password: '123456'
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(val => {
        if (!val) return {}
        // const result = this.$http.post('login', this.loginForm)
        // console.log(result)
        // window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<!--style改变element ui的样式：
在浏览器中打开开发者模式查看要修改元素的标签名、类名等，
在本地文件中添加父类，通过级联选择器（父子、祖先、同级等） 匹配要修改的元素，进行样式修改-->
<style >
.container {
  background-color: rgb(204, 169, 169);
  width: 100%;
  height: 100%;
}

.loginbox {
  width: 450px;
  height: 300px;
  background-color: rgb(154, 201, 185);
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loginbox .el-form-item__content {
  margin-right: 32px;
  margin-top: 32px;
  padding-left:45px
}

</style>

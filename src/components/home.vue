<template>
  <div>
    记录查询
    <el-form :inline="true" :model="querryInfo" class="demo-form-inline">
      <el-form-item label="字段">
        <el-input
          v-model="querryInfo.user"
          placeholder="请输入要搜索的字段1"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择列表">
        <el-select v-model="querryInfo.region" placeholder="活动区域">
          <el-option label="选择一" value="choice1"></el-option>
          <el-option label="选择二" value="choice2"></el-option>
          <!---value 属性规定在表单被提交时被发送到服务器的值。 -->
        </el-select>
      </el-form-item>
      <!---选择日期 -->
      <span class="demonstration">日期区间</span>
     <el-date-picker
      v-model="querryInfo.value1"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!--- 列表区域-->

    <el-table
      :data="tableData"
      style="width: 100%" border stripe >
      <el-table-column type="index" ></el-table-column> <!--- 设置索引列-->
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <!--- 分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="querryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalnum">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取参数列表的对象
      querryInfo: {
        value1: '',
        user: '', // 查询 字段1
        region: '', // 下拉选框的value值
        pagenum: 1, // 当前页码
        pagesize: 2 // 每页显示的列表条数

      },
      temp: false,
      totalnum: 0, // 总的查询数量，这里目前有问题，需要开发时和后台确认
      pathapi: 'http://localhost:3000/path', // 总条数
      tableData: [{
        date: '',
        name: '',
        address: ''
      }]
    }
  },
  created () {
    this.getList() // 初始化列表数据
  },
  methods: {
    // 按字段查询数据
    onSubmit () {
      console.log('submit!', this.querryInfo.value1)
      this.querryInfo.pagenum = 1
      this.querryInfo.pagesize = 2
      const that = this // 使用that解决函数内部this指向问题
      console.log(this.querryInfo.user, this.querryInfo.region)
      if (this.querryInfo.user === '') {
        return alert('请输入要搜索的字段1')
      }
      if (this.querryInfo.region === '') {
        return alert('请输入要选择框')
      }
      this.pathapi = 'http://localhost:3000/quer'
      this.$http
        .get(this.pathapi, { params: this.querryInfo }) //
        .then(function (res) {
          console.log(typeof res.data)
          console.log(typeof that.querryInfo.value1, that.querryInfo.region)
          that.tableData = res.data
          that.totalnum = res.data.length
          that.temp = true
          console.log(that.tableData)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getList (path) {
      const that = this // 使用that解决函数内部this指向问题
      this.$http
        .get(this.pathapi, { params: this.querryInfo }) //
        .then(function (res) {
          console.log(typeof res.data)

          that.tableData = res.data
          that.totalnum = res.data.length
          console.log(that.tableData)
        })
        .catch(function (err) {
          console.log(err)
        })
    },

    // 监听pagesize改变的函数
    handleSizeChange (newsize) {
      console.log('页码尺寸改变:', newsize)
      this.querryInfo.pagesize = newsize
      if (this.querryInfo.user !== '' && this.querryInfo.region !== '' && this.temp === true) {
        this.pathapi = 'http://localhost:3000/quer'
      } else {
        // this.querryInfo.value1 = ''
        // this.querryInfo.user = ''
        // this.querryInfo.region = ''
        // 存在一个问题：
        // 当在查询字段将所有必填字段输入完后，没有点击查询，点击了改变页码和列表显示条数的时间为之后，向后台发送的请求字段中会显示对应的查询字段，
        // 从而调用的时后台查询功能的api，返回前端的将是特定字段以及特定页码和列表条数的结果
        // 需要明确这种方式下具体是按字段查询还是保持原来的查询结果仅调整页码和列表数目。
        // 从而定义了temp，想要只有点击查询才调用查询接口，页码改变但是查询字段保持原来字段不变，但是后台传入了字段中查询字段仍是改变的，须在开发时和后台协商
        this.pathapi = 'http://localhost:3000/path'
      }
      this.getList(this.pathapi)
      // 向后台请求当前列表数量的数据
    },

    // 监听页码值改变事件
    handleCurrentChange (newpage) {
      console.log('页码改变pagenum:', newpage)
      this.querryInfo.pagenum = newpage
      if (this.querryInfo.user !== '' && this.querryInfo.region !== '' && this.temp === true) {
        this.pathapi = 'http://localhost:3000/quer'
      } else {
        this.pathapi = 'http://localhost:3000/path'
      }
      this.getList(this.pathapi)
      // 向后台请求当前页码的数据
    }
  }
}
</script>

<style>
.demonstration {
margin-right:10px
}

.el-form--inline .el-form-item__content  {
  margin-left:10px
}
</style>

<template>
  <div>
    日志查询
    <el-form :inline="true" :model="querryInfo" class="demo-form-inline">
      <!---客户相关 字段 -->
      <!---具体的字段名等还没有定义和绑定 -->
      <el-form-item label="客户编码：">
        <el-input
          v-model="querryInfo.customerId "
          placeholder="请输入客户编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户名称：">
        <el-input
          v-model="querryInfo.customerName"
          placeholder="请输入客户名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="accesskey：">
        <el-input
          v-model="querryInfo.accesskey"
          placeholder="请输入accesskey"
        ></el-input>
      </el-form-item>

      <!---其他字段 -->
      <el-form-item label="IP/域名：">
        <el-input
          v-model="querryInfo.object"
          placeholder="请输入IP/域名"
        ></el-input>
      </el-form-item>
      <el-form-item label="模块：">
        <el-input
          v-model="querryInfo.module"
          placeholder="请输入模块"
        ></el-input>
      </el-form-item>
      <el-form-item label="调用链：">
        <el-input
          v-model="querryInfo.traceId"
          placeholder="请输入调用链"
        ></el-input>
      </el-form-item>

      <!---选择日期 -->
      <span class="demonstration">时间区间：</span>
     <el-date-picker
      v-model="querryInfo.value1"
      type="datetimerange"
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
        prop="traceId"
        label="调用链"
        width="180">
      </el-table-column>
      <el-table-column
        prop="customerId"
        label="客户编码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="object"
        label="操作对象">
      </el-table-column>
      <el-table-column
        prop="beginMs"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="spendMS"
        label="时延">
      </el-table-column>
      <el-table-column
        prop="status"
        label="响应状态码">
      </el-table-column>
      <el-table-column
        prop="url"
        label="请求url">
      </el-table-column>
      <el-table-column
        prop="responseMessage"
        label="响应消息体">
      </el-table-column>
      <el-table-column label="详情" type="expand">
        <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="tonce">
            <span>{{ scope.row.tonce }}</span>
          </el-form-item>
          <el-form-item label="客户accesskey">
            <span>{{ scope.row.accesskey }}</span>
          </el-form-item>
          <el-form-item label="客户名称">
            <span>{{ scope.row.customerName }}</span>
          </el-form-item>
          <el-form-item label="userAgent">
            <span>{{ scope.row.userAgent }}</span>
          </el-form-item>
          <el-form-item label="url">
            <span>{{ scope.row.url }}</span>
          </el-form-item>
          <el-form-item label="http请求方式">
            <span>{{ scope.row.httpMethod }}</span>
          </el-form-item>
          <el-form-item label="请求ip">
            <span>{{ scope.row.userId }}</span>
          </el-form-item>
          <el-form-item label="请求体">
            <span>{{ scope.row.request }}</span>
          </el-form-item>
          <el-form-item label="响应参数">
            <span>{{ scope.row.responseMessage }}</span>
          </el-form-item>
        </el-form>
        </template>
      </el-table-column>
    </el-table>

    <!--- 分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querryInfo.pageNo"
      :page-sizes="[5,10, 15, 20]"
      :page-size="querryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取参数列表的对象
      quer: {
        pageNo: 1, // 当前页码
        pageSize: 10 // 每页显示的列表条数
      },
      querryInfo: {
        value1: '', // 时间,开始时间begin [0] end结束时间[1]
        customerId: '', // 查询 客户编码
        customerName: '', // 客户名称，支持模糊查询
        accesskey: '', // 客户的accesskey
        object: '', //  操作对象,如压制是ip ，域名无忧
        module: '', // 模块
        traceId: '', // 调用链
        begin: '',
        pageNo: 1, // 当前页码
        pageSize: 10, // 开始时间 毫秒值
        end: ''// 结束时间 毫秒值
      },
      totalCount: 0,
      pathapi: 'http://localhost:3000/api/api/', // 总条数
      // 列表显示区的信息
      tableData: [{
        traceId: '', // 调用链
        request: '',
        customerId: '', // 客户编码
        customerName: '', // 客户名称
        object: '', // 操作对象
        beginMs: 0, // 开始时间的毫秒值
        spendMS: 0, // 响应的毫秒值
        status: 0, // http响应状态码，200 表示成功
        module: '', // 模块
        url: '', // 请求url
        responseMessage: '' // 响应message

      }]
    }
  },
  created () {
    this.getList() // 初始化列表数据
  },
  methods: {
    // 按字段查询数据
    onSubmit () {
      // console.log('submit!', this.querryInfo.value1)
      this.querryInfo.pageNo = 1
      this.querryInfo.pageSize = 10
      // console.log(this.quer)
      this.pathapi = 'http://localhost:3000/api/api/'
      this.querryInfo.begin = new Date(this.querryInfo.value1[0]).getTime()
      this.querryInfo.end = new Date(this.querryInfo.value1[1]).getTime()
      for (var pro in this.querryInfo) {
        if (this.querryInfo[pro]) {
          this.quer[pro] = this.querryInfo[pro]
        }
      }
      delete this.quer.value1 // 删除value1属性，不传给后台
      // console.log(this.quer)
      this.getList(this.pathapi)
      this.querryInfo.pageNo = 1
      this.querryInfo.pageSize = 10
      console.log('查询结束')
    },
    getList (path) {
      const that = this // 使用that解决函数内部this指向问题
      this.$http
        .get(this.pathapi, { params: this.quer }) //
        .then(function (res) {
          that.tableData = res.data.result.results
          that.totalCount = res.data.result.totalCount
          // 处理request和response中的字段
          for (var i = 0; i < that.tableData.length; i++) {
            // console.log(typeof that.tableData[i].request)
            // var val = that.tableData[i].request.replace(/(^'*)|('*$)/g, '').replace(/'/g, '"') // 将字符串转换成json格式
            // that.tableData[i].request = JSON.parse(val).customerId
            // console.log(that.tableData[i].request)
            that.tableData[i].responseMessage = res.data.result.results[i].response
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },

    // 监听pageSize改变的函数
    handleSizeChange (newsize) {
      console.log('页码尺寸改变:', newsize)
      this.quer.pageSize = newsize
      this.querryInfo.pageSize = newsize
      this.getList(this.pathapi)
      console.log('end:页码尺寸改变', this.quer)
      // 向后台请求当前列表数量的数据
    },

    // 监听页码值改变事件
    handleCurrentChange (newpage) {
      console.log('页码改变pageNo:', newpage)
      this.querryInfo.pageNo = newpage
      this.quer.pageNo = newpage
      this.getList(this.pathapi)
      console.log('end:页码改变pageNo', this.quer)
      // 向后台请求当前页码的数据
    },
    handleEdit (index, row) {
      console.log(index, row)
      console.log(row.accesskey)
    }
  }
}
</script>
<!--
.demonstration {
margin-right:10px
}
-->
<style>
.demonstration {
margin-right:10px
}
.el-range-editor.el-input__inner {
  margin-right: 10px
}
.el-form--inline .el-form-item__content  {
  margin-right: 10px
}

.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
#app > div > div.el-table.el-table--fit.el-table--striped.el-table--border.el-table--enable-row-hover.el-table--enable-row-transition {
  margin-bottom: 20px;
}
.demo-table-expand label {
    width: 125px;
    color: #99a9bf;
    font-size: 14px;
    font-weight:bold;
}
</style>

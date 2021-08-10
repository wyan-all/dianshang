<template>
  <div>
    <div class="logSpan">日志查询</div>
    <el-form :inline="true" :model="querryInfo" class="demo-form-inline" @keyup.enter.native="enterSearch" >
      <!---客户相关 字段 -->
      <div style="width:90%;margin: 0 20%; display: flex; flex-wrap: nowrap;">
          <el-row :gutter="20">
                <el-col :span="4"><div class="grid-content bg-purple">
                <el-form-item label="客户编码：">
                <el-input
                  v-model="querryInfo.customerId "
                  placeholder="请输入客户编码"
                ></el-input>
              </el-form-item>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                <el-form-item label="客户名称：">
                <el-input
                  v-model="querryInfo.customerName"
                  placeholder="请输入客户名称"
                ></el-input>
              </el-form-item>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                <el-form-item label="accesskey：">
                <el-input
                  v-model="querryInfo.accesskey"
                  placeholder="请输入accesskey"
                ></el-input>
              </el-form-item>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                <el-form-item label="操作对象：">
                <el-input
                  v-model="querryInfo.object"
                  placeholder="请输入操作对象"
                ></el-input>
              </el-form-item>
                </div></el-col>
                 <el-col :span="1" :offset="0.8"><div class="grid-content bg-purple">
                <el-form-item>
                <el-button type="primary"  style="position: relative;
    top: 40px; visibility: hidden;"></el-button>
                </el-form-item>
                </div></el-col>
          </el-row>
      </div>
      <!---其他字段 -->
      <div style="width:90%;margin: 0 20%; display: flex; flex-wrap: nowrap;">
            <el-row :gutter="20">
                <el-col :span="4"><div class="grid-content bg-purple">
                      <el-form-item label="模块："  label-width="70px">
                        <el-input
                          v-model="querryInfo.module"
                          style="text-indent:0em"
                          placeholder="请输入模块"
                        ></el-input>
                      </el-form-item></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <el-form-item label="调用链：" style="text-indent:1em">
                        <el-input
                          v-model="querryInfo.traceId"
                          placeholder="请输入调用链"
                          style="text-indent:0em"
                        ></el-input>
                      </el-form-item>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                <div class="el-form-item">
                      <label class="el-form-item__label demonstration">开始时间：</label>
                        <el-date-picker
                          v-model="querryInfo.begin"
                          type="datetime"
                          placeholder="请选择开始时间"
                          style="margin-right:20px;width:204px;::before">
                        </el-date-picker></div></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                <div class="el-form-item">
                      <label class="el-form-item__label demonstration">结束时间：</label>
                        <el-date-picker
                          v-model="querryInfo.end"
                          type="datetime"
                          placeholder="请选择结束时间"
                          style="margin-right:20px;width:204px;::before">
                        </el-date-picker>
                </div></div></el-col>
                <el-col :span="1" :offset="0.8"><div class="grid-content bg-purple" >
                <el-form-item>
                <el-button type="primary" @click="onSubmit" style="position: relative;
    top: 40px">查询</el-button>
                </el-form-item>
                </div></el-col>
          </el-row>
      </div>
    </el-form>

    <!--- 列表区域-->
  <div class="tabelArea" >
    <el-table
      :data="tableData"
      style="width: 100%" border stripe
      @expand-change="letScroll"
      @row-dblclick="clickTable"
      ref="refTable"
      :cell-class-name="cell"
       >
      <el-table-column type="index" ></el-table-column> <!--- 设置索引列-->
      <el-table-column
        prop="traceId"
        label="调用链"
        width="280">
      </el-table-column>
      <el-table-column
        prop="customerId"
        label="客户编码"
        width="240">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名称"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="object"
        label="操作对象"
        width="180">
      </el-table-column>
      <el-table-column
        prop="begin"
        label="开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="spendMS"
        label="时延(ms)"
        width="85">
      </el-table-column>
      <el-table-column
        prop="status"
        label="响应状态码"
        width="95">
      </el-table-column>
      <el-table-column
        prop="module"
        label="模块"
        width="110">
      </el-table-column>
      <el-table-column
        prop="url"
        label="请求url"
        >
      </el-table-column>
      <el-table-column label="详情" type="expand" width="50" >
        <template slot-scope="scope" >
        <div>
            <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="客户accesskey:" >
            <span>{{ scope.row.accesskey }}</span>
          </el-form-item>
          <el-form-item label="tonce:">
            <span>{{ scope.row.tonce }}</span>
          </el-form-item>
          <el-form-item label="客户名称:">
            <span>{{ scope.row.customerName }}</span>
          </el-form-item>
          <el-form-item label="userAgent:">
            <span>{{ scope.row.userAgent }}</span>
          </el-form-item>
          <el-form-item label="客户编码:">
            <span>{{ scope.row.customerId }}</span>
          </el-form-item>
          <el-form-item label="请求ip:">
            <span>{{ scope.row.userId }}</span>
          </el-form-item>
          <el-form-item label="http请求方式:">
            <span>{{ scope.row.httpMethod }}</span>
          </el-form-item>
          <div class="oneline">
          <el-form-item label="请求的url:">
            <span>{{ scope.row.url }}</span>
          </el-form-item>
          </div>
          <div class="oneline">
          <el-form-item label="请求体:">
            <span>{{ scope.row.request }}</span>
          </el-form-item>
          </div>
          <div class="oneline">
          <el-form-item label="响应参数:">
            <span>{{ scope.row.responseMessage }}</span>
          </el-form-item>
          </div>
        </el-form>
        </div>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <!--- 分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querryInfo.pageNo"
      :page-sizes="[5,10, 15, 20]"
      :page-size="querryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="padding:20px 5px;"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取查询参数列表的对象
      quer: {
        pageNo: 1, // 当前页码
        pageSize: 10 // 每页显示的列表条数
      },
      // 查询区域字段
      querryInfo: {
        customerId: '', // 查询 客户编码
        customerName: '', // 客户名称，支持模糊查询
        accesskey: '', // 客户的accesskey
        object: '', //  操作对象,如压制是ip ，域名无忧
        module: '', // 模块
        traceId: '', // 调用链
        pageNo: 1, // 当前页码
        pageSize: 10,
        begin: '', // 开始时间
        end: ''// 结束时间
      },
      totalCount: 0,
      pathapi: '/api/log_api/list', // 总条数
      // 列表显示区的信息
      tableData: [{
        traceId: '', // 调用链
        request: '',
        customerId: '', // 客户编码
        customerName: '', // 客户名称
        object: '', // 操作对象
        begin: 0, // 开始时间的毫秒值
        spendMS: 0, // 响应的毫秒值
        status: 0, // http响应状态码
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
      this.querryInfo.pageNo = 1
      this.querryInfo.pageSize = 10
      this.querryInfo.begin = new Date(this.querryInfo.begin).getTime()
      this.querryInfo.end = new Date(this.querryInfo.end).getTime()
      this.quer = { pageNo: 1, pageSize: 10 } // 初始化quer状态
      for (var pro in this.querryInfo) {
        if (this.querryInfo[pro]) {
          this.quer[pro] = this.querryInfo[pro]
        }
      }
      this.getList(this.pathapi)
    },
    // 按回车后查询
    enterSearch (event) {
      event = event || window.event
      if (event.keyCode === 13) {
        this.onSubmit()
      }
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
            // var val = that.tableData[i].request.replace(/(^'*)|('*$)/g, '').replace(/'/g, '"') // 将字符串转换成json格式
            that.tableData[i].request = that.tableData[i].request.replace(/(^"*)|("*$)/g, '')
            that.tableData[i].responseMessage = res.data.result.results[i].response
            that.tableData[i].begin = that.timestampToTime(Number(res.data.result.results[i].beginMs))
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      var strDate = Y + M + D + h + m + s
      var temp = new Date(strDate).getTime()
      var ms = timestamp - temp
      strDate += '.' + ms
      return strDate
    },
    // 给详情单元格添加className
    cell ({ row, colum, rowIndex, columnIndex }) {
      if (columnIndex === 10) {
        row.index = rowIndex
        return 'info' + rowIndex
      }
    },
    // 解决元素页面视图问题
    letScroll (row) {
      var target = document.getElementsByClassName('info' + row.index)[0]
      this.$nextTick(function () {
        window.scrollTo({

          top: target.offsetTop + 300,

          behavior: 'smooth' // 'smooth'
        })
      })
    },
    // 点击行显示
    clickTable (row, index, e) {
      this.$refs.refTable.toggleRowExpansion(row)
    },
    // 监听pageSize改变的函数
    handleSizeChange (newsize) {
      this.quer.pageSize = newsize
      this.querryInfo.pageSize = newsize
      this.getList(this.pathapi)
      // 向后台请求当前列表数量的数据
    },

    // 监听页码值改变事件
    handleCurrentChange (newpage) {
      this.quer.pageNo = newpage
      this.querryInfo.pageNo = newpage
      this.getList(this.pathapi)
      // 向后台请求当前页码的数据
    }
  }
}
</script>

<style>
.demonstration {
margin-right:10px;
font-size:14px;
color: #606266;
line-height:40px;
}
.demonstration::before {
  content: "";
}
.logSpan {
padding:26px 0;
font-size:20px;
color: #606266;
}
.el-input {
  width:204px !important;
}
.demo-form-inline {
  padding-bottom:10px
}
.el-range-editor.el-input__inner {
  margin-right: 10px
}
.el-form--inline .el-form-item__content  {
  margin-right: 10px
}

.el-form--inline .el-form-item__label {
    float: none;
    display: inline !important;
}
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 49%;
  }
.demo-table-expand .oneline {
    margin-right: 0;
    margin-bottom: 0;
    width: 200%
  }

#app > div > div.el-table.el-table--fit.el-table--striped.el-table--border.el-table--enable-row-hover.el-table--enable-row-transition {
  margin-bottom: 20px;
}
.demo-table-expand label {
    width: 130px;
    color: #99a9bf;
    font-size: 14px;
    font-weight:bold;
}

.tabelArea {
    margin: 0 auto;
    width:95%;
}

/*布局样式*/

 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  /*栅格背景色
 .bg-purple {
    background: #d3dce6;
  }*/
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin:0 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>

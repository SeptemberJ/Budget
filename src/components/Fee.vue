<template>
  <div class="Fee">
    <el-button style="float:right;margin: 10px;" icon="el-icon-printer" type="primary" size="small" @click="exportExcel">导 出</el-button>
    <el-table
      ref="dataTable"
      :data="dataList"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="项目名称"
        label="项目名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="合同金额"
        label="合同金额"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="累计开票"
        label="累计开票"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="累计收款"
        label="累计收款"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="开票应收款"
        label="开票应收款"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        property="合同应收款"
        label="合同应收款"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { Loading } from 'element-ui'
import $ from 'jquery'
export default {
  name: 'Fee',
  props: ['projectName'],
  data () {
    return {
      dataList: []
    }
  },
  computed: {
    // ...mapState({
    //   cuXMMC: state => state.cuXMMC
    // })
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.dataList = []
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading'
      })
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select *,(累计开票-累计收款)开票应收款,(合同金额-累计收款)合同应收款 from Z_contract_detail where 项目名称='" + this.projectName + "']]></FSQL>"
      tmpData += '</JA_LIST>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('JA_LIST', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))
        console.log(Info)
        if (Info.length > 0) {
          let sumLine = {
            '项目名称': '合计',
            '合同金额': 0,
            '累计开票': 0,
            '累计收款': 0,
            '开票应收款': 0,
            '合同应收款': 0
          }
          Info.map((item, idx) => {
            sumLine['项目名称'] = (Number(sumLine['项目名称']) + Number(item['项目名称'])).toFixed(2)
            if (idx === Info.length - 1) {
              this.dataList = Info.concat(sumLine)
              loadingInstance.close()
            }
          })
        } else {
          this.dataList = Info
          loadingInstance.close()
        }
      }).catch((error) => {
        loadingInstance.close()
        console.log(error)
      })
    },
    // 导出
    exportExcel () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../vendor/Export2Excel.js')
        const tHeader = ['项目名称', '合同金额', '累计开票', '累计收款', '开票应收款', '合同应收款']
        const filterVal = ['项目名称', '合同金额', '累计开票', '累计收款', '开票应收款', '合同应收款']
        const data = this.formatJson(filterVal, this.dataList)
        exportJsonToExcel(tHeader, data, '金额来源及明细')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped>
</style>

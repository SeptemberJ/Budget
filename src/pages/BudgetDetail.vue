<template>
  <div class="BudgetDetail">
    <h2 class="MarginT_10 MarginB_20">工程项目预决算表{{formBudget.companyName}}</h2>
    <el-row>
      <el-form class="DisabledNormal" ref="formBudget" :rules="rules" :model="formBudget" label-width="100px">
        <el-col :span="8">
          <el-form-item label="公司名称" prop="companyName" size="mini">
            <el-select v-model="formBudget.companyName" placeholder="请选择" size="mini" style="width: 90%;">
              <el-option
                v-for="item in companyOptions"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customerName" size="mini">
            <el-select v-model="formBudget.customerName" filterable remote :remote-method="changeCustomerName" placeholder="请输入关键字" size="mini" style="width: 90%;">
              <el-option
                v-for="item in customerList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制日期" prop="establishmentDate" size="mini">
            <el-date-picker style="width: 85%;"
              v-model="formBudget.establishmentDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="事业部" prop="department" size="mini">
            <el-select v-model="formBudget.department" filterable remote :remote-method="changeDepartment" placeholder="请输入关键字" size="mini" style="width: 90%;">
              <el-option
                v-for="item in departmentList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="projectName" size="mini">
            <el-input v-model="formBudget.projectName" size="mini" style="width: 90%;" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="竣工日期" size="mini">
            <el-date-picker prop="finishedDate" style="width: 85%;"
              v-model="formBudget.finishedDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="销售员" prop="salesman" size="mini">
            <el-select v-model="formBudget.salesman" filterable remote :remote-method="changeSalesman" placeholder="请输入关键字" style="width: 90%;">
              <el-option
                v-for="item in salesmanList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" prop="projectCode" size="mini">
            <el-select v-model="formBudget.projectCode" filterable remote :remote-method="changeProject" placeholder="请输入关键字" @change="(value) => changePCode(value)" style="width: 90%;">
              <el-option
                v-for="item in projectCodeList"
                :key="item.fitemid"
                :label="item.fnumber"
                :value="item.fitemid">
                <span style="float: left">{{ item.fnumber }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.fname }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="编制人" size="mini">
            <el-select v-model="formBudget.compilingPerson" filterable remote :remote-method="changeCompilingP" placeholder="请输入关键字" style="width: 85%;">
              <el-option
                v-for="item in compilingPList"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <!--  -->
        <el-col :span="8">
          <el-form-item label="项目经理" size="mini">
            <el-input v-model="formBudget.projectManager" size="mini" style="width: 85%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类别" prop="projectCategory" size="mini">
            <el-select v-model="formBudget.projectCategory" placeholder="请选择" size="mini" style="width: 90%;">
              <el-option
                v-for="item in categoryOptions"
                :key="item.fitemid"
                :label="item.fname"
                :value="item.fitemid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税率" prop="rate" size="mini">
            <el-select v-model="formBudget.rate" placeholder="请选择" size="mini" style="width: 85%;">
              <el-option
                v-for="item in rateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- table -->
    <table id="budget" cellspacing="0" class="MarginB_20" style="width: 100%;border-top: 1px solid #DCDFE6;border-left: 1px solid #DCDFE6;">
      <thead>
        <tr>
          <th width="80px">序号</th>
          <th width="150px"></th>
          <th width="300px">分类款项</th>
          <th width="200px">预算(元）</th>
          <th width="200px">决算（元）</th>
          <th width="150px">财务数据</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <!-- line1 -->
        <tr>
          <td>1</td>
          <td>1001</td>
          <td>项目合同总价</td>
          <td>{{budget['1001'] > 0 ? budget['1001'] : ''}}</td>
          <td>{{finalAccounts['1001'] > 0 ? finalAccounts['1001'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1001.01</td>
          <td>其中：银行 </td>
          <td><el-input v-model="budget['100101']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['100101'] > 0 ? finalAccounts['100101'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1001.02</td>
          <td>票据</td>
          <td><el-input v-model="budget['100102']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['100102'] > 0 ? finalAccounts['100102'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line2 -->
        <tr>
          <td>2</td>
          <td>1201</td>
          <td>设备及材料合计</td>
          <td>{{budget['1201'] > 0 ? budget['1201'] : ''}}</td>
          <td>{{finalAccounts['1201'] > 0 ? finalAccounts['1201'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.01</td>
          <td>主设备</td>
          <td><el-input v-model="budget['120101']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['120101'] > 0 ? finalAccounts['120101'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.02</td>
          <td>配套设备</td>
          <td><el-input v-model="budget['120102']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['120102'] > 0 ? finalAccounts['120102'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.03</td>
          <td>其他部件费</td>
          <td><el-input v-model="budget['120103']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['120103'] > 0 ? finalAccounts['120103'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.04</td>
          <td>其他材料</td>
          <td><el-input v-model="budget['120104']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['120104'] > 0 ? finalAccounts['120104'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line3 -->
        <tr>
          <td>3</td>
          <td>1301</td>
          <td>安装合计</td>
          <td>{{budget['1301'] > 0 ? budget['1301'] : ''}}</td>
          <td>{{finalAccounts['1301'] > 0 ? finalAccounts['1301'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.01</td>
          <td>材料及人工调试费</td>
          <td><el-input v-model="budget['130101']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130101'] > 0 ? finalAccounts['130101'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.02</td>
          <td>外包费用（10%）</td>
          <td><el-input v-model="budget['130102']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130102'] > 0 ? finalAccounts['130102'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.03</td>
          <td>外包费用（3%）</td>
          <td><el-input v-model="budget['130103']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130103'] > 0 ? finalAccounts['130103'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.04</td>
          <td>外包费用（无）</td>
          <td><el-input v-model="budget['130104']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130104'] > 0 ? finalAccounts['130104'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.05</td>
          <td>配合费</td>
          <td><el-input v-model="budget['130105']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130105'] > 0 ? finalAccounts['130105'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.06</td>
          <td>其他</td>
          <td><el-input v-model="budget['130106']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['130106'] > 0 ? finalAccounts['130106'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line4 -->
        <tr>
          <td>4</td>
          <td>1401</td>
          <td>营业费用合计</td>
          <td>{{budget['1401'] > 0 ? budget['1401'] : ''}}</td>
          <td>{{finalAccounts['1401'] > 0 ? finalAccounts['1401'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.01</td>
          <td>差旅费</td>
          <td><el-input v-model="budget['140101']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140101'] > 0 ? finalAccounts['140101'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.02</td>
          <td>招待费</td>
          <td><el-input v-model="budget['140102']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140102'] > 0 ? finalAccounts['140102'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.03</td>
          <td>标书及嗮图费</td>
          <td><el-input v-model="budget['140103']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140103'] > 0 ? finalAccounts['140103'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.04</td>
          <td>外劳费</td>
          <td><el-input v-model="budget['140104']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140104'] > 0 ? finalAccounts['140104'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.05</td>
          <td>中标服务费</td>
          <td><el-input v-model="budget['140105']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140105'] > 0 ? finalAccounts['140105'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.06</td>
          <td>其他综合费用</td>
          <td><el-input v-model="budget['140106']" placeholder="请输入" size="small"></el-input></td>
          <td>{{finalAccounts['140106'] > 0 ? finalAccounts['140106'] : ''}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line5 -->
        <tr @click="toggleShow">
          <td>5</td>
          <!-- <td>5<i class="el-icon-caret-bottom" v-if="!ifShow"></i><i class="el-icon-caret-top" v-if="ifShow"></i></td> -->
          <td>1501</td>
          <td>税费</td>
          <td>{{((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(budget['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2)}}</td>
          <td>{{((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(finalAccounts['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2)}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.01</td>
          <td>增值税  13%</td>
          <td>{{formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <!-- <td>{{((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)}}</td> -->
          <td>{{formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.02</td>
          <td>增值税  3%</td>
          <td>{{formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <!-- <td>{{(Number(budget['1001']) / 1.03 * 0.03).toFixed(2)}}</td> -->
          <td>{{formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.03</td>
          <td>增值税 9%</td>
          <td>{{formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <!-- <td>{{(Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)}}</td> -->
          <td>{{formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : 0}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.12</td>
          <td>税金附加</td>
          <td>{{((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)))) * 0.1).toFixed(2)}}</td>
          <!-- <td>{{((((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03) + (Number(budget['1001']) / 1.03 * 0.03)
 + (Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03)) * 0.1).toFixed(2)}}</td> -->
          <td>{{((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * 0.1).toFixed(2)}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.13</td>
          <td>企业所得税</td>
          <td>{{(Number(budget['1001']) * rateCompany).toFixed(2)}}</td>
          <td>{{(Number(finalAccounts['1001']) * rateCompany).toFixed(2)}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.14</td>
          <td>印花税</td>
          <td>{{(Number(budget['1001']) * 0.0003).toFixed(2)}}</td>
          <td>{{(Number(finalAccounts['1001']) * 0.0003).toFixed(2)}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-if="ifShow">
          <td></td>
          <td>1701.15</td>
          <td>管理费</td>
          <td>{{(Number(budget['1001']) * rateManagement).toFixed(2)}}</td>
          <td>{{(Number(finalAccounts['1001']) * rateManagement).toFixed(2)}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line6 -->
        <tr>
          <td>6</td>
          <td>1601</td>
          <td>毛利润</td>
          <td>{{Number(budget['1001']) == 0 ? 0 : (((Number(budget['1001']) - Number(budget['1201']) - Number(budget['1301']) - Number(budget['1401']) - (((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(budget['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2)))).toFixed(2))}}</td>
          <!-- <td><el-input v-model="budget['1601']" placeholder="请输入" size="small"></el-input></td> -->
          <td>{{Number(finalAccounts['1001']) == 0 ? 0 : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201']) - Number(finalAccounts['1301']) - Number(finalAccounts['1401']) - (((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(finalAccounts['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2)))).toFixed(2))}}</td>
          <td></td>
          <td></td>
        </tr>
        <!-- line7 -->
        <tr>
          <td>7</td>
          <td>1701</td>
          <td>资金占用</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line8 -->
        <tr>
          <td>8</td>
          <td>1801</td>
          <td>毛利率</td>
          <td>{{Number(budget['1001']) == 0 ? 0 : (((Number(budget['1001']) - Number(budget['1201']) - Number(budget['1301']) - Number(budget['1401']) - (((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(budget['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2))) / Number(budget['1001'])).toFixed(2))}}%</td>
          <td>{{Number(finalAccounts['1001']) == 0 ? 0 : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201']) - Number(finalAccounts['1301']) - Number(finalAccounts['1401']) - (((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(finalAccounts['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2))) / Number(finalAccounts['1001'])).toFixed(2))}}%</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <section class="MarginT_20 MarginB_20">
      <el-button type="info" size="mini" @click="back">返 回</el-button>
      <el-button type="danger" size="mini" :loading="btLoading" @click="save('formBudget')">保 存</el-button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
  name: 'BudgetDetail',
  data () {
    return {
      btLoading: false,
      ifShow: true,
      rateCompany: 0.015,
      rateManagement: 0.05,
      formBudget: {
        companyName: '',
        customerName: '',
        establishmentDate: '',
        department: '',
        projectName: '',
        finishedDate: '',
        salesman: '',
        projectCode: '',
        compilingPerson: '',
        projectManager: '',
        projectCategory: '',
        rate: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ],
        customerName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        establishmentDate: [
          { required: true, message: '请选择编制日期', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择事业部', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ],
        salesman: [
          { required: true, message: '请选择销售员', trigger: 'change' }
        ],
        projectCode: [
          { required: true, message: '请选择项目编号', trigger: 'change' }
        ],
        projectCategory: [
          { required: true, message: '请选择项目类别', trigger: 'change' }
        ],
        rate: [
          { required: true, message: '请选择税率', trigger: 'change' }
        ]
      },
      companyOptions: [],
      customerList: [],
      departmentList: [],
      salesmanList: [],
      projectCodeList: [],
      compilingPList: [],
      categoryOptions: [],
      rateOptions: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'}
      ],
      pro: ['1001', '1001.01', '1001.02', '1201', '1201.01', '1201.02', '1201.03', '1201.04', '1301', '1301.01', '1301.02', '1301.03', '1301.04', '1301.05', '1301.06', '1401', '1401.01', '1401.02', '1401.03', '1401.04', '1401.05', '1401.06', '1501', '1701.01', '1701.02', '1701.03', '1701.12', '1701.13', '1701.14', '1701.15', '1601', '1701', '1801'],
      budget: {
        '1001': 0.00,
        '100101': '',
        '100102': '',
        '1201': 0.00,
        '120101': '',
        '120102': '',
        '120103': '',
        '120104': '',
        '1301': 0.00,
        '130101': '',
        '130102': '',
        '130103': '',
        '130104': '',
        '130105': '',
        '130106': '',
        '1401': 0.00,
        '140101': '',
        '140102': '',
        '140103': '',
        '140104': '',
        '140105': '',
        '140106': '',
        '1501': 0.00,
        '170101': '',
        '170102': '',
        '170103': '',
        '170112': '',
        '170113': '',
        '170114': '',
        '170115': '',
        '1601': '',
        '1701': '',
        '1801': ''
      },
      finalAccounts: {
        '1001': 0,
        '100101': 0,
        '100102': 0,
        '1201': 0,
        '120101': 0,
        '120102': 0,
        '120103': 0,
        '120104': 0,
        '1301': 0,
        '130101': 0,
        '130102': 0,
        '130103': 0,
        '130104': 0,
        '130105': 0,
        '130106': 0,
        '1401': 0,
        '140101': 0,
        '140102': 0,
        '140103': 0,
        '140104': 0,
        '140105': 0,
        '140106': 0,
        '1501': 0,
        '170101': 0,
        '170102': 0,
        '170103': 0,
        '170112': 0,
        '170113': 0,
        '170114': 0,
        '170115': 0,
        '1601': 0,
        '1701': 0,
        '1801': 0
      }
    }
  },
  computed: {
    ...mapState({
      budgetId: state => state.budgetId,
      userInfo: state => state.userInfo
    })
  },
  watch: {
    'formBudget.companyName': function (newVal, oldVal) {
      if (newVal === '31207' || newVal === 31207) {
        this.rateCompany = 0.04
        this.rateManagement = 0.04
      } else {
        this.rateCompany = 0.015
        this.rateManagement = 0.05
      }
    },
    // 1001
    'finalAccounts.100101': function (newVal, oldVal) {
      this.finalAccounts['1001'] = (Number(newVal) + Number(this.finalAccounts['100102'])).toFixed(2)
    },
    'finalAccounts.100102': function (newVal, oldVal) {
      this.finalAccounts['1001'] = (Number(this.finalAccounts['100101']) + Number(newVal)).toFixed(2)
    },
    // 1201
    'finalAccounts.120101': function (newVal, oldVal) {
      this.finalAccounts['1201'] = (Number(newVal) + Number(this.finalAccounts['120102']) + Number(this.finalAccounts['120103']) + Number(this.finalAccounts['120104'])).toFixed(2)
    },
    'finalAccounts.120102': function (newVal, oldVal) {
      this.finalAccounts['1201'] = (Number(this.finalAccounts['120101']) + Number(newVal) + Number(this.finalAccounts['120103']) + Number(this.finalAccounts['120104'])).toFixed(2)
    },
    'finalAccounts.120103': function (newVal, oldVal) {
      this.finalAccounts['1201'] = (Number(this.finalAccounts['120101']) + Number(this.finalAccounts['120102']) + Number(newVal) + Number(this.finalAccounts['120104'])).toFixed(2)
    },
    'finalAccounts.120104': function (newVal, oldVal) {
      this.finalAccounts['1201'] = (Number(this.finalAccounts['120101']) + Number(this.finalAccounts['120102']) + Number(this.finalAccounts['120103']) + Number(newVal)).toFixed(2)
    },
    // 1301
    'finalAccounts.130101': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(newVal) + Number(this.finalAccounts['130102']) + Number(this.finalAccounts['130103']) + Number(this.finalAccounts['130104']) + Number(this.finalAccounts['130105']) + Number(this.finalAccounts['130106'])).toFixed(2)
    },
    'finalAccounts.130102': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(this.finalAccounts['130101']) + Number(newVal) + Number(this.finalAccounts['130103']) + Number(this.finalAccounts['130104']) + Number(this.finalAccounts['130105']) + Number(this.finalAccounts['130106'])).toFixed(2)
    },
    'finalAccounts.130103': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(this.finalAccounts['130101']) + Number(this.finalAccounts['130102']) + Number(newVal) + Number(this.finalAccounts['130104']) + Number(this.finalAccounts['130105']) + Number(this.finalAccounts['130106'])).toFixed(2)
    },
    'finalAccounts.130104': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(this.finalAccounts['130101']) + Number(this.finalAccounts['130102']) + Number(this.finalAccounts['130103']) + Number(newVal) + Number(this.finalAccounts['130105']) + Number(this.finalAccounts['130106'])).toFixed(2)
    },
    'finalAccounts.130105': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(this.finalAccounts['130101']) + Number(this.finalAccounts['130102']) + Number(this.finalAccounts['130103']) + Number(this.finalAccounts['130104']) + Number(newVal) + Number(this.finalAccounts['130106'])).toFixed(2)
    },
    'finalAccounts.130106': function (newVal, oldVal) {
      this.finalAccounts['1301'] = (Number(this.finalAccounts['130101']) + Number(this.finalAccounts['130102']) + Number(this.finalAccounts['130103']) + Number(this.finalAccounts['130104']) + Number(this.finalAccounts['130105']) + Number(newVal)).toFixed(2)
    },
    // 1401
    'finalAccounts.140101': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(newVal) + Number(this.finalAccounts['140102']) + Number(this.finalAccounts['140103']) + Number(this.finalAccounts['140104']) + Number(this.finalAccounts['140105']) + Number(this.finalAccounts['140106'])).toFixed(2)
    },
    'finalAccounts.140102': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(this.finalAccounts['140101']) + Number(newVal) + Number(this.finalAccounts['140103']) + Number(this.finalAccounts['140104']) + Number(this.finalAccounts['140105']) + Number(this.finalAccounts['140106'])).toFixed(2)
    },
    'finalAccounts.140103': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(this.finalAccounts['140101']) + Number(this.finalAccounts['140102']) + Number(newVal) + Number(this.finalAccounts['140104']) + Number(this.finalAccounts['140105']) + Number(this.finalAccounts['140106'])).toFixed(2)
    },
    'finalAccounts.140104': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(this.finalAccounts['140101']) + Number(this.finalAccounts['140102']) + Number(this.finalAccounts['140103']) + Number(newVal) + Number(this.finalAccounts['140105']) + Number(this.finalAccounts['140106'])).toFixed(2)
    },
    'finalAccounts.140105': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(this.finalAccounts['140101']) + Number(this.finalAccounts['140102']) + Number(this.finalAccounts['140103']) + Number(this.finalAccounts['140104']) + Number(newVal) + Number(this.finalAccounts['140106'])).toFixed(2)
    },
    'finalAccounts.140106': function (newVal, oldVal) {
      this.finalAccounts['1401'] = (Number(this.finalAccounts['140101']) + Number(this.finalAccounts['140102']) + Number(this.finalAccounts['140103']) + Number(this.finalAccounts['140104']) + Number(this.finalAccounts['140105']) + Number(newVal)).toFixed(2)
    },
    // 1501
    // 'finalAccounts.170101': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(newVal) + Number(this.finalAccounts['170102']) + Number(this.finalAccounts['170103']) + Number(this.finalAccounts['170112']) + Number(this.finalAccounts['170113']) + Number(this.finalAccounts['170114']) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170102': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(newVal) + Number(this.finalAccounts['170103']) + Number(this.finalAccounts['170112']) + Number(this.finalAccounts['170113']) + Number(this.finalAccounts['170114']) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170103': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(this.finalAccounts['170102']) + Number(newVal) + Number(this.finalAccounts['170112']) + Number(this.finalAccounts['170113']) + Number(this.finalAccounts['170114']) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170112': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(this.finalAccounts['170102']) + Number(this.finalAccounts['170103']) + Number(newVal) + Number(this.finalAccounts['170113']) + Number(this.finalAccounts['170114']) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170113': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(this.finalAccounts['170102']) + Number(this.finalAccounts['170103']) + Number(this.finalAccounts['170112']) + Number(newVal) + Number(this.finalAccounts['170114']) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170114': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(this.finalAccounts['170102']) + Number(this.finalAccounts['170103']) + Number(this.finalAccounts['170112']) + Number(this.finalAccounts['170113']) + Number(newVal) + Number(this.finalAccounts['170115'])).toFixed(2)
    // },
    // 'finalAccounts.170115': function (newVal, oldVal) {
    //   this.finalAccounts['1501'] = (Number(this.finalAccounts['170101']) + Number(this.finalAccounts['170102']) + Number(this.finalAccounts['170103']) + Number(this.finalAccounts['170112']) + Number(this.finalAccounts['170113']) + Number(this.finalAccounts['170114']) + Number(newVal)).toFixed(2)
    // },
    // budget
    // 1001
    'budget.100101': function (newVal, oldVal) {
      this.budget['1001'] = (Number(newVal) + Number(this.budget['100102'])).toFixed(2)
    },
    'budget.100102': function (newVal, oldVal) {
      this.budget['1001'] = (Number(this.budget['100101']) + Number(newVal)).toFixed(2)
    },
    // 1201
    'budget.120101': function (newVal, oldVal) {
      this.budget['1201'] = (Number(newVal) + Number(this.budget['120102']) + Number(this.budget['120103']) + Number(this.budget['120104'])).toFixed(2)
    },
    'budget.120102': function (newVal, oldVal) {
      this.budget['1201'] = (Number(this.budget['120101']) + Number(newVal) + Number(this.budget['120103']) + Number(this.budget['120104'])).toFixed(2)
    },
    'budget.120103': function (newVal, oldVal) {
      this.budget['1201'] = (Number(this.budget['120101']) + Number(this.budget['120102']) + Number(newVal) + Number(this.budget['120104'])).toFixed(2)
    },
    'budget.120104': function (newVal, oldVal) {
      this.budget['1201'] = (Number(this.budget['120101']) + Number(this.budget['120102']) + Number(this.budget['120103']) + Number(newVal)).toFixed(2)
    },
    // 1301
    'budget.130101': function (newVal, oldVal) {
      this.budget['1301'] = (Number(newVal) + Number(this.budget['130102']) + Number(this.budget['130103']) + Number(this.budget['130104']) + Number(this.budget['130105']) + Number(this.budget['130106'])).toFixed(2)
    },
    'budget.130102': function (newVal, oldVal) {
      this.budget['1301'] = (Number(this.budget['130101']) + Number(newVal) + Number(this.budget['130103']) + Number(this.budget['130104']) + Number(this.budget['130105']) + Number(this.budget['130106'])).toFixed(2)
    },
    'budget.130103': function (newVal, oldVal) {
      this.budget['1301'] = (Number(this.budget['130101']) + Number(this.budget['130102']) + Number(newVal) + Number(this.budget['130104']) + Number(this.budget['130105']) + Number(this.budget['130106'])).toFixed(2)
    },
    'budget.130104': function (newVal, oldVal) {
      this.budget['1301'] = (Number(this.budget['130101']) + Number(this.budget['130102']) + Number(this.budget['130103']) + Number(newVal) + Number(this.budget['130105']) + Number(this.budget['130106'])).toFixed(2)
    },
    'budget.130105': function (newVal, oldVal) {
      this.budget['1301'] = (Number(this.budget['130101']) + Number(this.budget['130102']) + Number(this.budget['130103']) + Number(this.budget['130104']) + Number(newVal) + Number(this.budget['130106'])).toFixed(2)
    },
    'budget.130106': function (newVal, oldVal) {
      this.budget['1301'] = (Number(this.budget['130101']) + Number(this.budget['130102']) + Number(this.budget['130103']) + Number(this.budget['130104']) + Number(this.budget['130105']) + Number(newVal)).toFixed(2)
    },
    // 1401
    'budget.140101': function (newVal, oldVal) {
      this.budget['1401'] = (Number(newVal) + Number(this.budget['140102']) + Number(this.budget['140103']) + Number(this.budget['140104']) + Number(this.budget['140105']) + Number(this.budget['140106'])).toFixed(2)
    },
    'budget.140102': function (newVal, oldVal) {
      this.budget['1401'] = (Number(this.budget['140101']) + Number(newVal) + Number(this.budget['140103']) + Number(this.budget['140104']) + Number(this.budget['140105']) + Number(this.budget['140106'])).toFixed(2)
    },
    'budget.140103': function (newVal, oldVal) {
      this.budget['1401'] = (Number(this.budget['140101']) + Number(this.budget['140102']) + Number(newVal) + Number(this.budget['140104']) + Number(this.budget['140105']) + Number(this.budget['140106'])).toFixed(2)
    },
    'budget.140104': function (newVal, oldVal) {
      this.budget['1401'] = (Number(this.budget['140101']) + Number(this.budget['140102']) + Number(this.budget['140103']) + Number(newVal) + Number(this.budget['140105']) + Number(this.budget['140106'])).toFixed(2)
    },
    'budget.140105': function (newVal, oldVal) {
      this.budget['1401'] = (Number(this.budget['140101']) + Number(this.budget['140102']) + Number(this.budget['140103']) + Number(this.budget['140104']) + Number(newVal) + Number(this.budget['140106'])).toFixed(2)
    },
    'budget.140106': function (newVal, oldVal) {
      this.budget['1401'] = (Number(this.budget['140101']) + Number(this.budget['140102']) + Number(this.budget['140103']) + Number(this.budget['140104']) + Number(this.budget['140105']) + Number(newVal)).toFixed(2)
    }
    // 'formBudget.rate': function (newVal, oldVal) {
    //   if (newVal === 'A') {
    //     this.budget['170102'] = (this.budget['1001']) / 1.03 * 0.03
    //   }
    //   if (newVal === 'B') {
    //     this.budget['170103'] = (this.budget['1001']) / 1.09 * 0.09 - (this.budget['1201']) / 1.13 * 0.13 - (this.budget['130102']) / 1.09 * 0.09 - (this.budget['130103']) / 1.03 * 0.03
    //   }
    //   if (newVal === 'C') {
    //     this.budget['170101'] = ((this.budget['1001']) - (this.budget['1201'])) / 1.13 * 0.13 - (this.budget['130102']) / 1.09 * 0.09 - (this.budget['130103']) / 1.03 * 0.03
    //   }
    // },
    // 'budget.170101': function (newVal, oldVal) {
    //   this.budget['170112'] = (newVal + this.budget['170102'] + this.budget['170103']) * 0.1
    // },
    // 'budget.170102': function (newVal, oldVal) {
    //   this.budget['170112'] = (this.budget['170101'] + newVal + this.budget['170103']) * 0.1
    // },
    // 'budget.170103': function (newVal, oldVal) {
    //   this.budget['170112'] = (this.budget['170101'] + this.budget['170102'] + newVal) * 0.1
    // }
    // // 1501
    // 'budget.170101': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(newVal) + Number(this.budget['170102']) + Number(this.budget['170103']) + Number(this.budget['170112']) + Number(this.budget['170113']) + Number(this.budget['170114']) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170102': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(newVal) + Number(this.budget['170103']) + Number(this.budget['170112']) + Number(this.budget['170113']) + Number(this.budget['170114']) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170103': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(this.budget['170102']) + Number(newVal) + Number(this.budget['170112']) + Number(this.budget['170113']) + Number(this.budget['170114']) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170112': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(this.budget['170102']) + Number(this.budget['170103']) + Number(newVal) + Number(this.budget['170113']) + Number(this.budget['170114']) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170113': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(this.budget['170102']) + Number(this.budget['170103']) + Number(this.budget['170112']) + Number(newVal) + Number(this.budget['170114']) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170114': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(this.budget['170102']) + Number(this.budget['170103']) + Number(this.budget['170112']) + Number(this.budget['170113']) + Number(newVal) + Number(this.budget['170115'])).toFixed(2)
    // },
    // 'budget.170115': function (newVal, oldVal) {
    //   this.budget['1501'] = (Number(this.budget['170101']) + Number(this.budget['170102']) + Number(this.budget['170103']) + Number(this.budget['170112']) + Number(this.budget['170113']) + Number(this.budget['170114']) + Number(newVal)).toFixed(2)
    // }
  },
  created () {
    this.getCompanyName()
    this.getProjectCategory()
    this.getDetail()
  },
  methods: {
    toggleShow () {
      // this.ifShow = !this.ifShow
    },
    back () {
      this.$router.push({name: 'BudgetList'})
    },
    getCompanyName () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL>select fitemid,fname from t_item where fitemclassid=3002</FSQL>'
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
        this.companyOptions = JSON.parse(HtmlStr)
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    getProjectCategory () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select fitemid,fname from t_item where fitemclassid=3003 and fname<>'空调项目']]></FSQL>"
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
        this.categoryOptions = JSON.parse(HtmlStr)
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    changeCustomerName (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_organization where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.customerList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.departmentList = []
      }
    },
    changeDepartment (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_department where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.departmentList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.departmentList = []
      }
    },
    changeSalesman (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname from t_emp where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.salesmanList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.salesmanList = []
      }
    },
    changeProject (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname,fnumber from t_item where fitemclassid=3001 and fnumber like '%" + val + "%' order by fnumber</FSQL>"
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
          this.projectCodeList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.projectList = []
      }
    },
    changeCompilingP (val) {
      if (val !== '') {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>select top 50 fitemid,fname,fnumber from t_organization where fname like '%" + val + "%' order by fnumber</FSQL>"
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
          this.compilingPList = JSON.parse(HtmlStr)
        }).catch((error) => {
          this.$message({
            message: '接口报错!',
            type: 'error'
          })
          console.log(error)
        })
      } else {
        this.projectList = []
      }
    },
    // 返回选中选项
    checkPCode (item) {
      return item.fitemid === this.curPCodeFItemID
    },
    changePCode (val, idx) {
      this.getFinalAccounts(val)
      this.curPCodeFItemID = val
      let resultItem = (this.projectCodeList.filter(this.checkPCode))[0]
      this.formBudget.projectName = resultItem.fname
    },
    InitialFinalAccounts () {
      this.finalAccounts = {
        '1001': 0,
        '100101': 0,
        '100102': 0,
        '1201': 0,
        '120101': 0,
        '120102': 0,
        '120103': 0,
        '120104': 0,
        '1301': 0,
        '130101': 0,
        '130102': 0,
        '130103': 0,
        '130104': 0,
        '130105': 0,
        '130106': 0,
        '1401': 0,
        '140101': 0,
        '140102': 0,
        '140103': 0,
        '140104': 0,
        '140105': 0,
        '140106': 0,
        '1501': 0,
        '170101': 0,
        '170102': 0,
        '170103': 0,
        '170112': 0,
        '170113': 0,
        '170114': 0,
        '170115': 0,
        '1601': 0,
        '1701': 0,
        '1801': 0
      }
    },
    getFinalAccounts (FItemID) {
      this.InitialFinalAccounts()
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL>select * from z_finaldetail where fitemid=' + FItemID + '</FSQL>'
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
        if (Info.length > 0) {
          console.log(Info[0])
          this.pro.map(pro => {
            if (Info[0][pro]) {
              let proAfter = pro.replace('.', '')
              this.finalAccounts[proAfter] = Info[0][pro]
            }
          })
        }
        console.log('finalAccounts', this.finalAccounts)
      }).catch((error) => {
        this.$message({
          message: '接口报错!',
          type: 'error'
        })
        console.log(error)
      })
    },
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btLoading = true
          let topData = {
            'items': [{
              'FCompanyID': this.formBudget.companyName,
              'FDeptID': this.formBudget.department,
              'FEmpID': this.formBudget.salesman,
              'FMangerID': this.formBudget.projectManager,
              'FCustID': this.formBudget.customerName,
              'FProjectID': this.formBudget.projectCode,
              'FTypeID': this.formBudget.projectCategory,
              'FDate': this.formBudget.establishmentDate,
              'FDate2': this.formBudget.finishedDate ? this.formBudget.finishedDate : '1900-01-01',
              'FBillerID': this.userInfo.fempid,
              'FRate': this.formBudget.rate
            }]
          }
          let botData = {'items': [
            {
              '1001.01': this.budget['100101'],
              '1001.02': this.budget['100102'],
              '1201.01': this.budget['120101'],
              '1201.02': this.budget['120102'],
              '1201.03': this.budget['120103'],
              '1201.04': this.budget['120104'],
              '1301.01': this.budget['130101'],
              '1301.02': this.budget['130102'],
              '1301.03': this.budget['130103'],
              '1301.04': this.budget['130104'],
              '1301.05': this.budget['130105'],
              '1301.06': this.budget['130106'],
              '1401.01': this.budget['140101'],
              '1401.02': this.budget['140102'],
              '1401.03': this.budget['140103'],
              '1401.04': this.budget['140104'],
              '1401.05': this.budget['140105'],
              '1401.06': this.budget['140106'],
              '1701.01': (this.formBudget.rate === 'C' ? (((Number(this.budget['1001']) - Number(this.budget['1201'])) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)) : 0),
              '1701.02': this.formBudget.rate === 'A' ? ((Number(this.budget['1001']) / 1.03 * 0.03).toFixed(2)) : 0,
              '1701.03': this.formBudget.rate === 'B' ? ((Number(this.budget['1001']) / 1.09 * 0.09 - Number(this.budget['1201']) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)) : 0,
              '1701.12': ((this.formBudget.rate === 'A' ? ((Number(this.budget['1001']) / 1.03 * 0.03).toFixed(2)) : (this.formBudget.rate === 'B' ? ((Number(this.budget['1001']) / 1.09 * 0.09 - Number(this.budget['1201']) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(this.budget['1001']) - Number(this.budget['1201'])) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)))) * 0.1).toFixed(2),
              '1701.13': (Number(this.budget['1001']) * this.rateCompany).toFixed(2),
              '1701.14': (Number(this.budget['1001']) * 0.0003).toFixed(2),
              '1701.15': (Number(this.budget['1001']) * this.rateManagement).toFixed(2),
              '1801': Number(this.budget['1001']) === 0 ? 0 : (((Number(this.budget['1001']) - Number(this.budget['1201']) - Number(this.budget['1301']) - Number(this.budget['1401']) - (((this.formBudget.rate === 'A' ? ((Number(this.budget['1001']) / 1.03 * 0.03).toFixed(2)) : (this.formBudget.rate === 'B' ? ((Number(this.budget['1001']) / 1.09 * 0.09 - Number(this.budget['1201']) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(this.budget['1001']) - Number(this.budget['1201'])) / 1.13 * 0.13 - Number(this.budget['130102']) / 1.09 * 0.09 - Number(this.budget['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(this.budget['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2))) / Number(this.budget['1001'])).toFixed(2))
            },
            {
              '1001.01': this.finalAccounts['100101'],
              '1001.02': this.finalAccounts['100102'],
              '1201.01': this.finalAccounts['120101'],
              '1201.02': this.finalAccounts['120102'],
              '1201.03': this.finalAccounts['120103'],
              '1201.04': this.finalAccounts['120104'],
              '1301.01': this.finalAccounts['130101'],
              '1301.02': this.finalAccounts['130102'],
              '1301.03': this.finalAccounts['130103'],
              '1301.04': this.finalAccounts['130104'],
              '1301.05': this.finalAccounts['130105'],
              '1301.06': this.finalAccounts['130106'],
              '1401.01': this.finalAccounts['140101'],
              '1401.02': this.finalAccounts['140102'],
              '1401.03': this.finalAccounts['140103'],
              '1401.04': this.finalAccounts['140104'],
              '1401.05': this.finalAccounts['140105'],
              '1401.06': this.finalAccounts['140106'],
              '1701.01': (this.formBudget.rate === 'C' ? (((Number(this.finalAccounts['1001']) - Number(this.finalAccounts['1201'])) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : 0),
              '1701.02': this.formBudget.rate === 'A' ? ((Number(this.finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : 0,
              '1701.03': this.formBudget.rate === 'B' ? ((Number(this.finalAccounts['1001']) / 1.09 * 0.09 - Number(this.finalAccounts['1201']) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : 0,
              '1701.12': ((this.formBudget.rate === 'A' ? ((Number(this.finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (this.formBudget.rate === 'B' ? ((Number(this.finalAccounts['1001']) / 1.09 * 0.09 - Number(this.finalAccounts['1201']) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(this.finalAccounts['1001']) - Number(this.finalAccounts['1201'])) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * 0.1).toFixed(2),
              '1701.13': (Number(this.finalAccounts['1001']) * 0.04).toFixed(2),
              '1701.14': (Number(this.finalAccounts['1001']) * 0.0003).toFixed(2),
              '1701.15': (Number(this.finalAccounts['1001']) * 0.04).toFixed(2),
              '1801': Number(this.finalAccounts['1001']) === 0 ? 0 : (((Number(this.finalAccounts['1001']) - Number(this.finalAccounts['1201']) - Number(this.finalAccounts['1301']) - Number(this.finalAccounts['1401']) - (((this.formBudget.rate === 'A' ? ((Number(this.finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) : (this.formBudget.rate === 'B' ? ((Number(this.finalAccounts['1001']) / 1.09 * 0.09 - Number(this.finalAccounts['1201']) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) : (((Number(this.finalAccounts['1001']) - Number(this.finalAccounts['1201'])) / 1.13 * 0.13 - Number(this.finalAccounts['130102']) / 1.09 * 0.09 - Number(this.finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)))) * (1 + 0.1) + Number(this.finalAccounts['1001']) * (0.04 + 0.0003 + 0.04)).toFixed(2))) / Number(this.finalAccounts['1001'])).toFixed(2))
            }
          ]}
          console.log(topData, botData)
          var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
          tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
          tmpData += '<soap:Body> '
          tmpData += '<Final xmlns="http://tempuri.org/">'
          tmpData += '<FJSONBtou>' + JSON.stringify(topData) + '</FJSONBtou>'
          tmpData += '<FJSONBti>' + JSON.stringify(botData) + '</FJSONBti>'
          tmpData += '<ID>' + this.budgetId + '</ID>'
          tmpData += '</Final>'
          tmpData += '</soap:Body>'
          tmpData += '</soap:Envelope>'
          this.Http.post('Final', tmpData
          ).then(res => {
            let xml = res.data
            let parser = new DOMParser()
            let xmlDoc = parser.parseFromString(xml, 'text/xml')
            // 提取数据
            let Result = xmlDoc.getElementsByTagName('FinalResponse')[0].getElementsByTagName('FinalResult')[0]
            let HtmlStr = $(Result).html()
            let Info = (JSON.parse(HtmlStr))[0]
            if (Info.code === '1') {
              this.$message({
                message: '修改成功!',
                type: 'success'
              })
              this.btLoading = false
              // this.updateContractId(Info.ID)
              // this.$router.push({name: 'ContractDetail'})
            } else {
              this.$message({
                message: '修改失败!',
                type: 'error'
              })
              this.btLoading = false
            }
          }).catch((error) => {
            console.log(error)
            this.btLoading = false
          })
        } else {
          this.$message({
            message: '请将信息填写完整!',
            type: 'warning'
          })
          return false
        }
      })
    },
    getDetail () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL><![CDATA[select * from zz_final where finterid=' + this.budgetId + ']]></FSQL>'
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
        let Info = JSON.parse(HtmlStr)
        console.log('Detail', Info)
        if (Info.length > 0) {
          this.formBudget = {
            companyName: Info[0].FCompanyID,
            customerName: Info[0].FCustID,
            establishmentDate: Info[0]['编制日期'],
            department: Info[0].FDeptID,
            projectName: Info[0]['项目名称'],
            finishedDate: Info[0]['竣工日期'],
            salesman: Info[0].FEmpID,
            projectCode: Info[0].FProjectID,
            compilingPerson: Info[0]['编制人'],
            projectManager: Info[0]['项目经理'],
            projectCategory: Info[0].FTypeID,
            rate: Info[0]['税率']
          }
          this.finalAccounts = {
            '1001': '',
            '100101': Info[1]['1001.01'],
            '100102': Info[1]['1001.02'],
            '1201': '',
            '120101': Info[1]['1201.01'],
            '120102': Info[1]['1201.02'],
            '120103': Info[1]['1201.03'],
            '120104': Info[1]['1201.04'],
            '1301': '',
            '130101': Info[1]['1301.01'],
            '130102': Info[1]['1301.02'],
            '130103': Info[1]['1301.03'],
            '130104': Info[1]['1301.04'],
            '130105': Info[1]['1301.05'],
            '130106': Info[1]['1301.06'],
            '1401': '',
            '140101': Info[1]['1401.01'],
            '140102': Info[1]['1401.02'],
            '140103': Info[1]['1401.03'],
            '140104': Info[1]['1401.04'],
            '140105': Info[1]['1401.05'],
            '140106': Info[1]['1401.06'],
            '1501': '',
            '170101': Info[1]['1701.01'],
            '170102': Info[1]['1701.02'],
            '170103': Info[1]['1701.03'],
            '170112': Info[1]['1701.12'],
            '170113': Info[1]['1701.13'],
            '170114': Info[1]['1701.14'],
            '170115': Info[1]['1701.15'],
            '1601': '',
            '1701': '',
            '1801': Info[0]['1801']
          }
          this.budget = {
            '1001': '',
            '100101': Info[0]['1001.01'] > 0 ? Info[0]['1001.01'] : '',
            '100102': Info[0]['1001.02'] > 0 ? Info[0]['1001.02'] : '',
            '1201': '',
            '120101': Info[0]['1201.01'] > 0 ? Info[0]['1201.01'] : '',
            '120102': Info[0]['1201.02'] > 0 ? Info[0]['1201.02'] : '',
            '120103': Info[0]['1201.03'] > 0 ? Info[0]['1201.03'] : '',
            '120104': Info[0]['1201.04'] > 0 ? Info[0]['1201.04'] : '',
            '1301': '',
            '130101': Info[0]['1301.01'] > 0 ? Info[0]['1301.01'] : '',
            '130102': Info[0]['1301.02'] > 0 ? Info[0]['1301.02'] : '',
            '130103': Info[0]['1301.03'] > 0 ? Info[0]['1301.03'] : '',
            '130104': Info[0]['1301.04'] > 0 ? Info[0]['1301.04'] : '',
            '130105': Info[0]['1301.05'] > 0 ? Info[0]['1301.05'] : '',
            '130106': Info[0]['1301.06'] > 0 ? Info[0]['1301.06'] : '',
            '1401': '',
            '140101': Info[0]['1401.01'] > 0 ? Info[0]['1401.01'] : '',
            '140102': Info[0]['1401.02'] > 0 ? Info[0]['1401.02'] : '',
            '140103': Info[0]['1401.03'] > 0 ? Info[0]['1401.03'] : '',
            '140104': Info[0]['1401.04'] > 0 ? Info[0]['1401.04'] : '',
            '140105': Info[0]['1401.05'] > 0 ? Info[0]['1401.05'] : '',
            '140106': Info[0]['1401.06'] > 0 ? Info[0]['1401.06'] : '',
            '1501': '',
            '170101': Info[0]['1701.01'] > 0 ? Info[0]['1701.01'] : '',
            '170102': Info[0]['1701.02'] > 0 ? Info[0]['1701.02'] : '',
            '170103': Info[0]['1701.03'] > 0 ? Info[0]['1701.03'] : '',
            '170112': Info[0]['1701.12'] > 0 ? Info[0]['1701.12'] : '',
            '170113': Info[0]['1701.13'] > 0 ? Info[0]['1701.13'] : '',
            '170114': Info[0]['1701.14'] > 0 ? Info[0]['1701.14'] : '',
            '170115': Info[0]['1701.15'] > 0 ? Info[0]['1701.15'] : '',
            '1601': '',
            '1701': '',
            '1801': Info[0]['1801'] > 0 ? Info[0]['1801'] : ''
          }
          // 初始化下拉框选项
          this.changeCustomerName(Info[0]['客户名称'])
          this.changeDepartment(Info[0]['部门'])
          this.changeSalesman(Info[0]['销售员'])
          this.changeProject(Info[0]['项目编号'])
          // this.changePCode()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
thead{
  height: 35px;
  line-height: 35px;
}
thead tr th{
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
tbody tr td{
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
</style>

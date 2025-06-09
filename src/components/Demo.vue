<template>
  <div class="spread-container">
    <div>
      <button @click="saveData">保存</button>
    </div>
    <gc-spread-sheets
      :hostStyle="{ width: '100%', height: '100%' }"
      @workbookInitialized="initSpread"
    >
      <gc-worksheet></gc-worksheet>
    </gc-spread-sheets>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import "@grapecity-software/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css";
import "@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import '@grapecity/spread-sheets-vue'
import * as GC from '@grapecity/spread-sheets'
import "@grapecity-software/spread-sheets-resources-zh";
import dataService from '../static/dataService' // 确保路径正确
import request from '@/request/index.js'

// 设置中文
GC.Spread.Common.CultureManager.culture('zh-cn')

// 列配置
const colInfos = [
  { name: "order_num", displayName: "订单编号", width: 100 },
  { name: "order_date", displayName: "订购日期", width: 150 },
  { name: "type_name", displayName: "类别名称" },
  { name: "product_name", displayName: "产品名称" },
  { name: "quantity", displayName: "购买数量" },
  { name: "unit_price", displayName: "产品单价" },
  { name: "cost", displayName: "产品成本" },
  { name: "discount", displayName: "折扣" },
  { name: "order_amount", displayName: "订单金额" },
  { name: "order_profit", displayName: "订单利润" },
  { name: "sales_area", displayName: "销售大区" },
  { name: "province", displayName: "销售省份" },
  { name: "city", displayName: "销售城市" },
  { name: "store", displayName: "销售门店" },
  { name: "consultant", displayName: "销售顾问" },
  { name: "pay_method", displayName: "支付方式" },
  { name: "cus_name", displayName: "顾客姓名" },
  { name: "cus_phone", displayName: "顾客电话" },
]

const spreadInstance = ref(null)
// 初始化Spread
const initSpread = (spread) => {
  spreadInstance.value = spread
  // 禁止用户编辑（可选）
  spread.options.allowUserEdit = false
  
  // 获取活动工作表
  const sheet = spread.getActiveSheet()
  
  // 设置不自动生成列
  sheet.autoGenerateColumns = false
  
  // 绑定列配置
  sheet.bindColumns(colInfos)
  
  // 设置数据源
  sheet.setDataSource(dataService.getDataByNumber(100))
  
  // 设置默认样式
  const defaultStyle = new GC.Spread.Sheets.Style()
  defaultStyle.font = '12px Microsoft YaHei'
  defaultStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center
  defaultStyle.vAlign = GC.Spread.Sheets.VerticalAlign.center
  sheet.setDefaultStyle(defaultStyle)
  
  // 设置标题行样式
  const headerStyle = new GC.Spread.Sheets.Style()
  headerStyle.backColor = '#4472C4'
  headerStyle.foreColor = 'white'
  headerStyle.font = 'bold 12px Microsoft YaHei'
  sheet.setStyle(0, -1, headerStyle) // -1表示所有列
  
  // 冻结首行（标题行）
  sheet.frozenRowCount(1)
  
  // 自动调整列宽（可选）
  sheet.autoFitColumn(0, sheet.getColumnCount())
}

onMounted(() => {
  getData()
})

async function getData() {
  let res = await request.get('/Restful/JinQue.G1Orders.Entities.Sys_SELL_Sales_Order/GetIntentOrder')
  console.log(res)
}

function saveData() {
  if (!spreadInstance.value) return
  // 获取改动的数据
  const sheet = spreadInstance.value.getActiveSheet()
  const dirtyCells = sheet.getDirtyCells()
  console.log('改动的数据:', dirtyCells)
}

// 组件卸载时清理
onBeforeUnmount(() => {
  // 可以在这里添加清理逻辑
})
</script>

<style scoped>
.spread-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
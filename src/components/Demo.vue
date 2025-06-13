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
import dataService from '../static/dataService'
import request from '@/request/index.js'

// 设置中文
GC.Spread.Common.CultureManager.culture('zh-cn')
// 许可证
GC.Spread.Sheets.LicenseKey = 'E789772571764418#B1upzS7I6V5kVc0ljMqN4L5hFNvM5a6lTQhJ5KiVWOJtie4ZzbZF7SJ3GUmhFTMpkMqxkS7JXUrgzZvkjaShGT6EVVMpGeltURahkeRhkVOJDe7I7d6JXN0F7YLZVWjpGTVF4KyQVeNRkN8QTRzZDU7M7ZVVzKnJVVil5bwsEe8oXQtpXVzlXS4M5dGZ6UqVFezBDT7RURBdFdXhWWz3yLmdHW8cFTBVkenR4SudEd5ITMmZUdMdHVmRXOWdzb0ZFbUdUQEJ4QykHd9VGOrF5UrFnTytSeRlFUzNGSIpHTQtCaiNDZ8I6Sjp5T7gGVKx6UIV7a8F4dXlUc5Yjex8kS7FkMWN4YRNTU736SxFTeVNkI0IyUiwiI9kjNwMTMBRjI0ICSiwCOxIzMwMzN9QTM0IicfJye#4Xfd5nIIlkSCJiOiMkIsICOx8idgMlSgQWYlJHcTJiOi8kI1tlOiQmcQJCLikjM7UzMwAiMxYDM5IDMyIiOiQncDJCLiAzM6ATNyAjMiojIwhXRiwiIx8CMuAjL7ITMiojIz5GRiwiI8+Y9sWY9QmZ0Jyp96uL9v6L0v6L07WY0sqL9X6Y9iojIh94QiwSZ5JHd0ICb6VkIsICOxQDN6cTM7UjM7cTO8cjI0ICZJJCL35lI4JXYoNUY4FGRiwiI4VWZoNFdy3GclJlIbpjInxmZiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zdjF7KBdkdalGUNZmTYdEMstSUKtyVO3yR9FmMHhzNUdzKpNXTndjZNFUTpFkQ5EGeSdjeWdXUz4WdyMHWuNjSBZ7NvBJQ'
console.log('GC', GC)
// GC.Spread.Sheets.Designer.LicenseKey = 'Designer-E167413563155422#B1QTg9EZzh4a6BnUshGV9VTaMNXTxYzbHhFWrZ4aXFURzp7T9olQEFkc58UcIhWcjFVS8YFO5lmMzljcydUTRBDWkd6dxFmYwQ5SiR4K5JHSJVGbl5GZBZ5RvcHezB7T4lnczNmUHt4bHZUOURlbqlEcuVDdFVHVpF5SitGSXJmVx5GcrZjQwI7LWZTdpBVOrcGdKRDSShTZkpXYrdWZpJVaa3SbKlXe8gHbk5kdqFUdQpHZC3GTPJHVklEVplHVXJjQw2WbyEEeHJVWVhnZRlWU594cExGejVUerJVYyxkSwdVcw34dyJTdyIkQHlHUOhFb8g4YYtCSSNTQTV7Z9I5Mxw4Ly9mTiojITJCLikzNyADMwQDNiojIIJCL7UTM5EjM4ETO0IicfJye35XX3JCSJpkQiojIDJCLigTMuYHITpEIkFWZyB7UiojIOJyebpjIkJHUiwiIwMzN5MDMgITM6ATNyAjMiojI4J7QiwiIwMjNwUjMwIjI0ICc8VkIsICMuAjLw8CMvIXZudWazVGZiojIz5GRiwiI8+Y9sWY9QmZ0Jyp96uL9v6L0v6L07WY0sqL9X6Y9iojIh94QiwSZ5JHd0ICb6VkIsIiMyQTN5EzM6UzMxQzN6EjI0ICZJJCL355W0IyZsZmIsUWdyRnOiI7ckJye0ICbuFkI1pjIEJCLi4TPBhzb5lGRxoFSUtWam5URoV7K9V5QnFTVpVWV4ZkYZN7ZrpWZxFDdaN5S4hWNwgjTMRGaWZlW8tUdyIjZXV5SDJXRTFjZitmdotEdhpla5x'

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

    // 设置二级表头（两行）
  sheet.setRowCount(2); // 前两行为表头

  // 一级表头文字
  sheet.setValue(0, 0, "订单信息");
  sheet.setValue(0, 3, "产品信息");
  sheet.setValue(0, 5, "价格信息");
  sheet.setValue(0, 9, "销售信息");
  sheet.setValue(0, 15, "顾客信息");

    // 二级表头用 bindColumns 自动生成（从第2行开始）
  sheet.setRowCount(2, GC.Spread.Sheets.SheetArea.colHeader);
  sheet.addSpan(0, 0, 1, 3, GC.Spread.Sheets.SheetArea.colHeader);
  sheet.setValue(0, 0, "Company", GC.Spread.Sheets.SheetArea.colHeader);

  // 分组
  sheet.columnOutlines.group(0, 2);
  
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
  // sheet.frozenRowCount(1)
  
  // 自动调整列宽（可选）
  sheet.autoFitColumn(0, sheet.getColumnCount())

  // 设置日期时间选择器
  const style = new GC.Spread.Sheets.Style();
  style.cellButtons = [
    {
      imageType: GC.Spread.Sheets.ButtonImageType.dropdown,
      command: "openDateTimePicker",
      useButtonStyle: true,
    }
  ];
  style.dropDowns = [
    {
      type: GC.Spread.Sheets.DropDownType.dateTimePicker,
      option: {
        showTime: false,
      }
    }
  ];
  sheet.setStyle(-1, 1, style);
}

onMounted(() => {
  // getData()
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
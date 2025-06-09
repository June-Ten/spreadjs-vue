<template>
  <div
    class="container"
    id="excel-container"
  >
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dataService from '../static/dataService'

onMounted(() => {
  initExcel()
})

const excelInstance = ref(null)
function initExcel() {
  const config = GC.Spread.Sheets.Designer.DefaultConfig
  console.log('config', config)
  config.ribbon = []
  // 初始化SpreadJS
    // const spread = new GC.Spread.Sheets.Workbook(document.getElementById('excel-container'));
    // 设计器模式
    const spreadDesigner = new GC.Spread.Sheets.Designer.Designer(document.getElementById('excel-container'));
    // 设置中文
    GC.Spread.Common.CultureManager.culture('zh-cn');
    const spread = spreadDesigner.getWorkbook();
    // 获取活动工作表
    const sheet = spread.getActiveSheet();
    // 初始化表格
    initSpread(sheet);
}

const spread = ref(null);
const data = ref([
  { product: '产品A', price: 120, stock: 45 },
  { product: '产品B', price: 210, stock: 32 },
  { product: '产品C', price: 85, stock: 67 }
]);

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

const initSpread = (spreadInstance) => {
  const sheet = spreadInstance;
    // 设置列宽
    sheet.setColumnWidth(0, 100);
    sheet.setColumnWidth(1, 200);
    sheet.setColumnWidth(2, 100);
    sheet.setColumnWidth(3, 100);
    
    // 设置列标题
    // sheet.setValue(0, 0, 'ID');
    // sheet.setValue(0, 1, '产品名称');
    // sheet.setValue(0, 2, '价格');
    // sheet.setValue(0, 3, '库存');
    sheet.autoGenerateColumns = false
    sheet.bindColumns(colInfos)
    sheet.setDataSource(dataService.getDataByNumber(100))

    
    // 设置标题样式
    const headerStyle = new GC.Spread.Sheets.Style();
    headerStyle.backColor = '#4472C4';
    headerStyle.foreColor = 'white';
    headerStyle.font = 'bold 14px Arial';
    headerStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center;
    sheet.setStyle(0, -1, headerStyle); // -1表示所有列
    
    // 设置默认单元格样式
    const defaultStyle = new GC.Spread.Sheets.Style();
    defaultStyle.font = '12px Arial';
    defaultStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center;
    sheet.setDefaultStyle(defaultStyle);
};


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
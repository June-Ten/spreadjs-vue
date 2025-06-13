<template>
  <div class="container">
    <div id="toolbar">
      <button id="btnLoadData">加载数据</button>
      <button id="btnSaveData">保存数据</button>
      <button id="btnAddRow">添加行</button>
      <button id="btnGroupRows">分组行</button>
      <button @click="getRowData">获取行数据</button>
    </div>
    <div
      id="excel-container"
      style="height: calc(100% - 100px);"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dataService from '../static/dataService'

// 设置中文
GC.Spread.Common.CultureManager.culture("zh-cn");

onMounted(() => {
  initExcel()
})

const spreadInstance = ref(null)
const sheetInstance = ref(null)

function initExcel() {
  const config = GC.Spread.Sheets.Designer.DefaultConfig
  config.ribbon = []
  // 初始化SpreadJS
  // const spread = new GC.Spread.Sheets.Workbook(document.getElementById('excel-container'));
  // 设计器模式
  const spreadDesigner = new GC.Spread.Sheets.Designer.Designer(document.getElementById('excel-container'));
  console.log('spreadDesigner', spreadDesigner)
  spreadInstance.value = spreadDesigner;
  const spread = spreadDesigner.getWorkbook();
  // 获取活动工作表
  const sheet = spread.getActiveSheet();
  sheetInstance.value = sheet;
  // 初始化表格
  initSpread(sheet);
}

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
  // sheet.setColumnWidth(0, 100);
  // sheet.setColumnWidth(1, 200);
  // sheet.setColumnWidth(2, 100);
  // sheet.setColumnWidth(3, 100);

  // 设置列标题
  // sheet.setValue(0, 0, 'ID');
  // sheet.setValue(0, 1, '产品名称');
  // sheet.setValue(0, 2, '价格');
  // sheet.setValue(0, 3, '库存');

  // 设置二级表头（两行）
  sheet.setRowCount(2); // 前两行为表头

  // 一级表头文字
  sheet.setValue(0, 0, "订单信息");
  sheet.setValue(0, 3, "产品信息");
  sheet.setValue(0, 5, "价格信息");
  sheet.setValue(0, 9, "销售信息");
  sheet.setValue(0, 15, "顾客信息");

  // 合并一级表头（注意起始列和列数）
  // sheet.addSpan(0, 0, 1, 3);  // 订单信息（0~2列）
  // sheet.addSpan(0, 3, 1, 2);  // 产品信息（3~4列）
  // sheet.addSpan(0, 5, 1, 4);  // 价格信息（5~8列）
  // sheet.addSpan(0, 9, 1, 6);  // 销售信息（9~14列）
  // sheet.addSpan(0, 15, 1, 3); // 顾客信息（15~17列）

  // 二级表头用 bindColumns 自动生成（从第2行开始）
  sheet.setRowCount(2, GC.Spread.Sheets.SheetArea.colHeader);
  sheet.addSpan(0, 0, 1, 3, GC.Spread.Sheets.SheetArea.colHeader);
  sheet.setValue(0, 0, "Company", GC.Spread.Sheets.SheetArea.colHeader);

  // 分组
  sheet.columnOutlines.group(0, 2);

  sheet.autoGenerateColumns = false
  sheet.bindColumns(colInfos)
  sheet.setDataSource(dataService.getDataByNumber(100))


  // 设置标题样式
  // const headerStyle = new GC.Spread.Sheets.Style();
  // headerStyle.backColor = '#4472C4';
  // headerStyle.foreColor = 'white';
  // headerStyle.font = 'bold 14px Arial';
  // headerStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center;
  // sheet.setStyle(0, -1, headerStyle); // -1表示所有列

  // 设置默认单元格样式
  const defaultStyle = new GC.Spread.Sheets.Style();
  defaultStyle.font = '12px Arial';
  defaultStyle.hAlign = GC.Spread.Sheets.HorizontalAlign.center;
  sheet.setDefaultStyle(defaultStyle);

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

  // let style = new GC.Spread.Sheets.Style()
  // style.backColor = "pink"
  // // 添加行状态规则（整行格式设置）
  // sheet.conditionalFormats.addRowStateRule(GC.Spread.Sheets.RowColumnStates.dirty, style, [new GC.Spread.Sheets.Range(-1, -1, -1, -1)]);
  // sheet.repaint();

  // 构造公式，比如第5列是quantity列，表达式为：=$E1<30 （注意列索引转为字母）
  //   const quantityColIndex = 4
  //   const rowCount = sheet.getRowCount();
  // const colCount = sheet.getColumnCount();
  // const formula = `=$${String.fromCharCode(65 + quantityColIndex)}1<30`;

  // const style = new GC.Spread.Sheets.Style();
  // style.backColor = "red";
  // style.foreColor = "white";

  // sheet.conditionalFormats.addRule({
  //   ruleType: GC.Spread.Sheets.ConditionalFormatting.RuleType.expression,
  //   formula: formula,
  //   style: style,
  //   range: [new GC.Spread.Sheets.Range(-1, -1, -1, -1)]
  // });
  // sheet.setStyle(5, -1, style, GC.Spread.Sheets.SheetArea.viewport);
  // sheet.getConditionalFormats().addCellValueRule(GcSpread.Sheets.ComparisonOperator.Between, 0, 60, style, [new GcSpread.Sheets.Range(-1,0,-1,1)]);

  // 设置单元格所在行背景色
  setRowBgColor()
  bindWatch()

};

function setRowBgColor() {
  const sheet = sheetInstance.value;
  sheet.suspendPaint();
  const rowCount = sheet.getRowCount();
  const colCount = sheet.getColumnCount();
  const style = new GC.Spread.Sheets.Style();
  style.backColor = "pink";
  style.foreColor = "white";
  for (let row = 0; row < rowCount; row++) {
    const quantityValue = sheet.getValue(row, colCount); // 假设quantity列在第5列（索引为4）
    if (quantityValue < 30 && row === 2) {
      sheet.setStyle(row, -1, style, GC.Spread.Sheets.SheetArea.viewport);
    }
  }
  sheet.resumePaint();
}

function bindWatch() {
  // 监听数据变化，如果quantity < 30，则设置整行背景色为红色
  const sheet = sheetInstance.value;
  sheet.suspendPaint();
  sheet.bind(GC.Spread.Sheets.Events.ValueChanged, (e, args) => {
    console.log('数据变化了', args, e)
    const row = args.row;
    const col = args.col;
    const quantityColIndex = 4; // 假设quantity列在第5列（索引为4）
    if (col === quantityColIndex) {
      const quantityValue = sheet.getValue(row, col);
      const style = new GC.Spread.Sheets.Style();
      style.backColor = "pink";
      style.foreColor = "white";
      if (quantityValue < 30) {
        sheet.setStyle(row, -1, style, GC.Spread.Sheets.SheetArea.viewport);
      } else {
        sheet.setStyle(row, -1, null, GC.Spread.Sheets.SheetArea.viewport); // 恢复默认样式
      }
    }
  })
  sheet.resumePaint();
}

function getRowData() {
  // 获取第二行的数据
  const sheet = sheetInstance.value;
  const dataSource = sheet.getDataSource();  // 获取绑定的数据源
  const secondRow = dataSource[1];           // 第二行（索引从0开始）
  console.log('第二行的数据:', secondRow);
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
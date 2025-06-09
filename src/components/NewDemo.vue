<template>
  <div
    class="container"
    id="excel-container"
  >
    <!-- <div style="width: 100%; height: 500px; border: 1px solid #ddd;">
      <gc-spread-sheets
        :hostStyle="{ width: '100%', height: '100%' }"
        @workbookInitialized="initSpread"
      >
        <gc-worksheet></gc-worksheet>
      </gc-spread-sheets>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  initExcel()
})

const excelInstance = ref(null)
function initExcel() {
  // const config = GC.Spread.Sheets.Designer.DefaultConfig;
  // excelInstance.value = new GC.Spread.Sheets(document.getElementById("gc-designer-container"), config)
  // 初始化SpreadJS
    const spread = new GC.Spread.Sheets.Workbook(document.getElementById('excel-container'));
    
    // 设置中文
    GC.Spread.Common.CultureManager.culture('zh-cn');
    
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

const initSpread = (spreadInstance) => {
  const sheet = spreadInstance;
    // 设置列宽
    sheet.setColumnWidth(0, 100);
    sheet.setColumnWidth(1, 200);
    sheet.setColumnWidth(2, 100);
    sheet.setColumnWidth(3, 100);
    
    // 设置列标题
    sheet.setValue(0, 0, 'ID');
    sheet.setValue(0, 1, '产品名称');
    sheet.setValue(0, 2, '价格');
    sheet.setValue(0, 3, '库存');
    
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
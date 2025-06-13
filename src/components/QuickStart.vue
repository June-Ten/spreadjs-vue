<template>
  <div class="componentContainer">
    <h3 v-if="false">快速入门指南</h3>
    <div v-if="false">
      按照以下步骤快速将 SpreadJS 应用到 Vue 的应用程序中：
      <div>
        <p>1. 添加 SpreadJS 产品引用到 Vue 的应用程序中。</p>
        <p>2. 添加一个组件来提供数据和业务实现。</p>
        <p>3. 绑定数据，并设置其他 SpreadJS 属性。</p>
        <p>4. 添加一些 css 属性来定制外观。</p>
      </div>
    </div>
    <div class="spreadContainer">
    快速入门
      <gc-spread-sheets-designer
        :styleInfo="{ height: '100%', width: '100%' }"
        :config="null"
        @designerInitialized="initSpread"
      />
    </div>
  </div>
</template>
<script>
import "@grapecity-software/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css";
import "@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

import dataService from "../static/dataService";
import "@grapecity-software/spread-sheets-vue";
import * as GC from "@grapecity-software/spread-sheets";
import "@grapecity-software/spread-sheets-charts";
import "@grapecity-software/spread-sheets-shapes";
import "@grapecity-software/spread-sheets-slicers";
import "@grapecity-software/spread-sheets-print";
import "@grapecity-software/spread-sheets-barcode";
import "@grapecity-software/spread-sheets-pdf";
import "@grapecity-software/spread-sheets-formula-panel";
import "@grapecity-software/spread-sheets-io";
import "@grapecity-software/spread-sheets-resources-zh";
import "@grapecity-software/spread-sheets-designer-resources-cn";
import "@grapecity-software/spread-sheets-designer";

GC.Spread.Common.CultureManager.culture("zh-cn");
GC.Spread.Sheets.LicenseKey = 'E789772571764418#B1upzS7I6V5kVc0ljMqN4L5hFNvM5a6lTQhJ5KiVWOJtie4ZzbZF7SJ3GUmhFTMpkMqxkS7JXUrgzZvkjaShGT6EVVMpGeltURahkeRhkVOJDe7I7d6JXN0F7YLZVWjpGTVF4KyQVeNRkN8QTRzZDU7M7ZVVzKnJVVil5bwsEe8oXQtpXVzlXS4M5dGZ6UqVFezBDT7RURBdFdXhWWz3yLmdHW8cFTBVkenR4SudEd5ITMmZUdMdHVmRXOWdzb0ZFbUdUQEJ4QykHd9VGOrF5UrFnTytSeRlFUzNGSIpHTQtCaiNDZ8I6Sjp5T7gGVKx6UIV7a8F4dXlUc5Yjex8kS7FkMWN4YRNTU736SxFTeVNkI0IyUiwiI9kjNwMTMBRjI0ICSiwCOxIzMwMzN9QTM0IicfJye#4Xfd5nIIlkSCJiOiMkIsICOx8idgMlSgQWYlJHcTJiOi8kI1tlOiQmcQJCLikjM7UzMwAiMxYDM5IDMyIiOiQncDJCLiAzM6ATNyAjMiojIwhXRiwiIx8CMuAjL7ITMiojIz5GRiwiI8+Y9sWY9QmZ0Jyp96uL9v6L0v6L07WY0sqL9X6Y9iojIh94QiwSZ5JHd0ICb6VkIsICOxQDN6cTM7UjM7cTO8cjI0ICZJJCL35lI4JXYoNUY4FGRiwiI4VWZoNFdy3GclJlIbpjInxmZiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zdjF7KBdkdalGUNZmTYdEMstSUKtyVO3yR9FmMHhzNUdzKpNXTndjZNFUTpFkQ5EGeSdjeWdXUz4WdyMHWuNjSBZ7NvBJQ'
GC.Spread.Sheets.Designer.LicenseKey = 'Designer-E167413563155422#B1QTg9EZzh4a6BnUshGV9VTaMNXTxYzbHhFWrZ4aXFURzp7T9olQEFkc58UcIhWcjFVS8YFO5lmMzljcydUTRBDWkd6dxFmYwQ5SiR4K5JHSJVGbl5GZBZ5RvcHezB7T4lnczNmUHt4bHZUOURlbqlEcuVDdFVHVpF5SitGSXJmVx5GcrZjQwI7LWZTdpBVOrcGdKRDSShTZkpXYrdWZpJVaa3SbKlXe8gHbk5kdqFUdQpHZC3GTPJHVklEVplHVXJjQw2WbyEEeHJVWVhnZRlWU594cExGejVUerJVYyxkSwdVcw34dyJTdyIkQHlHUOhFb8g4YYtCSSNTQTV7Z9I5Mxw4Ly9mTiojITJCLikzNyADMwQDNiojIIJCL7UTM5EjM4ETO0IicfJye35XX3JCSJpkQiojIDJCLigTMuYHITpEIkFWZyB7UiojIOJyebpjIkJHUiwiIwMzN5MDMgITM6ATNyAjMiojI4J7QiwiIwMjNwUjMwIjI0ICc8VkIsICMuAjLw8CMvIXZudWazVGZiojIz5GRiwiI8+Y9sWY9QmZ0Jyp96uL9v6L0v6L07WY0sqL9X6Y9iojIh94QiwSZ5JHd0ICb6VkIsIiMyQTN5EzM6UzMxQzN6EjI0ICZJJCL355W0IyZsZmIsUWdyRnOiI7ckJye0ICbuFkI1pjIEJCLi4TPBhzb5lGRxoFSUtWam5URoV7K9V5QnFTVpVWV4ZkYZN7ZrpWZxFDdaN5S4hWNwgjTMRGaWZlW8tUdyIjZXV5SDJXRTFjZitmdotEdhpla5x'
export default {
  methods: {
    initSpread(value) {
      // value.setConfig({
      //   ribbon: {
      //     visible: false  // 隐藏整个功能区
      //   }
      // })
      let spread = value.getWorkbook();

      let sheet = spread.getActiveSheet();

      let colInfos = [
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
      ];
      sheet.autoGenerateColumns = false;
      sheet.setDataSource(dataService.getDataByNumber(100));
      sheet.bindColumns(colInfos);
    },
  },
};
</script>
<style scoped>
.componentContainer {
  position: absolute;
  padding: 10px;
  left: 242px;
  top: 0;
  bottom: 20px;
  right: 0;
}
.spreadContainer {
  padding: 10px;
  box-shadow: 0 0 20px grey;
}
.spreadContainer {
  position: absolute;
  left: 0px;
  right: 30px;
  bottom: 10px;
  height: 100%;
}
.spreadHost {
  width: 100%;
  height: 100%;
}
</style>

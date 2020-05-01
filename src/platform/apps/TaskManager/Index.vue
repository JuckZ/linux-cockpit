<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="record => { return record.INDEX;}"
      :dataSource="tableData"
      :customRow="customClick"
    />
    <a-menu :style="menuStyle" v-if="menuVisible">
      <a-menu-item>{{menuData.THEME}}</a-menu-item>
      <a-menu-item>{{menuData.CN_NAME}}</a-menu-item>
      <a-menu-item>{{menuData.EN_NAME}}</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'INDEX'
  },
  {
    title: '主题大类',
    dataIndex: 'THEME'
  },
  {
    title: '中文名称',
    dataIndex: 'CN_NAME'
  },
  {
    title: '英文名称',
    dataIndex: 'EN_NAME'
  }
];
export default {
  data() {
    return {
      columns,
      tableData: [
        { INDEX: 0, THEME: '基础数据', CN_NAME: '地区', EN_NAME: 'Area' },
        { INDEX: 1, THEME: '个人信息', CN_NAME: '姓名', EN_NAME: 'Name' }
      ],
      menuData: {},
      menuVisible: false,
      menuStyle: {
        position: 'absolute',
        top: '0',
        left: '0',
        border: '1px solid #eee'
      },
      customClick: record => ({
        on: {
          contextmenu: e => {
            console.log(record);
            
            e.preventDefault();
            this.menuData = record;
            this.menuVisible = true;
            this.menuStyle.top = e.clientY + 'px';
            this.menuStyle.left = e.clientX + 'px';
            document.body.addEventListener('click', this.bodyClick);
          }
        }
      })
    };
  },
  methods: {
    bodyClick() {
      this.menuVisible = false;
      document.body.removeEventListener('click', this.bodyClick);
    }
  }
};
</script>
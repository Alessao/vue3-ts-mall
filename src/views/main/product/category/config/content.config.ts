export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handle'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  title: '商品类别'
}

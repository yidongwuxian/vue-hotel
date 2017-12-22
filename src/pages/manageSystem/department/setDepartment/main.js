

export default {
	data() {
		return {
			addStatus: false, //是否处于添加状态
			editStatus:false,//是否处于修改状态
			showDelete:false,//删除的model框显示状态
			cacheDelData:{},//缓存要被删除的部门信息
			baseData: [{
				title: 'DPS产品研发部',
				expand: true,
				render: (h, { root, node, data }) => {
					return h('span', {
						style: {
							display: 'inline-block',
							width: '100%',
						}
					}, [
						h('span', [
							h('span', {
								'class': {
									iconfont: true,
								},
								style: {
									margin: '0 8px',
									fontSize: '16px'
								},
								domProps: {
									innerHTML: '&#xe69b;'
								}

							}),
							h('span', {
								style: {
									fontSize:'14px',
									fontWeight:'600'
								},
								domProps: {
									innerHTML: data.title
								}
							})
						]),
						h('span', {
							style: {
								display: 'inline-block',
								float: 'right',
								marginRight: '32px'
							}
						}, [
							h('span', {
								'class': {
									iconfont: true,
								},
								style: {									
									fontSize: '16px'
								},
								domProps: {
									//innerHTML: '&#xe62f;'
								},
								on: {
									//click: () => { this.append(data) }
								}
							})
						])
					]);
				},
				children: [{
						title: '产品设计',
						expand: true,
						children: [{
								title: '王泽旭',
								expand: true
							},
							{
								title: '高颖',
								expand: true
							}
						]
					},
					{
						title: '技术中心',
						expand: true,
						children: [{
								title: '李正勇',
								expand: true
							},
							{
								title: '李正勇',
								expand: true
							}
						]
					}
				]
			}],
			
		}
	},
	computed: {

	},
	watch: {

	},
	methods: {
		//提交新增的部门信息
		submit() {
			
		},
		//返回至部门列表
		back(){
			this.addStatus = false;
			this.editStatus = false;
		},
		//修改
		edit(data) {
			console.log(data)
			this.addStatus = true;
			this.editStatus = true;
			//修改
		},
		//删除
		del(){
			let {root, node, data} = this.cacheDelData;
			const parentKey = root.find(el => el === node).parent;
			const parent = root.find(el => el.nodeKey === parentKey).node;
			const index = parent.children.indexOf(data);
			parent.children.splice(index, 1);
		},
		//删除提示
		remove(root, node, data) {
			this.showDelete = true;
			this.cacheDelData = {
				root,
				node,
				data
			}			
		},
		renderContent(h, { root, node, data }) {
			let handle = "";
			if(data.children){
				handle = h('span', {           //包含删除按钮和编辑按钮					
					style: {
						display: 'inline-block',						
						marginLeft: '32px',
					}
				}, [
					h('span', {                //编辑按钮
						'class': {
							iconfont: true,
						},
						style: {									
							fontSize: '16px',
							cursor:"pointer"
						},
						domProps: {
							innerHTML: '&#xe62f;'
						},
						on: {
							click: () => { this.edit(data) }
						}
					}),
					h('span', {               //删除按钮
						'class': {
							iconfont: true,
						},
						style: {									
							fontSize: '16px',
							cursor:"pointer",
							marginLeft:'15px'
						},
						domProps: {
							innerHTML: '&#xe601;'
						},
						on: {
							click: () => { this.remove(root, node, data) }
						}
					})
				])
			}
			return h('span', {
				style: {
					display: 'inline-block',
					
				}
			}, [
				h('span', [
					h('span', {
						'class': {
							iconfont: true,
						},
						style: {
							margin: '0 8px',
							fontSize: '16px',
						},
						domProps: {
							innerHTML: '&#xe69b;'
						}
					}),
					h('span', {						
						domProps: {
							innerHTML: data.title+ (data.children? " ( "+data.children.length+" 人 )":"")
						}
					})
				]),
				//二级dom机构有编辑和删除操作
				handle
			]);
		},
	},
	components: {

	},
	created() {

	}
}

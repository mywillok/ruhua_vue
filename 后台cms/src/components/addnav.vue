<template>
	<div class="add-cate">
		<el-button type="primary" @click="addbox = true">添加导航</el-button>
		<div style="height:10px;"></div>
		<el-dialog title="" :visible.sync="addbox" width="35%" center>
			<el-form :model="addform">
				<el-form-item label="导航名称" :label-width="formLabelWidth" style='width: 80%'>
					<el-input v-model="addform.nav_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="跳转到" :label-width="formLabelWidth">
					<el-select v-model="addform.url_name" placeholder="请选择跳转地址" @change="get_jump_url">
						<!-- <el-option label="顶级分类" value="0"></el-option> -->
						<el-option v-for="item in list" :value="item" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="导航图标" :label-width="formLabelWidth">
					<template v-if="img_list.length > 0">
						<div style="display: flex; width:530px ; flex-wrap: wrap;">
							<template v-for="(item,index) of img_list">
								<i class="el-icon-circle-close" @click="delimg(index)"></i>
								<div class="picA" v-if="img_list.length > 0">
									<img class="img" :src="getimg + item.url">
								</div>
							</template>
						</div>
					</template>
					<div class="picA" style="margin-left: 19px;" @click="choose_pic" v-if="img_list.length < 1">
						<i class="el-icon-plus" style="margin-top: 45%; height: 28px; width: 28px;"></i>
					</div>
				</el-form-item>
				<!-- <el-upload class="upload-demo" :action="upfile_url" :data="upfile_data" :on-success="up_ok" :limit=1 :file-list="upfile_list"
				 :headers="upfile_head">
					
				</el-upload> -->
			</el-form>
			<div slot="footer" class="dialog-footer" style='text-align: center'>
				<el-button @click="addbox = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- <Pic :drawer="drawer" @drawer="is_show" @get_img="get_img" :length="length"></Pic> -->
		<Pic :drawer="drawer"  :father_fun="get_img" :length="length"></Pic>
	</div>
</template>

<script>
	import {
		Api_url
	} from '@/common/config.js'
	import Pic from '../views/PicList.vue'
	export default {
		name: 'Category',
		props: [],
		data() {
			return {
				list:[{
						id: 1,
						name: '签到',
						url: '/pages/qiandao/qiandao'
					},
					{
						id: 2,
						name: '积分',
						url: '/pages/point/point'
					},
					{
						id: 3,
						name: '秒杀',
						url: '/pages/miaosha/miaosha'
					},
					{
						id: 4,
						name: '限时折扣',
						url: '/pages/discount/discount'
					},
					{
						id: 5,
						name: '新人团购',
						url: '/pages/one/one'
					},
					{
						id: 6,
						name: '直播',
						url: '/pages/zhibo/zhibo'
					},
					{
						id: 7,
						name: '活动',
						url: '/pages/notice/notice'
					},
					{
						id: 8,
						name: '优惠券',
						url: '/pages/coupon/coupon'
					},
					{
						id: 9,
						name: '分销商品',
						url: '/pages/extend-view/productList/productList?type=fx'
					},
					{
						id: 10,
						name: '视频购',
						url: '/pages/zhibo/zhibo' 
					},
				],
				length:1,
				drawer: false,
				getimg: this.$getimg,
				img_list: [],
				addbox: false,
				addform: {
					nav_name: '',
					img_id: '',
					url_name:'',
					url:'',
					
				},
				formLabelWidth: '120px',
				upfile_url: Api_url + '/admin/upload/img',
				upfile_data: {
					use: 'category'
				},
				upfile_head: {
					token: localStorage.getItem("token")
				},
				upfile_list: [], //上传文件列表
			};
		},
		components: {
			Pic
		},
		methods: {
			
			get_jump_url(e){
				console.log(e)
				this.addform.url = e.url
				this.addform.url_name = e.name
			},
			
			
			//新增分类
			onSubmit() {
				var that = this;
				this.http.post_show('nav/admin/add_nav',that.addform).then((res) => {
					that.$message({
						showClose: true,
						message: '新增成功',
						type: 'success'
					});
					that.addbox = false;
					for (var x in that.addform) {
						that.addform[x] = ""
					};
					that.upfile_list = [];
					that.$emit("up_parent");
					that.img_list = []
				});
			},
			get_img(e) {
				this.drawer = false
				for (let k in e) {
					const v=e[k]
					this.img_list.push(v)
					this.addform.img_id = v.url
				}
				this.length=6-this.img_list.length
				console.log('get_img_end:',e,this.img_list)
			},
			//打开图库
			choose_pic() {				
				this.length=6-this.img_list.length
				this.drawer = true
			}, 

			// to_choose_img() {
			// 	this.drawer = !this.drawer
			// },
			is_show() {
				this.drawer = !this.drawer
			},
			// get_img(e) {
			// 	this.img_list = e
			// 	for (let v in e) {
			// 		this.addform.img_id = e[v].url
			// 	}
			// },
			delimg(index) {
				this.img_list.splice(index, 1)
			},
			up_ok(res) {
				if (res.code == 201) {
					this.addform.img_id = res.id;
				}
			},
		},
	}
</script>

<style lang="less" scoped="">
	.add-cate {
		.category {
			line-height: 30px;
			text-align: left;
		}

		.btn {
			margin-bottom: 6px;
		}

		.picA {
			width: 148px;
			height: 148px;
			background-color: #FBFDFF;
			border: 1px dashed #C0CCDA;
			border-radius: 6px;
			box-sizing: border-box;
			vertical-align: top;
			text-align: center;
			margin: 6px;


			img {
				width: 144px;
				height: 144px;
				border: 1px solid #BFBFBF;
				border-radius: 3px;
			}
		}
	}
</style>

<template>
	<div class="seller" ref="seller">
		<div class="seller-con">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<Star :size="36" :score="seller.score"></Star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="love" @click="collection">
					<span class="icon-favorite" :class="{active:hasCollect}"></span>
					<span class="collect">{{lovetext}}</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h1 class="nav-tit">起送价</h1>
						<div class="con">
							<span class="stress">{{seller.minPrice}}</span><span>元</span>
						</div>
					</li>
					<li class="block">
						<h1 class="nav-tit">商家配送</h1>
						<div class="con">
							<span class="stress">{{seller.deliveryPrice}}</span><span>元</span>
						</div>
					</li>
					<li class="block">
						<h1 class="nav-tit">平均配送时间</h1>
						<div class="con">
							<span class="stress">{{seller.deliveryTime}}</span><span>分钟</span>
						</div>
					</li>
				</ul>
			</div>
			<Split></Split>
			<div class="bulletin">
				<h1 class="bulletin-title">公告与活动</h1>
				<p class="bulletin-text">{{seller.bulletin}}</p>
			</div>
			<ul class="supports" v-if="seller.supports">
				<li class="support-item" v-for="item in seller.supports">
					<span class="support-icon" :class="classMap"></span>
					<span class="support-text">{{item.description}}</span>
				</li>
			</ul>
			<Split></Split>
			<div class="pics">
				<h1 class="pic-name">商家实景</h1>
				<div class="pic-wrapper">
					<ul class="pic-list">
						<li v-for="pic in seller.pics" class="pic-item">
							<img :src="pic" height="90px" width="120px" />
						</li>
					</ul>
				</div>
			</div>
			<Split></Split>
			<div class="message">
				<h1 class="message-title">商家信息</h1>
				<ul>
					<li v-for="info in seller.infos" class="info-item">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import BScroll from 'better-scroll'
import Split from '../Split'
import Star from '../star/Star'

export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			hasCollect:false
		}
	},
	created(){
		this.classMap=['decrease','discount','guarantee','invoice','special'];
	},
	mounted(){
		this.scroll=new BScroll(this.$refs.seller,{click:true});
	},
	computed:{
		lovetext(){
			return this.hasCollect?'已收藏':'未收藏';
		}
	},
	methods:{
		collection(){
			this.hasCollect=!this.hasCollect;
		}
	},
	components:{
		Split,
		Star
	}
}
</script>

<style scoped>
.seller{
	position: absolute;
	top: 175px;
	bottom: 0px;
	left: 0px;
	width: 100%;
	overflow: hidden;
}
.seller .overview{
	padding: 18px;
	position: relative;
}
.overview .love{
	position: absolute;
	top: 15px;
	right: 0;
	width: 95px;
	text-align: center;
}
.icon-favorite{
	display: block;
	font-size: 24px;
	color: rgb(77,85,93);
	line-height: 24px;
	margin-bottom: 4px;
}
.icon-favorite.active{
	color: rgb(240,20,20);
}
.collect{
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 10px; 
}
.seller .title{
	margin-bottom: 8px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
}
.seller .desc{
	padding-bottom: 18px;
	font-size: 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller .desc .star{
	display: inline-block;
	margin-right: 8px;
	vertical-align: top;
}
.seller .desc .text{
	margin-right: 12px;
	font-size: 10px;
	color: rgb(77,85,93);
	vertical-align: top;	
	line-height: 18px;
}
.seller .remark{
	display: flex;
	padding: 18px 0;
}
.seller .remark .block{
	flex: 1;
	text-align: center;
	border-right: 1px solid rgba(7,17,27,0.1);
}
.seller .remark .block:last-child{
	border: none;
}
.seller .remark .nav-tit{
	font-size: 10px;
	color: rgb(147,153,159);
	line-height: 10px;
	margin-bottom: 4px;
}
.seller .remark .block .con{
	font-size: 10px;
	font-weight: 200;
	color: rgb(7,17,27);
	line-height: 24px;
}
.seller .remark .block .stress{
	font-size: 24px;
}
.bulletin{
	padding: 0 18px;
	margin-bottom: 16px;
}
.bulletin-title{
	margin-top: 18px;
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;	
}
.bulletin-text{
	padding: 8px 12px 0 12px;
	font-size: 12px;
	font-weight: 200;
	color: rgb(240,20,20);
	line-height: 24px;
}
.supports{
	padding: 0 18px;
	font-size: 0;
}
.support-item{
	border-top: 1px solid rgba(7,17,27,0.1);
	padding: 16px 12px;
	font-size: 12px;
	height: 16px;
	line-height: 16px;
	font-weight: 200;
	color: rgb(7,17,27);
}
.supports .support-icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	line-height: 16px;
	margin-right: 6px;
	background-size: 16px 16px !important;
}
.decrease{background: url(decrease_4@2x.png);}
.discount{background: url(discount_4@2x.png);}
.guarantee{background: url(guarantee_4@2x.png);}
.invoice{background: url(invoice_4@2x.png);}
.special{background: url(special_4@2x.png);}
.pics{
	padding: 18px 0 18px 18px;
}
.pics .pic-name{
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;	
}
.pic-wrapper{
	margin-top: 12px;
	height: 90px;
	overflow: hidden;
}
.pic-item{
	float: left;
	margin-right: 6px;
}
.message{
	padding: 18px 18px 0;
}
.message-title{
	line-height: 14px;
	color: rgb(7,17,27);
	font-size: 14px;
	margin-bottom: 12px;	
}
.message .info-item{
	font-size: 12px;
	font-weight: 200;
	padding:  16px 12px;
	line-height: 16px;
	border-top: 1px solid rgba(7,17,27,0.1);
}
</style>
<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-con">
  		<div class="overview">
  			<div class="overview-left">
  				<h1 class="score">{{seller.score}}</h1>
  				<div class="score-title">综合评分</div>
  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
  			</div>
  			<div class="overview-right">
  				<div class="score-wrapper">
  					<span class="score-name">服务态度</span>
  					<Star :size="36" :score="seller.serviceScore"></Star>
  					<span class="scoreper">{{seller.serviceScore}}</span>
  				</div>
  				<div class="score-wrapper">
  					<span class="score-name">商品评分</span>
  					<Star :size="36" :score="seller.foodScore"></Star>
  					<span class="scoreper">{{seller.foodScore}}</span>
  				</div>
  				<div class="delivery-wrapper">
  					<span class="score-name">送达时间</span>
  					<span class="delivery-time">{{seller.deliveryTime}}分钟</span>
  				</div>
  			</div>
  		</div>
  		<Split></Split>
  		<div class="ratingselect-wrapper">
  			<RatingSelect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" v-on:contenttoggle="togglecontent" v-on:ratingtype="ratingtype"></RatingSelect>
  		</div>
  		<div class="ratings-wrapper">
  			<ul>
  				<li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings">
  					<img class="avatar" width="28px" height="28px" :src="rating.avatar">
  					<div class="rating-con">
  						<span class="name">{{rating.username}}</span>
					    <div class="time">{{rating.rateTime | formateDate}}</div>
					    <div class="rate-star">
					    	<div class="star"><Star :size='36' :score="rating.score"></Star></div>
					        <span class="deli-time">{{rating.deliveryTime}}分钟送达</span>
					    </div>
					    <p class="rating-text">{{rating.text}}</p>
					    <div class="recommend" v-show="rating.recommend.length">
					    	<span class="icon-thumb" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
					    	<span class="recommend-item" v-for="recommend in rating.recommend">{{recommend}}</span>
					    </div>
  					</div>
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
import Star from '../star/Star'
import Split from '../Split'
import RatingSelect from '../ratingselect/RatingSelect'

const ALL=2;
const ERR_OK=0;

export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			ratings:[],
			selectType:ALL,
			onlyContent:false,
		};
	},
	mounted(){
		this.scroll=new BScroll(this.$refs.ratings,{click:true});
	},
	created(){
		this.$http.get('/api/ratings').then((response)=>{
			response=response.body;
			if(response.errno===ERR_OK){
				this.ratings=response.data;
			}
		});
	},
	methods:{
		needShow(type,text){
			if(this.onlyContent&&!text){
				return false;
			}
			if(this.selectType===ALL){
				return true;
			}else{
				return type===this.selectType;
			}
		},
		togglecontent(onlyContent){
			this.onlyContent=onlyContent;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		},
		ratingtype(type){
			this.selectType=type;
			this.$nextTick(()=>{
				this.scroll.refresh();
			});
		},
	},
	filters:{
		formateDate(time){
			let date=new Date(time);
			return date.toLocaleString();
		}
	},
	components:{
		Split,
		Star,
		RatingSelect
	}
}
</script>

<style  scoped>
.ratings{
	position: fixed;
	top: 174px;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview{
	display: flex;
	padding: 18px 0;
}
.overview .overview-left{
	flex: 0 0 137px;
	width: 137px;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	padding: 6px 0;
}
.overview .overview-left @media only screen and(max-width: 320px) {
	flex: 0 0 120px;
	width: 120px;
}
.overview .overview-left .score{
	font-size: 24px;
	color: rgb(255,153,0);
	line-height: 28px;
}
.overview .overview-left .score-title{
	margin: 6px 0 8px;
	font-size: 12px;
	color: rgb(7,17,27);
	line-height: 12px;
}
.overview .overview-left .rank{
	font-size: 10px;
	line-height: 10px;
	color: rgb(147,153,159);
}
.overview .overview-right{
	flex: 1; 
	padding: 6px 0 6px 24px;
}
.overview .overview-righ @media only screen and(max-width: 320px) {
	padding-left:6px;
}
.score-wrapper{
	margin-bottom: 8px;
	font-size: 0px;
}
.score-name{
	line-height: 18px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.score-wrapper .star{
	display: inline-block;
	margin: 0 12px;
	vertical-align: top;
}
.scoreper{
	line-height: 18px;
	display: inline-block;
	font-size: 12px;
	color: rgb(255,153,0);
	vertical-align: top;
}
.delivery-time{
	font-size: 12px;
	color: rgb(147,153,159);
	margin-left: 12px;
}
.ratingselect-wrapper{
	padding: 0 18px;
}
.rating-item{
	margin: 0 18px;
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	display: flex;
}
.rating-item:last-child{
	border-bottom: 0;
}
.avatar{
	width: 28px;
	flex: 0 0 28px;
	border-radius: 50%;
}
.rating-con{
	flex: 1;
	margin-left: 12px;
	position: relative;
}
.name{
	font-size: 10px;
	line-height: 12px;
	color: rgb(7,17,27);
}
.time{
	position: absolute;
	top: 0;
	right: 0;
	font-size: 10px;
	font-weight: 200;
	line-height: 12px;
	color: rgb(147,153,159);
}
.rate-star{
	padding: 4px 0 6px;
	font-size: 0;
}
.star{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
}
.deli-time{
	font-size: 10px;
	font-weight: 200;
	line-height: 12px;
	color: rgb(147,153,159);
	vertical-align: top;
}
.rating-text{
	font-size: 12px;
	color: rgb(7,17,27);
	line-height: 18px;
	margin-bottom: 8px;
}
.recommend{
	display: inline-block;
	line-height: 16px;
}
.icon-thumb{
	font-size: 12px;
	line-height: 16px;
	/*vertical-align: top;*/
}
.icon-thumb_up{
	color: rgb(0,160,200);
}
.icon-thumb_down{
	color: rgb(183,187,191);
}
.recommend-item{
	display: inline-block;
	font-size: 9px;
	margin-left: 8px;
	margin-bottom: 4px;
	padding: 0 6px;
	border: 1px solid rgba(7,17,27,0.1);
	color: rgb(147,153,159);
	background: rgb(255,255,255);
	border-radius: 5px;
}
</style>

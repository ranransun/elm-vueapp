<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="square positive" :class="{active:mySelectType===2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="square positive" :class="{active:mySelectType===0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="square negative" :class="{active:mySelectType===1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="swith" :class="{on:myOlnyContent}"  @click="onlyCon">
			<span class="icon-check_circle"></span>
			<span class="onlyContent">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>

const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;

	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:'满意',
						negative:'不满意'
					};
				}
			}
		},
		data(){
				return{
					myOlnyContent:this.onlyContent,
					mySelectType:this.selectType
			};	
		},
		methods:{
			select(type){
				this.mySelectType=type;
				this.$emit('ratingtype',type);
			},
			onlyCon(){
				this.myOlnyContent=!this.myOlnyContent;
				this.$emit('contenttoggle',this.myOlnyContent);
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===POSITIVE;
				});
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType===NEGATIVE;
				});
			}
		}
	}
</script>

<style scoped>
.ratingselect{
	padding: 12px 0;
}
.rating-type{
	margin-top: 12px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size: 0px;
}
.square{
	display: inline-block;
	padding: 8px 12px;
	margin-right: 8px;
	border-radius: 2px;
	font-size: 12px;
	line-height: 16px;
	color: rgb(77,85,93);
}
.square.active{
	color: #fff;
}
.count{
	font-size: 8px;
	margin-left: 2px;
}
.positive{
	background: rgba(0,160,220,0.2);
}
.positive.active{
	background: rgb(0,160,220);
}
.negative{
	background: rgba(77,85,93,0.2);
}
.negative.active{
	background: rgb(77,85,93);
}
.swith{
	padding: 12px 0;
	font-size: 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.icon-check_circle{
	display: inline-block;
	font-size: 24px;
	line-height: 24px;
	color: rgb(147,153,159);
	vertical-align: top;
}
.on .icon-check_circle{
	color: #00c850;
}
.onlyContent{
	display: inline-block;
	margin-left: 4px;
	font-size: 12px;
	line-height: 24px;
	color: rgb(147,153,159);
	vertical-align: top;
}
</style>
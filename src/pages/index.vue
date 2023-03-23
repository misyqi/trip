<template>
    <div>
       <el-row :gutter = "20">
            <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                     <div class="flex justify-between">
                        <span class="text-sm">{{ item.title }}</span>
                        <el-tag :type="item.unitColor" effect="plain">
                        {{ item.unit }}
                      </el-tag> 
                     </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        {{ item.value }}
                        <count-to :value="item.value"></count-to>
                    </span>
                    <el-divider/>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span> {{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                 </el-card>
            </el-col>   
       </el-row>
       <IndexNavs ></IndexNavs>
       <el-row :gutter="20" class="mt-5">
           <el-col :span="12" :offset="0">
            <IndexChart/>
           </el-col>   
           <el-col :span="12" :offset="0">
            <IndexCard class="mb-3" title="商品及商品提示" tip="店铺及商品提示" :btns="goods"></IndexCard>
            <IndexCard  title="交易提示" tip="需要立即处理交易的订单" :btns="order"></IndexCard>
           </el-col>   
    </el-row>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getStatistics1,getStatistics2 } from '../api';
import CountTo from '../components/CountTo.vue'
import IndexNavs from '../components/IndexNavs.vue'
import IndexChart from '../components/IndexChart.vue';
import IndexCard from '../components/IndexCard.vue';


const panels = ref([])
getStatistics1().then(res =>{
    panels.value = res.panels
})

const goods = ref([])
const order = ref([])
getStatistics2().then(res =>{
    goods.value = res.goods
    order.value =res.order
})
</script>

<style>

</style>
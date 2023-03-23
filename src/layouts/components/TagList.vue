<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs 
        v-model="activeTab" 
        type="card"
         class="flex-1" 
          @tab-remove="removeTab"
          @tab-change="changeTab">
            <el-tab-pane 
             :closable="item.path !='/'" 
             v-for="item in tabList"
             :key="item.path" 
             :label="item.title"
              :name="item.path">
            </el-tab-pane>
        </el-tabs>
    
        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height: ;44px"></div>
</template>

<script setup>
// import {useTabList} from '../../utils/useTabList'
// const{
//     activeTab,
//     addTab,
//     changeTab,
//     removeTab,
//     handleClose
// } = useTabList()
import { ref } from 'vue'
import { useRoute,useRouter,onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'    



const route =  useRoute()
const router = useRouter()
const cookie = useCookies()
const activeTab = ref(route.path)
const tabList = ref([
    {
        title: '后台首页',
        path:"/",
    },
])

// 添加标签导航
function addTab(tab){
   let noTab =  tabList.value.findIndex(t=>t.path ==tab.path) == -1
   if(noTab){
    tabList.value.push(tab)
   }
   cookie.set("tabList",tabList.value)
   initTabList()
}
// 初始化标签
function initTabList(){
    let tbs =cookie.get("tabList")
    if(tbs){
        tabList.value  = tbs
    }
}

const changeTab = (t) =>{
   activeTab.value = t
   router.push(t)
}

onBeforeRouteUpdate((to,from) =>{
    activeTab.value = to.path
    addTab({
    title:to.meta.title,
    path:to.path
    })
})

const removeTab = (t) =>{
    let a = activeTab.value
    let tabs = tabList.value
    if(a==t){
        tabs.forEach((tab,index) =>{
            if(tab.path == t){
                const nextTab = tabs[index+1] || tabs[index-1]
                if(nextTab){
                    a=nextTab.path
                }
            }
        })
    }
    activeTab.value = a
    tabList.value = tabList.value.filter(tab =>tab.path !=t)

    cookie.set("tabList",tabList.value)
}

const handleClose =(c) =>{
    if(c="clearAll"){
        // 切换回首页
        activeTab.value = "/"
        tabList.value = [{
            title:'后台首页',
            path:'/'
        }]
    }
    else if(c == "clearOther"){
        tabList .value = tabList.value.filter(tab =>tab.path =="/" || tab.path ==activeTab.value)
    }
    cookie.set("tabList",tabList.value)
}
//   return {
//     activeTab,
//     addTab,
//     changeTab,
//     removeTab,
//     handleClose
//   }
// }

</script>

<style>
.f-tab-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;

}
.tag-btn{
    @apply fixed bg-white rounded ml-auto flex items-center justify-center;
    top: 85px;  
    right: 20px;
}
:deep(.el-tabs_nav){
    border:0!important;
}
:deep(.el-tabs_item){
    border:0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
</style>
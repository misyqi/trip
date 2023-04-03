<template>
    <el-card shawow="never" class="border-0 h-200">
        <ListHeader @refresh="getData" @create="handleCreate"/>
        <el-tree :data="tableData"
         :props="{label:'name',children:'child'}"
          v-loading="loading"
          
           >
            <template #default ="{node,data}">
            <div class=" custom-tree-node">
                <span >{{ data.name }}</span>
                <div class="ml-auto ">
                    <el-button text 
                    type="primary"
                     size="small" 
                     @click="openGoodsDrawer(data)"
                     :loading="data.goodsDrawerLoading"
                    >推荐商品</el-button>
                    <el-switch
                     :modelValue="data.status" 
                     :active-value="1" 
                     :inactive-value="0"
                      @change="handleStatusChange($event,data)"></el-switch>
                    <el-button text 
                    type="primary"
                     size="small"
                      @click.stop="handleEdit(data)"
                      >修改</el-button>
                    
                     <el-popconfirm title="是否删除" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(data.id)">
                    <template #reference>
                          <el-button class="px-1" text type="primary" size="small">删除
                             <el-icon :size="15">
                              <Close />
                             </el-icon>
                             </el-button>
                     </template>
                </el-popconfirm> 
                </div>
            </div>
            
            </template>
          
        </el-tree>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类表单" prop="name">
                <el-input v-model="form.name" placeholder="分类表单"></el-input>
            </el-form-item>
            </el-form>
        </FormDrawer>



        <goods-drawer ref="GoodsDrawerRef" ></goods-drawer>
    </el-card>

</template>

<script setup>
import ListHeader from '../../components/ListHeader.vue'
import { getCategoryList,createCategory,updateCategory,updateCategoryStatus,deleteCategory } from '../../api/Category';
import { useInitTable,useInitForm } from '../../utils/useCommon';
import FormDrawer from '../../components/FormDrawer.vue';
import GoodsDrawer from './components/GoodsDrawer.vue';
import { ref } from 'vue';






const {
    loading,
    tableData,
    getData,
    handleDelete,
    handleStatusChange
}=useInitTable({
    getList:getCategoryList,
    delete:deleteCategory,
    updateStatus:updateCategoryStatus,
    onGetListSuccess:(res) =>{
        tableData.value= res.map(o =>{
            o.goodsDrawerLoading = false
            return o
        })
        
    }
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit
}=useInitForm({
    form:{ 
      name:"",
    },
    rules :{},
    getData,
    update:updateCategory,
    create:createCategory
})

const GoodsDrawerRef = ref(null)
const openGoodsDrawer = (data) =>{
    GoodsDrawerRef.value.open(data)
}

</script>

<style>
.custom-tree-node{
    flex:1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node_content{
    padding:20px 0;
}
</style>
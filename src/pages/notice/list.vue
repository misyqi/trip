<template>
    <el-card shadow="never">
        <ListHeader @create="handleCreate" @refresh="getData"/>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" width="180" />
            <el-table-column prop="create_time" label="创建时间" width="180" />
             <el-table-column label="操作" align="center" >
                <template  #default="scope">
                <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                <el-popconfirm title="是否删除" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                    <template #reference>
                          <el-button class="px-1" text type="primary" size="small">
                             <el-icon :size="15">
                              <Close />
                             </el-icon>
                             </el-button>
                     </template>
                </el-popconfirm>  
                </template>

             </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background 
            layout="prev,pager,next"
             :total="total" 
             :current-page="currentPage"
             :page-size="limit"
             @current-change="getData"/>
        </div>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="form.title" placeholder="公告标题"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content" >
                <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
            </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { getNoticeList,createNotice,updateNotice,deleteNotice } from "../../api/notice";
import FormDrawer  from "../../components/FormDrawer.vue";
import  { toast }  from "../../utils/utils";
import { useInitTable,useInitForm } from "../../utils/useCommon";
import ListHeader from '../../components/ListHeader.vue'

const {
      
        currentPage,
        loading,
        tableData,
        total,
        limit,
        getData,
        handleDelete
}=useInitTable({
    searchForm:{
        keyword:""
    },
    getList:getNoticeList,
    delete:deleteNotice
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
        title:''
    },
    rules :{
    title:[{
        required:true,
        message:'公告标题不能为空',
        trigger:'blur'
    }],
    content:[{
        required:true,
        message:'公告内容不能为空',
        trigger:'blur'
    }]
},
    getData,
    update:updateNotice,
    create:createNotice
})




</script>
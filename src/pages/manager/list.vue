<template>
    <el-card shadow="never">
        <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="关键词">
                     <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
                     </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8">
                    <el-form-item >
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button @click="resetSearchForm">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <ListHeader @create="handleCreate" @refresh="getData"/>
      

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column  label="管理员" width="200">
                <template #default="{row}">
                    <div class="flex items-center">
                        <el-avatar :size="60" :src="row.avatar" >
                        <img src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="">
                        </el-avatar>
                        <div class="ml-3">
                            <h6>{{ row.username}}</h6>
                            <small>ID:{{ row.id }}</small>
                        </div>
                     </div>
                </template>
            </el-table-column>
            <el-table-column label="所属管理员" align="center">
                <template #default = {row}>
                 {{ row.role?.name || "-" }}
                 </template>
             </el-table-column>
             <el-table-column label="状态" align="center">
                <template #default = {row}>
                 <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                :disabled="row.super ==1"  @change="handleStatusChange($event,row)">
                </el-switch>
                 </template>
             </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="380" />
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
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="用户名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input v-model="form.password"  :rows="5" placeholder="密码" ></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar" >
                <ChooseImage v-model="form.avatar"/>
            </el-form-item>
            <el-form-item label="所属角色" prop="role_id" >
                <el-select v-model="form.role_id" placeholder="选择所属角色">
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status" >
                <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                
                </el-switch>
            </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { ref } from "vue";
import { getManagerList,updateManagerStatus,createManager,updateManager,deleteManager } from "../../api/manager";
import FormDrawer  from "../../components/FormDrawer.vue";

import ChooseImage from "../../components/ChooseImage.vue";
import { useInitTable,useInitForm } from "../../utils/useCommon";
import ListHeader from '../../components/ListHeader.vue'



const roles = ref([])

const {
        searchForm,
        resetSearchForm,
        currentPage,
        loading,
        tableData,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange
}=useInitTable({
    searchForm:{
        keyword:""
    },
    getList:getManagerList,
    onGetListSuccess:(res) =>{
        //console.log(res);
        tableData.value = res.list.map(o =>{
            o.statusLoading = false
            return o
        })
        total.value = res.totalCont
        roles.value = res.roles
    },
    delete:deleteManager,
    updateStatus:updateManagerStatus

})



// // 分页
// const currentPage = ref(1)
// const total = ref(0)
// const limit = ref(10)

// // 获取数据
// function getData(p = null){
//     if(typeof p =="number"){
//         currentPage.value = p
//     }
//     loading.value=true
//     getManagerList(currentPage.value,searchForm).then(res=>{
//         tableData.value = res.list
//         total.value = res.totalCount
//         roles.value=res.roles
//     })
//     .finally(()=>{
//         loading.value=false
//     }) 
// }
// getData()


// 表单部分
// const formDrawerRef = ref(null)
// const formRef = ref(null)
// const form = reactive({
//     username:"",
//     password:"",
//     role_id:null,
//     status:1,
//     avatar:""
// })

// const editId = ref(0)
// const drawerTitle = computed(() =>editId.value?"修改" :"新增")
// const handleSubmit = () =>{
//     formRef.value.validate((valid) =>{
//         if(!valid) return
//         //formDrawerRef.value.showLoading()

//         const fun = editId.value?updateManager(editId.value,form):createManager(form)
//         fun(form).then(res =>{
//             toast(drawerTitle.value +"成功")
//             // 修改刷新当前页，新增刷新第一页
//             getData(editId.value?false:1)
//             formDrawerRef.value.close()
            
//         }).finally(()=>{
//             //formDrawerRef.value.hideLoading()
//         })
//     })
// }
// // 重置表单
// function resetForm(row = false){
//     // todo
//     if(formRef.value) formRef.value.clearValidiDate()
//     if(!row){
//         for(const key in form){
//             form[key] = row[key]
//         }
//     }
// }
// // 新增
// const handleCreate = () =>{
//     editId.value = 0
//     resetForm({
//         username:"",
//         password:"",
//         role_id:null,
//         status:1,
//         avatar:""
//     })
//     formDrawerRef.value.open()
// }
// // 编辑
// const handleEdit = (row) =>{
//     editId.value = row.id
//     resetForm(row)
//     formDrawerRef.value.open()

// }

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
        username:"",
        password:"",
        role_id:null,
        status:1,
        avatar:""
    },
    getData,
    update:updateManager,
    create:createManager
})

// 删除
// const handleDelete=(id) =>{
//     loading.value = true
//     deleteManager(id).then(res=>{
//         toast("删除成功")
//         getData()
//     }).finally(()=>{
//         loading.value = false
//     })

// }
// // 修改状态
// const handleStatusChange = (status,row) =>{
//     updateManagerStatus(row.id,status).then(res=>{
//         toast("修改成功")
//         row.status=status
//     })

// }

</script>
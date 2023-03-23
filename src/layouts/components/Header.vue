<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled /></el-icon>
            米奇后台
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <fold v-if="$store.state.asideWidth =='250px'" />
            <Expand v-else/>
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="刷新">
            <el-icon class="icon-btn">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="刷新">
                <el-icon class="icon-btn"><full-screen /></el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center justify-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入用户名">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="form.repassword" type="password" show-password placeholder="请输入密码">
                </el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
import FormDrawer from '../../components/FormDrawer.vue';
import {useRepassword,useLogout} from './../../utils/useManager'


// 修改密码
const {
    formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
} = useRepassword()

const {
    handleLogout
}=useLogout()

const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            // showDrawer.value = true
            openRePasswordForm()
            console.log("修改密码");
            break;
    }
}





</script>

<style>
.f-header {
    @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 ;
    height: 64px;
    z-index: 10;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-2xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center text-3xl m-5;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5
}
</style>
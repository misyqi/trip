<template>
    <el-col :span="8">
        <el-form-item label="关键词">
         <slot/>
        </el-form-item>
    </el-col>
</template>

<script setup>
defineProps({
    label:String
})

</script>
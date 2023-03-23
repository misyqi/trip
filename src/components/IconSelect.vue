<template>
    <div class="flex items-center">
        <el-icon v-if="modelValue" :size="20" class="mr-2">
            <component :is="modelValue"/>
        </el-icon>
        <el-select filterable :modelValue="modelValue" class="m-2"
         placeholder="请选择图标"
         @click="handleChange">
                <el-option
                 v-for="item in icons"
                 :key="item"
                 :label="item"
                 :value="item">
                 <div class="flex items-center justify-between">
                    <el-icon>
                        <component :is="item"></component>
                        <span class="text-gray-500">{{ item }}</span>
                    </el-icon>
                 </div>
                </el-option>
            </el-select>
    </div>
</template>

<script setup>
import { ref } from "vue";
import * as iconList from '@element-plus/icons-vue'
const icons = ref([])
defineProps({
    modelValue:String
})
const emit = defineEmits(["update:modelValue"])
const handleChange=(icon) =>{
    emit("update:modelValue",icon)
}


</script>
<template>
      <div class="flex items-center justify-between mb-4">
           <div>
            <el-button type="primary" v-if="btns.includes('create')" size="small" @click="$emit('create')">新增</el-button>
            
            <el-popconfirm v-if="btns.includes('delete')" title="是否要删除？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="$emit('delete')">
              <template #reference>
                <el-button type="danger"  size="small" >批量删除</el-button>
              </template>
            </el-popconfirm>
           </div>
            <el-tooltip
            effect="dark"
            content="刷新"
            placement="top"
            >
        <el-button text @click="$emit('refresh')">
            <el-icon size="20px"><Refresh/></el-icon>
        </el-button>
        </el-tooltip>
        </div>
</template>

<script setup>
import { computed } from "vue"

defineEmits(["create","refresh",'delete'])


const props = defineProps({
    layout:{
        type:String,
        default:"create,refresh"
    }
})

const btns = computed(()=>props.layout.split(","))


</script>
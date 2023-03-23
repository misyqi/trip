import { ref, reactive } from 'vue'
import { logout, updatepassword } from './../api/manager'
import { showModal, toast } from '../utils/utils'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';




export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    const rules = {
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        repassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
    }

    const formRef = ref(null)
    const loading = ref(false)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            loading.value = true
            updatepassword(form).then(res => {
                toast("修改密码成功，请重新登录")
                store.dispatch("logout")
                router.push("/")
            }).finally(() => {

            })
        })
    }

    const openRePasswordForm = () =>formDrawerRef.value.open()
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}
export function useLogout(){
    const router = useRouter()
    const store = useStore()
    const handleLogout = () => {
        showModal("是否要确定退出?").then(res => {
            logout().finally(() => {
    
                store.dispatch("logout")
                // 移除cookie里的token
                // 清楚用户状态
                // 跳转到登录页
                router.push("/login")
                toast("退出登录成功")
            })
        })
    }
    return {handleLogout}
}
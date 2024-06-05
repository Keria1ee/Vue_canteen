import {defineStore} from "pinia";
import {ref} from "vue";
export const useTokenStore = defineStore("canteen-user",()=>{
    const token = ref('')
    const data = ref('{}')
    const setToken = (newToken)=>{
        token.value = newToken;
    }
    const setData = (newData)=>{
        data.value = JSON.stringify(newData);
    }

    const getData = ()=>{
        return JSON.parse(data.value);
    }


    const removeData = ()=>{
        data.value = ''
    }

    const removeToken = ()=>{
        token.value = ''

    }

    const getToken = ()=>{
        return token.value;
    }
    return {
        token,
        data,
        setToken,
        removeToken,
        getToken,
        setData,
        getData,
        removeData,
    }

},
{
    persist:true
}
    );
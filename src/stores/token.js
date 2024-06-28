import {defineStore} from "pinia";
import {ref} from "vue";

export const useTokenStore = defineStore('canteen-user', () => {
    const token = ref('');
    const data = ref('{}');

    const setToken = (newToken) => {
        token.value = newToken;
    };

    const setData = (newData) => {
        // 复制 newData 对象，以避免直接修改传入对象
        let modifiedData = {...newData};
        // 替换密码为空字符串
        if (modifiedData.password) {
            modifiedData.password = '';
        }
        data.value = JSON.stringify(modifiedData);
    };

    const getData = () => {
        return JSON.parse(data.value);
    };

    const removeData = () => {
        data.value = '';
    };

    const removeToken = () => {
        token.value = '';
    };

    const getToken = () => {
        return token.value;
    };

    return {
        token,
        data,
        setToken,
        removeToken,
        getToken,
        setData,
        getData,
        removeData,
    };
}, {
    persist: {
        storage: sessionStorage,
    }
});

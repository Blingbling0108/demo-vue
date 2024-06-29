import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const list = reactive([
    { id: 220812022, userName: '十四行诗', age: 18 },
    { id: 220812008, userName: '维尔汀', age: 18 },
    { id: 220812030, userName: '星锑', age: 18 },
  ]);

  const addUser = (user) => {
    list.value.unshift(user);
    saveList();
  };

  const deleteUser = (index) => {
    list.value.splice(index, 1);
    saveList();
  };

  const updateUser = (index, user) => {
    list.value.splice(index, 1);
    list.value.unshift(user);
    saveList();
  };

  const saveList = () => {
    localStorage.setItem('student_list', JSON.stringify(list.value));
  };

  const loadList = () => {
    const savedList = localStorage.getItem('student_list');
    if (savedList) {
      list.value = JSON.parse(savedList);
    }
  };

  return { list, addUser, deleteUser, updateUser, loadList };
});
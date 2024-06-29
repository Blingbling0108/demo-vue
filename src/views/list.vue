<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 14:34:13
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:01:55
--><template>
  <div class="list-comp">
    <div class="text-2xl font-bold">初音未来</div>
    <div class="tool-bar flex justify-end mb-10">
      <button class="bg-green-400 text-white px-4 py-2 rounded mr-6" @click="showAddModal">新增</button>
    </div>
    <ul>
      <li class="flex justify-between mb-10">
        <span class="w-1/5">序号</span>
        <span class="w-1/5">学号</span>
        <span class="w-1/5">姓名</span>
        <span class="w-1/5">年龄</span>
        <div class="flex-1 flex justify-around">操作</div>
      </li>
      <li v-for="(item, index) in list" :key="item.id" class="flex justify-between items-center h-16 border-b border-gray-400 mx-6">
        <span class="w-1/5">{{ index + 1 }}</span>
        <span class="w-1/5">{{ item.id }}</span>
        <span class="w-1/5">{{ item.userName }}</span>
        <span class="w-1/5">{{ item.age }}</span>
        <div class="flex-1 flex justify-around">
          <button class="bg-blue-300 text-white px-4 py-2 rounded" @click="deleteUser(index)">删除</button>
          <button class="bg-blue-400 text-white px-4 py-2 rounded" @click="showEditModal(index)">编辑</button>
          <button class="bg-blue-400 text-white px-4 py-2 rounded" @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>
    <div class="pop_blank" v-if="showFlag" style="top: 10%; left: 50%; transform: translate(-50%, 0); width: 400px; height: auto; background-color: rgb(232, 252, 249); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
      <div class="modal-header border-b border-gray-300 mb-4">
        <h1 class="text-lg font-bold">{{ isEdit ? '编辑成员' : '新增成员' }}</h1>
      </div>
      <div class="modal-body mb-4">
        <form>
          <div class="inputBox mb-4">
            <input v-model="studyNum" placeholder="学号" class="w-full px-4 py-2 border border-gray-300 rounded" required>
          </div>
          <div class="inputBox mb-4">
            <input v-model="name" placeholder="姓名" class="w-full px-4 py-2 border border-gray-300 rounded" required>
          </div>
          <div class="inputBox mb-4">
            <input v-model="year" placeholder="年龄" class="w-full px-4 py-2 border border-gray-300 rounded" required>
          </div>
        </form>
      </div>
      <div class="footer flex justify-between pt-4 border-t border-gray-300">
        <button class="px-4 py-2 rounded bg-gray-300" @click="showFlag = false">取消</button>
        <button class="px-4 py-2 rounded bg-green-400 text-white" @click="submitFn">{{ isEdit ? '编辑成员' : '新增成员' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user';//函数

let userStore=useUserStore();

const STUDENT_LIST_KEY = 'student_list';


let studyNum = ref('');
let name = ref('');
let year = ref('');
let showFlag = ref(false);
let isEdit = ref(false);
let currentIndex = ref(-1);

let list = reactive([]);
const saveListToLocalStorage = () => {
  localStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(list));
};

const loadListFromLocalStorage = () => {
  const savedList = localStorage.getItem(STUDENT_LIST_KEY);
  if (savedList) {
    list.push(...JSON.parse(savedList));
  } else {
    list.push(...[
      {
        id: 220812022,
        userName: '十四行诗',
        age: 18
      },
      {
        id: 220812008,
        userName: '维尔汀',
        age: 18
      },
      {
        id: 220812030,
        userName: '星锑',
        age: 18
      }
    ]);
  }
};

const showAddModal = () => {
  isEdit.value = false;
  studyNum.value = '';
  name.value = '';
  year.value = '';
  showFlag.value = true;
};

const showEditModal = index => {
  isEdit.value = true;
  currentIndex.value = index;
  const item = list[index];
  studyNum.value = item.id;
  name.value = item.userName;
  year.value = item.age;
  showFlag.value = true;
};
const submitFn = () => {
  // 添加数字到名字后
  const addNum2name = (name) => {
    let total = 0;
    list.forEach(item => {
      const nameWithoutNumber = item.userName.replace(/\d+$/, ''); // 去除名字后面的数字
      if (nameWithoutNumber === name) {
        total++;
      }
    });
    return name + (total > 0 ? `${total}` : ''); // 如果有相同的名字，添加计数
  };

  const studyNumPattern = /^\d{9}$/;

  // 检查学号是否为9位数字
  if (!studyNumPattern.test(studyNum.value)) {
    alert("学号为9位数字");
    return; // 终止函数执行
  }

  // 检查学号是否重复
  const isDuplicate = list.some((item, index) =>
    item.id === studyNum.value && index !== currentIndex.value
  );
  if (isDuplicate) {
    alert("学号重复");
    return; // 终止函数执行
  }

  // 确保所有字段已填写
  if (studyNum.value && name.value && year.value) {
    if (isEdit.value) {
      list.splice(currentIndex.value, 1); // 编辑模式下删除当前条目
    }

    const uniqueName = addNum2name(name.value); // 调用函数获取唯一名字

    list.unshift({
      id: studyNum.value,
      userName: uniqueName,
      age: year.value
    });
    saveListToLocalStorage();
    showFlag.value = false; // 关闭表单
  } else {
    alert('请填写所有字段');
  }
};



const deleteUser = index => {
  list.splice(index, 1);
  saveListToLocalStorage();
};

const getYourName = id => {
  const student = list.find(item => item.id === id);
  alert(student.userName);
};

onMounted(() => {
  loadListFromLocalStorage();
});
</script>

<style scoped>
</style>

<template>
  <div class="container py-5">
    <h1>商品分類總表</h1>
    <h2 class="text-center">========新增========</h2>
    <div class="row">
      <div class="col-12">
        <h3>新增大分類</h3>
        <form class="row" name="addCategory1" v-on:submit.stop.prevent="addCategory">
          <div class="col-4">
            <label for="category1Id">產品大分類</label>
            <div class="form-inline">
              <input
                type="text"
                class="form-control"
                id="category1Id"
                placeholder
                name="category1Name"
                v-model="category1Name"
              />
              <button type="submit" class="btn btn-info">新增</button>
            </div>
          </div>
          <div class="col-4"></div>
          <div class="col-4"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h3>新增中分類</h3>
        <form class="row" name="addCategory2" v-on:submit.stop.prevent="addCategory">
          <div class="col-4">
            <div class="form-group">
              <label for="category1Id">產品大分類</label>
              <select
                id="category1Id"
                class="form-control"
                name="category1Id"
                v-on:change="getCategories($event)"
                v-model="category1Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category1 in category1s"
                  v-bind:key="category1.id"
                  v-bind:value="category1.id"
                >{{category1.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <label for="category2Id">產品中分類</label>
            <div class="form-inline">
              <input
                type="text"
                class="form-control"
                id="category2Id"
                name="category2Name"
                v-model="category2Name"
              />
              <button type="submit" class="btn btn-info">新增</button>
            </div>
          </div>

          <div class="col-4"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h3>新增小分類</h3>
        <form class="row" name="addCategory3" v-on:submit.stop.prevent="addCategory">
          <div class="col-4">
            <div class="form-group">
              <label for="category1Id">產品大分類</label>
              <select
                id="category1Id"
                class="form-control"
                name="category1Id"
                v-on:change="getCategories($event)"
                v-model="category1Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category1 in category1s"
                  v-bind:key="category1.id"
                  v-bind:value="category1.id"
                >{{category1.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="category2Id">產品中分類</label>
              <select
                id="category2Id"
                class="form-control"
                name="category2Id"
                v-on:change="getCategories($event)"
                v-model="category2Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category2 in category2s"
                  v-bind:key="category2.id"
                  v-bind:value="category2.id"
                >{{category2.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <label for="category3Id">產品小分類</label>
            <div class="form-inline">
              <input
                type="text"
                class="form-control"
                id="category3Id"
                name="category3Name"
                v-model="category3Name"
              />
              <button type="submit" class="btn btn-info">新增</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <hr class="simple" color="black" />
    <h2 class="text-center">========編輯/刪除========</h2>
    <div class="row">
      <div class="col-12">
        <h3>編輯/刪除大分類</h3>
        <form class="row" name="updateCategory1" v-on:submit.stop.prevent="updateCategory">
          <div class="col-6">
            <label for="category1Id">產品大分類</label>
            <div class="form-inline">
              <select
                id="category1Id"
                class="form-control"
                name="category1Id"
                v-on:change="getCategories($event)"
                v-model="category1Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category1 in category1s"
                  v-bind:key="category1.id"
                  v-bind:value="category1.id"
                >{{category1.name}}</option>
              </select>
              <input
                type="text"
                class="form-control"
                id="category1Id"
                placeholder="請輸入新名稱"
                name="category1Name"
                v-model="category1Name"
              />
              <button type="submit" class="btn btn-info mr-2">儲存</button>
              <div class="btn btn-info" v-on:click="deleteCategory({whichCategory:'category1'})">刪除</div>
            </div>
          </div>
          <div class="col-3"></div>
          <div class="col-3"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h3>編輯/刪除中分類</h3>
        <form class="row" name="updateCategory2" v-on:submit.stop.prevent="updateCategory">
          <div class="col-3">
            <div class="form-group">
              <label for="category1Id">產品大分類</label>
              <select
                id="category1Id"
                class="form-control"
                name="category1Id"
                v-on:change="getCategories($event)"
                v-model="category1Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category1 in category1s"
                  v-bind:key="category1.id"
                  v-bind:value="category1.id"
                >{{category1.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <label for="category2Id">產品中分類</label>
            <div class="form-inline">
              <select
                id="category2Id"
                class="form-control"
                name="category2Id"
                v-on:change="getCategories($event)"
                v-model="category2Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category2 in category2s"
                  v-bind:key="category2.id"
                  v-bind:value="category2.id"
                >{{category2.name}}</option>
              </select>
              <input
                type="text"
                class="form-control"
                id="category2Id"
                name="category2Name"
                v-model="category2Name"
              />
              <button type="submit" class="btn btn-info mr-2">儲存</button>
              <div class="btn btn-info" v-on:click="deleteCategory({whichCategory:'category2'})">刪除</div>
            </div>
          </div>

          <div class="col-3"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h3>編輯/刪除小分類</h3>
        <form class="row" name="updateCategory3" v-on:submit.stop.prevent="updateCategory">
          <div class="col-3">
            <div class="form-group">
              <label for="category1Id">產品大分類</label>
              <select
                id="category1Id"
                class="form-control"
                name="category1Id"
                v-on:change="getCategories($event)"
                v-model="category1Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category1 in category1s"
                  v-bind:key="category1.id"
                  v-bind:value="category1.id"
                >{{category1.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label for="category2Id">產品中分類</label>
              <select
                id="category2Id"
                class="form-control"
                name="category2Id"
                v-on:change="getCategories($event)"
                v-model="category2Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category2 in category2s"
                  v-bind:key="category2.id"
                  v-bind:value="category2.id"
                >{{category2.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <label for="category3Id">產品小分類</label>
            <div class="form-inline">
              <select
                id="category3Id"
                class="form-control"
                name="category3Id"
                v-on:change="getCategories($event)"
                v-model="category3Id"
              >
                <option value selected disabled>--請選擇--</option>
                <option
                  v-for="category3 in category3s"
                  v-bind:key="category3.id"
                  v-bind:value="category3.id"
                >{{category3.name}}</option>
              </select>
              <input
                type="text"
                class="form-control"
                id="category3Id"
                name="category3Name"
                v-model="category3Name"
              />

              <button type="submit" class="btn btn-info mr-2">儲存</button>
              <div class="btn btn-info" v-on:click="deleteCategory({whichCategory:'category3'})">刪除</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import adminsAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";
export default {
  created() {
    this.getCategories("getCategory1s");
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      category1s: [],
      category2s: [],
      category3s: [],
      category1Name: "",
      category2Name: "",
      category3Name: ""
    };
  },
  methods: {
    async getCategories(event) {
      try {
        // 這一支寫的有點小複雜，主要是因為我想要用同一支去讓created呼叫拿到大分類資訊，並且在大跟中分類被觸發時也可以被呼叫，並進一步分別拿到中跟小分類
        // 首先判斷event是getCategory1s的，那麼這次呼叫我們，就是為了一開始讓大分類拿到資料在created呼叫我們
        if (event === "getCategory1s") {
          const query = {};
          query[event] = "";
          let response = await adminsAPI.getCategories(query);
          const { data, statusText } = response;
          if (statusText !== "OK") {
            throw new Error(statusText);
          }
          this.category1s = data.category1s;
        } else {
          // 否則就是中分類改變時來呼叫我們，而此時帶進來的event才是DOM裡面的東西
          const query = {};
          query[event.target.name] = event.target.value;
          let response = await adminsAPI.getCategories(query);
          const { data, statusText } = response;
          if (statusText !== "OK") {
            throw new Error(statusText);
          }

          // 接著再判斷是大類觸發的，就帶拿到的資料回去中類
          if (event.target.name === "category1Id") {
            // 如果使用者這次不是第一次點大分類，會因為data裡product裡面還存著選擇的中類以及小類的值
            // ，導致中類及小類不會是顯示<請選擇>，所以要把中類原本選的值設成一開始data那邊設的''空字串，才會回到<請選擇>
            this.category2Id = "";
            this.category2s = data.category2s;
          } else if (event.target.name === "category2Id") {
            // 判斷是中類觸發的，就帶拿到的資料回去小類
            this.category3Id = "";
            this.category3s = data.category3s;
          }
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取分類資料"
        });
      }
    },
    async addCategory(event) {
      try {
        // 透過送出的form name來判斷是要新增大類、中類、小類
        const name = event.target.name;
        const form = event.target;
        const formData = new FormData(form);
        const query = {};

        if (name === "addCategory1") {
          query["whichCategory"] = "category1";
          let response = await adminsAPI.addCategory({ formData, query });
          const { data, statusText } = response;
          console.log(data);
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }

          // 把頁面上的欄位裡的值清掉
          this.category1Name = "";
          // 接著把新增的大分類名稱直接加進前端儲存的大分類陣列資料裡，省去一次跟後端馬上要資料的後端負擔
          // 如果不這樣處理的話，使用者沒刷新頁面就沒辦法在下面的新增中分類以及新增小分類裡面的產品大分類看到剛新增的大分類
          this.category1s.push(data.category1);

          Toast.fire({
            icon: "success",
            title: "新增大分類成功"
          });
        } else if (name === "addCategory2") {
          query["whichCategory"] = "category2";
          let response = await adminsAPI.addCategory({ formData, query });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "新增中分類成功"
          });

          // 把頁面上的欄位裡的值清掉
          this.category1Id = "";
          this.category2Name = "";
        } else if (name === "addCategory3") {
          query["whichCategory"] = "category3";
          let response = await adminsAPI.addCategory({ formData, query });
          // const {data, statusText} = response
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "新增小分類成功"
          });
          // 把頁面上的欄位裡的值清掉
          this.category1Id = "";
          this.category2Id = "";
          this.category3Name = "";
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "新增分類失敗"
        });
      }
    },
    async updateCategory(event) {
      try {
        // 透過送出的form name來判斷是要編輯大類、中類、小類
        const name = event.target.name;
        const form = event.target;
        const formData = new FormData(form);
        const query = {};

        if (name === "updateCategory1") {
          query["whichCategory"] = "category1";
          let response = await adminsAPI.updateCategory({ formData, query });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }

          // 接著把編輯的大分類名稱直接加進前端儲存的大分類陣列資料裡，省去一次跟後端馬上要資料的後端負擔
          // 如果不這樣處理的話，使用者沒刷新頁面就沒辦法在下面的新增或編輯中分類以及新增或編輯小分類裡面的產品大分類看到剛編輯的大分類
          this.category1s = this.category1s.map(category1 => {
            if (category1.id === data.category1.id) {
              return {
                ...category1,
                name: data.category1.name
              };
            } else {
              return category1;
            }
          });

          // 把頁面上的欄位裡的值清掉
          this.category1Id = "";
          this.category1Name = "";

          Toast.fire({
            icon: "success",
            title: "編輯大分類成功"
          });
        } else if (name === "updateCategory2") {
          query["whichCategory"] = "category2";
          let response = await adminsAPI.updateCategory({ formData, query });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "編輯中分類成功"
          });

          // 把頁面上的欄位裡的值清掉
          this.category1Id = "";
          this.category2Id = "";
          this.category2Name = "";
          this.category2s = [];
        } else if (name === "updateCategory3") {
          query["whichCategory"] = "category3";
          let response = await adminsAPI.updateCategory({ formData, query });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "編輯小分類成功"
          });
          // 把頁面上的欄位裡的值清掉
          this.category1Id = "";
          this.category2Id = "";
          this.category3Id = "";
          this.category3Name = "";
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "編輯分類失敗"
        });
      }
    },
    async deleteCategory({ whichCategory }) {
      try {
        // 判斷傳回來的值判斷是要刪除大類、中類、小類
        if (whichCategory === "category1") {
          let response = await adminsAPI.deleteCategory({
            whichCategory,
            categoryId: this.category1Id
          });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          // 把頁面上的欄位裡的值清掉
          this.category1s = this.category1s.filter(category1 => {
            return category1.id !== this.category1Id;
          });
          this.category1Id = "";

          Toast.fire({
            icon: "success",
            title: "刪除大分類成功"
          });
        } else if (whichCategory === "category2") {
          let response = await adminsAPI.deleteCategory({
            whichCategory,
            categoryId: this.category2Id
          });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          // 把頁面上的欄位裡的值清掉
          this.category2s = this.category2s.filter(category2 => {
            return category2.id !== this.category2Id;
          });
          this.category2Id = "";
          Toast.fire({
            icon: "success",
            title: "刪除中分類成功"
          });
        } else if (whichCategory === "category3") {
          let response = await adminsAPI.deleteCategory({
            whichCategory,
            categoryId: this.category3Id
          });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          // 把頁面上的欄位裡的值清掉
          // 把頁面上的欄位裡的值清掉
          this.category3s = this.category3s.filter(category3 => {
            return category3.id !== this.category3Id;
          });
          this.category3Id = "";

          Toast.fire({
            icon: "success",
            title: "刪除小分類成功"
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "刪除分類失敗"
        });
      }
    }
  }
};
</script>
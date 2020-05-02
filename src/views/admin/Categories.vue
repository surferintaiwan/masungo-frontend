<template>
  <div class="container py-5">
    <h1>商品分類總表</h1>
    <div class="row">
      <div class="col-12">
        <h2>新增大分類</h2>
        <form class="row" name="addCategory1" v-on:submit.stop.prevent="handleSubmit">
          <div class="col-4">
            <div class="form-group">
              <label for="category1Id">產品大分類</label>
              <input
                type="text"
                class="form-control"
                id="category1Id"
                placeholder
                name="category1Name"
                v-model="category1Name"
              />
            </div>
            <button type="submit" class="btn btn-info">Submit</button>
          </div>
          <div class="col-4"></div>
          <div class="col-4"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h2>新增中分類</h2>
        <form class="row" name="addCategory2" v-on:submit.stop.prevent="handleSubmit">
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
              <input
                type="text"
                class="form-control"
                id="category2Id"
                name="category2Name"
                v-model="category2Name"
              />
            </div>
            <button type="submit" class="btn btn-info">Submit</button>
          </div>

          <div class="col-4"></div>
        </form>
      </div>
      <div class="col-12 mt-4">
        <h2>新增小分類</h2>
        <form class="row" name="addCategory3" v-on:submit.stop.prevent="handleSubmit">
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
            <div class="form-group">
              <label for="category3Id">產品小分類</label>
              <input
                type="text"
                class="form-control"
                id="category3Id"
                name="category3Name"
                v-model="category3Name"
              />
            </div>
            <button type="submit" class="btn btn-info">Submit</button>
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
            // ，導致中類及小類不會是顯示<請選擇>，所以要把中類跟小類原本選的值設成一開始data那邊設的''空字串，才會回到<請選擇>
            this.category2Id = "";
            this.category2s = data.category2s;
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
    async handleSubmit(event) {
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
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          Toast.fire({
            icon: "success",
            title: "新增大分類成功"
          });

          // 把頁面上的欄位裡的值清掉
          this.category1Name = "";
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
    }
  }
};
</script>
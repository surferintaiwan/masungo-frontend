<template>
  <div class="container py-5">
    <h1>品牌管理</h1>
    <form class="form-inline" v-on:submit.stop.prevent="addBrand">
      <div class="form-group">
        <input type="text" class="form-control" name="brandName" />
      </div>
      <button type="submit" class="btn btn-info">新增品牌</button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">品牌編號</th>
          <th scope="col">品牌名稱</th>
          <th scope="col">該品牌所屬商品數量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brand in brands" v-bind:key="brand.id">
          <td>{{brand.id}}</td>
          <td>
            <div class="row">
              <form class="form-inline" v-on:submit.stop.prevent="updateBrand">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="brandName"
                    v-bind:value="brand.name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    name="brandId"
                    v-bind:value="brand.id"
                    hidden
                  />
                </div>
                <button class="btn btn-info mr-2">儲存</button>
              </form>
              <form class="form-inline" v-on:submit.stop.prevent="deleteBrand">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    name="brandId"
                    v-bind:value="brand.id"
                    hidden
                  />
                </div>
                <button class="btn btn-info mr-2">刪除</button>
              </form>
            </div>
          </td>
          <td scope="col">{{brand.Products.length}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminsAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";

export default {
  data() {
    return {
      brands: []
    };
  },
  created() {
    this.getAllBrands();
  },
  methods: {
    async getAllBrands() {
      try {
        let response = await adminsAPI.getAllBrands();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.brands = data.brands;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取品牌資料"
        });
      }
    },
    async addBrand(event) {
      try {
        const brandName = event.target.brandName.value;
        // 確認使用者有輸入品牌名稱才送去給後端API新增品牌
        if (brandName === "") {
          Toast.fire({
            icon: "error",
            title: "請輸入品牌名稱"
          });
        } else {
          let response = await adminsAPI.addBrand({ brandName });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }
          // 為了減少馬上去後端要資料時後端的負擔，直接在前端針對data做更新就好(我有讓後端在建立品牌時順便傳了brand整包回來讓我用)
          this.brands = this.brands.push(data.brand);
          console.log(data.brand);
          console.log(this.brands); // 值竟然變成陣列的長度
          Toast.fire({
            icon: "success",
            title: "品牌新增成功"
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "新增品牌失敗"
        });
      }
    },
    async updateBrand(event) {
      try {
        const brandName = event.target.brandName.value;
        const brandId = event.target.brandId.value;
        // 確認使用者有輸入品牌名稱才送去給後端API新增品牌
        if (brandName === "") {
          Toast.fire({
            icon: "error",
            title: "請輸入品牌名稱"
          });
        } else {
          let response = await adminsAPI.updateBrand({ brandName, brandId });
          const { data, statusText } = response;
          if (statusText !== "OK" || data.status !== "success") {
            throw new Error(statusText);
          }

          Toast.fire({
            icon: "success",
            title: "品牌更新成功"
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "更新品牌失敗"
        });
      }
    },
    async deleteBrand(event) {
      try {
        const brandId = event.target.brandId.value;
        let response = await adminsAPI.deleteBrand({ brandId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 在前端直接把畫面更新
        this.brands = this.brands.filter(brand => {
          return brand.id !== Number(brandId);
        });

        Toast.fire({
          icon: "success",
          title: "品牌刪除成功"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "刪除品牌失敗"
        });
      }
    }
  }
};
</script>
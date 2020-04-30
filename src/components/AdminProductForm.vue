<template>
  <form v-if="!isLoading" v-on:submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">產品名稱(必填)</label>
      <input type="text" class="form-control" id="name" name="name" required v-model="product.name" />
    </div>
    <div class="form-group">
      <label for="brandId">品牌類別</label>
      <select id="brandId" class="form-control" name="brandId" v-model="product.BrandId">
        <option value selected disabled>--請選擇--</option>
        <option v-for="brand in brands" v-bind:key="brand.id" v-bind:value="brand.id">{{brand.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="listPrice">市價</label>
      <input
        type="text"
        class="form-control"
        id="listPrice"
        name="listPrice"
        v-model="product.listPrice"
      />
    </div>
    <div class="form-group">
      <label for="sellingPrice">售價</label>
      <input
        type="text"
        class="form-control"
        id="sellingPrice"
        name="sellingPrice"
        v-model="product.sellingPrice"
      />
    </div>
    <div class="form-group">
      <label for="inventory">庫存</label>
      <input
        type="text"
        class="form-control"
        id="inventory"
        name="inventory"
        v-model="product.inventory"
      />
    </div>
    <div class="form-group">
      是否上架(必填)
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="sellingStatus"
          id="sellingStatusTrue"
          value="1"
          required
          v-bind:checked="product.sellingStatus === true"
        />
        <label class="form-check-label" for="sellingStatusTrue">是</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="sellingStatus"
          id="sellingStatusFalse"
          value="0"
          v-bind:checked="product.sellingStatus === false"
        />
        <label class="form-check-label" for="sellingStatusFalse">否</label>
      </div>
    </div>
    <div class="form-group">
      是否免運(必填)
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="shippingFee"
          id="shippingFeeTrue"
          value="1"
          required
          v-bind:checked="product.shippingFee === true"
        />
        <label class="form-check-label" for="shippingFeeTrue">是</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="shippingFee"
          id="shippingFeeFalse"
          value="0"
          v-bind:checked="product.shippingFee === false"
        />
        <label class="form-check-label" for="shippingFeeFalse">否</label>
      </div>
    </div>
    <div class="form-group">
      <label for="image1">Image1</label>
      <img
        v-if="product.image1"
        :src="product.image1"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="image1"
        type="file"
        name="image1"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="image2">Image2</label>
      <img
        v-if="product.image2"
        :src="product.image2"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="image2"
        type="file"
        name="image2"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="image3">Image3</label>
      <img
        v-if="product.image3"
        :src="product.image3"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="image3"
        type="file"
        name="image3"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="image4">Image4</label>
      <img
        v-if="product.image4"
        :src="product.image4"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="image4"
        type="file"
        name="image4"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="detail">商品描述</label>
      <img
        v-if="product.detail"
        :src="product.detail"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="detail"
        type="file"
        name="detail"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="deliveryKnow">運送須知</label>
      <img
        v-if="product.deliveryKnow"
        :src="product.deliveryKnow"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="deliveryKnow"
        type="file"
        name="deliveryKnow"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="refundKnow">退貨須知</label>
      <img
        v-if="product.refundKnow"
        :src="product.refundKnow"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <input
        id="refundKnow"
        type="file"
        name="refundKnow"
        accept="image/*"
        class="form-control-file"
        v-on:change="handleFileChange"
      />
    </div>
    <div class="form-group">
      <label for="category1Id">產品大類</label>
      <select
        id="category1Id"
        class="form-control"
        name="category1Id"
        v-model="product.Category1Id"
        v-on:change="getCategories($event)"
      >
        <option value disabled>--請選擇--</option>
        <option
          v-for="category1 in category1s"
          v-bind:key="category1.id"
          v-bind:value="category1.id"
        >{{category1.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="category2Id">產品中類</label>
      <select
        id="category2Id"
        class="form-control"
        name="category2Id"
        v-model="product.Category2Id"
        v-on:change="getCategories($event)"
      >
        <option value selected disabled>--請選擇--</option>
        <option
          v-for="category2 in category2s"
          v-bind:key="category2.id"
          v-bind:value="category2.id"
        >{{category2.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="category3Id">產品小類</label>
      <select
        id="category3Id"
        class="form-control"
        name="category3Id"
        v-model="product.Category3Id"
        v-on:change="getCategories($event)"
      >
        <option value selected disabled>--請選擇--</option>
        <option
          v-for="category3 in category3s"
          v-bind:key="category3.id"
          v-bind:value="category3.id"
        >{{category3.name}}</option>
      </select>
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      v-bind:disabled="isProcessing"
    >{{isProcessing? "處理中...":"送出"}}</button>
  </form>
</template>
<script>
import { Toast } from "../utils/helpers";
import adminsAPI from "../apis/admin";
export default {
  props: {
    productFromDb: {
      type: Object
    },
    isProcessing: {
      type: Boolean
    }
  },
  watch: {
    productFromDb(product) {
      this.product = {
        ...product
      };
    }
  },
  data() {
    return {
      product: {
        name: null,
        BrandId: "",
        listPrice: 0,
        sellingPrice: 0,
        inventory: 0,
        sellingStatus: null,
        shippingFee: null,
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        detail: "",
        deliveryKnow: "",
        refundKnow: "",
        Category1Id: "",
        Category2Id: "",
        Category3Id: ""
      },
      brands: [],
      category1s: [],
      category2s: [],
      category3s: [],
      isLoading: true
    };
  },
  created() {
    this.getAllBrandsAndCategories();
    this.getCategories("getCategory1s");
  },
  methods: {
    handleFileChange(event) {
      const inputName = event.target.name;
      const files = event.target.files;
      const imageURL = window.URL.createObjectURL(files[0]);
      inputName === "image1"
        ? (this.product.image1 = imageURL)
        : inputName === "image2"
        ? (this.product.image2 = imageURL)
        : inputName === "image3"
        ? (this.product.image3 = imageURL)
        : inputName === "image4"
        ? (this.product.image4 = imageURL)
        : inputName === "detail"
        ? (this.product.detail = imageURL)
        : inputName === "deliveryKnow"
        ? (this.product.deliveryKnow = imageURL)
        : (this.product.refundKnow = imageURL);
    },
    async getAllBrandsAndCategories() {
      try {
        let response = await adminsAPI.getAllBrandsAndCategories();
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.brands = data.brands;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法獲取品牌及分類資料"
        });
      }
    },
    handleSubmit(event) {
      const form = event.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
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
          // 否則其他就都會是中分類或小分類的值改變時來呼叫我們，而此時帶進來的event才是DOM裡面的東西

          const query = {};
          query[event.target.name] = event.target.value;
          let response = await adminsAPI.getCategories(query);
          const { data, statusText } = response;
          if (statusText !== "OK") {
            throw new Error(statusText);
          }

          // 接著再判斷是大類觸發的，就帶拿到的資料回去中類；判斷是中類觸發的，就帶拿到的資料回去小類
          if (event.target.name === "category1Id") {
            // 如果使用者這次不是第一次點大分類，會因為data裡product裡面還存著選擇的中類以及小類的值
            // ，導致中類及小類不會是顯示<請選擇>，所以要把中類跟小類原本選的值設成一開始data那邊設的''空字串，才會回到<請選擇>
            this.product.Category2Id = "";
            this.product.Category3Id = "";
            this.category2s = data.category2s;
          } else if (event.target.name === "category2Id") {
            // 至於如果使用者不是第一次點中類，我只希望小類顯示<請選擇>而已，所以只更新小類在data裡product的值
            this.product.Category3Id = "";
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
    }
  }
};
</script>
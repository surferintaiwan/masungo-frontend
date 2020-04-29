<template>
  <form v-if="!isLoading" v-on:submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">產品名稱(必填)</label>
      <input
        type="text"
        class="form-control"
        id="name"
        name="name"
        required
        v-bind:value="product.name"
      />
    </div>
    <div class="form-group">
      <label for="brandId">品牌類別</label>
      <select id="brandId" class="form-control" name="brandId" v-bind:value="product.BrandId">
        <option selected disabled>--請選擇--</option>
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
        v-bind:value="product.listPrice"
      />
    </div>
    <div class="form-group">
      <label for="sellingPrice">售價</label>
      <input
        type="text"
        class="form-control"
        id="sellingPrice"
        name="sellingPrice"
        v-bind:value="product.sellingPrice"
      />
    </div>
    <div class="form-group">
      <label for="inventory">庫存</label>
      <input
        type="text"
        class="form-control"
        id="inventory"
        name="inventory"
        v-bind:value="product.inventory"
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
        v-bind:value="product.Category1Id"
      >
        <option selected disabled>--請選擇--</option>
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
        v-bind:value="product.Category2Id"
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
        v-bind:value="product.Category3Id"
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
        BrandId: null,
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
        Category1Id: null,
        Category2Id: null,
        Category3Id: null
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
        this.category1s = data.category1s;
        this.category2s = data.category2s;
        this.category3s = data.category3s;
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
    }
  }
};
</script>
<template>
  <div class="container py-5">
    <p>
      <span v-if="categories.category1" class="text-info">{{categories.category1.name}}</span>
      <span v-if="categories.category2" class="text-info">> {{categories.category2.name}}</span>
      <span v-if="categories.category3" class="text-info">> {{categories.category3.name}}</span>
    </p>
    <div class="container">
      <div class="row justify-content-between">
        <select name="brand" v-on:change="chooseBrand($event)">
          <option value selected>全部</option>>
          <option
            v-for="brand in brands"
            v-bind:key="brand.id"
            v-bind:value="brand.id"
          >{{brand.name}}</option>
        </select>
        <select name="sort" v-on:change="chooseSort($event)">
          <option disabled value selected>請選擇排序方式</option>>
          <option value="sellingPriceDESC">售價:高->低</option>
          <option value="sellingPriceASC">售價:低->高</option>
          <option value="createdAtDESC">最新商品在前</option>
          <option value="createdAtASC">最新商品在後</option>
        </select>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3" v-for="product in products" v-bind:key="product.id">
        <div class="card" style>
          <img v-bind:src="product.image1" class="card-img-top" alt />

          <div class="card-body">
            <router-link v-bind:to="{name: 'product-detail', params: {productId: product.id}}">
              <h5 class="card-title">{{ product.name }}</h5>
            </router-link>
            <p>NT. {{ product.sellingPrice }}</p>
            <div class="row">
              <button
                v-if="product.isFollowed"
                type="submit"
                class="btn btn-danger ml-2"
                v-on:click="deleteFollowing(product.id)"
              >取消追蹤</button>
              <button
                v-else
                type="submit"
                class="btn btn-info ml-2"
                v-on:click="addFollowing(product.id)"
              >+追蹤</button>

              <button
                type="submit"
                class="btn btn-warning ml-2"
                v-on:click="addCartItem(product.id)"
              >+購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsAPI from "../apis/products";
import cartsAPI from "../apis/carts";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      products: [],
      brands: [],
      categories: {}
    };
  },
  created() {
    this.getProductsByCategory(this.$route.query);
    this.getAllBrands(this.$route.query);
  },
  methods: {
    async getProductsByCategory(query) {
      try {
        let response = await productsAPI.getProductsByCategory(query);
        const { data, statusText } = response;
        this.products = data.products;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        console.log(data);
        this.categories = data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllBrands(query) {
      try {
        // 因為呼叫這支函式時傳入的query是瀏覽器網址列上的，接著就要判斷query裡面所帶的是大類、中類、小類，才分別帶不同東西去給後端API要資料回來
        let whichCategory = "";
        let categoryId = null;
        // 代表現在瀏覽器是在大類商品分類頁的話
        if (query.category1Id) {
          whichCategory = "category1";
          categoryId = query.category1Id;
        } else if (query.category2Id) {
          // 代表現在瀏覽器是在中類商品分類頁的話
          whichCategory = "category2";
          categoryId = query.category2Id;
        } else if (query.category3Id) {
          // 代表現在瀏覽器是在小類商品分類頁的話
          whichCategory = "category3";
          categoryId = query.category3Id;
        }
        let response = await productsAPI.getAllBrands({
          whichCategory,
          categoryId
        });
        const { data, statusText } = response;

        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.brands = data.brands;
      } catch (error) {
        Toast.fire({ icon: "error", title: "無法獲取該類別品牌資料" });
      }
    },
    chooseBrand(event) {
      const routerQuery = { ...this.$route.query };
      routerQuery["brandId"] = event.target.value;

      this.$router.push({
        name: "products-by-category",
        query: routerQuery
      });
    },
    chooseSort(event) {
      const routerQuery = { ...this.$route.query };
      routerQuery["sort"] = event.target.value;

      this.$router.push({
        name: "products-by-category",
        query: routerQuery
      });
    },
    async addCartItem(productId) {
      try {
        // 取出瀏覽器上的cartId，如果瀏覽器上沒有會是null，打給API會產生新的cartId
        const cartId = localStorage.getItem("cartId");
        let response = await cartsAPI.addCartItem({
          cartId: cartId,
          productId: productId,
          amount: 1
        });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        // 把API回傳的cartId存在瀏覽器上
        localStorage.setItem("cartId", data.cartId);

        Toast.fire({
          type: "success",
          title: "已將本商品加入購物車"
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入購物車"
        });
        console.log(error);
      }
    },
    async addFollowing(productId) {
      try {
        let response = await usersAPI.addFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 直接把剛剛加入追蹤的商品的+追蹤按鈕變成取消追蹤
        this.products = this.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              isFollowed: true
            };
          } else {
            return product;
          }
        });
        Toast.fire({
          icon: "success",
          title: "追蹤成功"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤清單"
        });
      }
    },
    async deleteFollowing(productId) {
      try {
        let response = await usersAPI.deleteFollowingProduct({ productId });
        const { data, statusText } = response;
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 直接把剛剛移除追蹤的商品的取消追蹤按鈕變成+追蹤
        this.products = this.products.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              isFollowed: false
            };
          } else {
            return product;
          }
        });
        Toast.fire({
          icon: "success",
          title: "移除追蹤成功"
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法將商品自追蹤清單移除"
        });
      }
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.getProductsByCategory(to.query);
    this.getAllBrands(to.query);
    next();
  }
};
</script>

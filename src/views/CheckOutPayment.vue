<template>
  <div class="container py-5">
    <div class="form-group">
      <label for="orderAmount">付款金額</label>
      <input type="text" class="form-control" id="orderAmount" v-bind:value="orderAmount" disabled />
    </div>

    <form name="Newebpay" v-bind:action="finalTradeInfo.PayGateWay" method="POST">
      <div class="form-group">
        <label for="MerchantID">MerchantID:</label>
        <input
          name="MerchantID"
          type="text"
          class="form-control"
          id="MerchantID"
          disabled
          v-bind:value="finalTradeInfo.MerchantID"
        />
      </div>
      <div class="form-group">
        <label for="TradeInfo">TradeInfo:</label>
        <input
          name="TradeInfo"
          type="text"
          class="form-control"
          id="TradeInfo"
          disabled
          v-bind:value="finalTradeInfo.TradeInfo"
        />
      </div>
      <div class="form-group">
        <label for="TradeSha">TradeSha:</label>
        <input
          name="TradeSha"
          type="text"
          class="form-control"
          id="TradeSha"
          disabled
          v-bind:value="finalTradeInfo.TradeSha"
        />
      </div>
      <div class="form-group">
        <label for="Version">Version:</label>
        <input
          name="Version"
          type="text"
          class="form-control"
          id="Version"
          disabled
          v-bind:value="finalTradeInfo.Version"
        />
        <button type="submit" class="btn btn-primary">進行付款</button>
      </div>
    </form>
  </div>
</template>

<script>
import ordersAPI from "../apis/orders";
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      orderAmount: 0,
      finalTradeInfo: {}
    };
  },
  created() {
    this.getPayment();
  },
  methods: {
    async getPayment() {
      try {
        const orderId = this.$route.params.orderId;
        let response = await ordersAPI.getPayment({ orderId });
        const { data, statusText } = response;
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.orderAmount = data.orderAmount;
        this.finalTradeInfo = data.finalTradeInfo;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法獲取付款資料"
        });
      }
    }
  }
};
</script>

<template>
  <div class="requirement-list" style="background: #f0f0f0">
    <a-page-header
      style="
        border: 1px solid rgb(235, 237, 240);
        margin-bottom: 10px;
        background: white;
      "
    >
      <template #title>
        <a-breadcrumb>
          <a-breadcrumb-item href="/">Trang chủ </a-breadcrumb-item>
          <a-breadcrumb-item>Xử lý đối soát</a-breadcrumb-item>
          <a-breadcrumb-item>Danh sách yêu cầu</a-breadcrumb-item>
        </a-breadcrumb>
        <span>Danh sách yêu cầu</span>
      </template>
    </a-page-header>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="Điều kiện tìm kiếm">
        <a-row :gutter="32" style="margin-bottom: 20px">
          <a-col :span="5">
            <p>Nhập mã yêu cầu</p>
            <a-input placeholder="Vui lòng nhập mã yêu cầu" />
          </a-col>
          <a-col :span="5">
            <p>Loại yêu cầu xử lý</p>
            <a-select
              default-value="-- Tất cả --"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option value="d" disabled>
                -- Tất cả --
              </a-select-option>
              <a-select-option value="a">
                Cập nhập trạng thái GD
              </a-select-option>
              <a-select-option value="b">
                Cập nhập trạng thái GD,hạch toán
              </a-select-option>
              <a-select-option value="c">
                Cập nhập trạng thái GD,thực hiện hoàn toàn
              </a-select-option>
              <a-select-option value="c"> Insert giao dịch</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <p>Dịch vụ</p>
            <a-select
              default-value="-- Tất cả --"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option value="d" disabled>
                -- Tất cả --
              </a-select-option>
              <a-select-option value="a"> Hỗ trợ thu hộ </a-select-option>
              <a-select-option value="b"> Hỗ trợ chi hộ </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <p>Loại giao dịch</p>
            <a-select
              default-value="-- Tất cả --"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option value="d" disabled>
                -- Tất cả --
              </a-select-option>
              <a-select-option value="jack"> Thanh toán </a-select-option>
              <a-select-option value="lucy"> Chuyển tiền </a-select-option>
              <a-select-option value="lucy"> Hoàn </a-select-option>
              <a-select-option value="lucy"> Hủy </a-select-option>
              <a-select-option value="lucy"> Thu khác </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row :gutter="32" style="margin-bottom: 20px">
          <a-col :span="5">
            <p>Lĩnh vực kinh doanh</p>
            <a-select
              default-value="-- Tất cả --"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option value="d" disabled>
                -- Tất cả --
              </a-select-option>
              <a-select-option value="jack"> Chi tiền BTXH </a-select-option>
              <a-select-option value="jack"> Thu hộ tiền COD </a-select-option>
              <a-select-option value="jack"> Thanh toán QR </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <p>Trạng thái yêu cầu</p>

            <a-select
              default-value="-- Tất cả --"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option value="d" disabled>
                -- Tất cả --
              </a-select-option>
              <a-select-option value="jack"> Chờ duyệt </a-select-option>
              <a-select-option value="lucy"> Đã duyệt </a-select-option>
              <a-select-option value="lucy"> Từ chối </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <p>Từ ngày</p>
            <a-date-picker @change="onChange" style="width: 100%" />
          </a-col>
          <a-col :span="5">
            <p>Đến ngày</p>
            <a-date-picker @change="onChange" style="width: 100%" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="5"></a-col>
          <a-col :span="5"></a-col>
          <a-col :span="5"></a-col>
          <a-col :span="5"></a-col>
          <a-col :span="2">
            <a-button style="width: 90%"> Nhập lại </a-button>
          </a-col>
          <a-col :span="2">
            <a-button type="primary" style="width: 90%" icon="search">
              Tìm kiếm
            </a-button>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
    <a-page-header
      style="
        border: 1px solid rgb(235, 237, 240);
        margin-top: 10px;
        background: white;
      "
    >
      <template #title>
        <span>Kết quả tìm kiếm</span>
      </template>
      <a-row type="flex" justify="space-between">
        <a-col> Tổng số bản ghi: {{ data?.length }} </a-col>
        <a-col>
          <a-button type="primary" icon="download"> Xuất exel </a-button>
        </a-col>
      </a-row>
    </a-page-header>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 5 }"
      style="background: white"
      bordered
    >
      <template slot="requestCode" slot-scope="text, record">
        <a @click="alertRequestCode(text, record)"> {{ text }} </a>
      </template>
      <template slot="operation" slot-scope="text">
        <a @click="alertOperation(text)"> {{ text }} </a>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Mã yêu cầu",
    dataIndex: "requestCode",
    key: "requestCode",
    scopedSlots: { customRender: "requestCode" },
  },
  {
    title: "Loại yêu cầu",
    dataIndex: "requestType",
    key: "requestType",
  },
  {
    title: "Dịch vụ",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Loại giao dịch",
    dataIndex: "transactionType",
    key: "transactionType",
  },
  {
    title: "Lĩnh vực kinh doanh",
    dataIndex: "businessField",
    key: "businessField",
  },
  {
    title: "Người yêu cầu",
    dataIndex: "requester",
    key: "requester",
  },
  {
    title: "Thời gian yêu cầu",
    dataIndex: "requestTime",
    key: "requestTime",
  },
  {
    title: "Người duyệt",
    dataIndex: "reviewer",
    key: "reviewer",
  },
  {
    title: "Thời gian duyệt",
    dataIndex: "browsingTime",
    key: "browsingTime",
  },
  {
    title: "Trạng thái yêu cầu",
    dataIndex: "requestStatus",
    key: "requestStatus",
  },
  {
    title: "Thao tác",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [
  {
    key: "1",
    requestCode: 404,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Chờ duyệt",
    operation: "Duyệt ",
  },
  {
    key: "2",
    requestCode: 201,
    requestType: "Cập nhập trạng thái giao dịch,hạch toán",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Từ chối",
    operation: "Xem",
  },
  {
    key: "3",
    requestCode: 403,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Đã duyệt",
    operation: "Xem ",
  },
  {
    key: "4",
    requestCode: 404,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Chờ duyệt",
    operation: "Duyệt ",
  },
  {
    key: "5",
    requestCode: 303,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Chờ duyệt",
    operation: "Duyệt ",
  },
  {
    key: "6",
    requestCode: 200,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Chờ duyệt",
    operation: "Duyệt ",
  },
  {
    key: "7",
    requestCode: 401,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Chờ duyệt",
    operation: "Duyệt ",
  },
  {
    key: "8",
    requestCode: 404,
    requestType: "Insert giao dịch",
    service: "Hỗ trợ thu hộ",
    transactionType: "Thanh toán",
    businessField: "Thanh toán qua QR",
    requester: "Phan Thị Yến",
    requestTime: "2014-12-24 23:12:00",
    reviewer: "Phan Thị Yến",
    browsingTime: "2014-12-26 23:12:00",
    requestStatus: "Đã duyệt",
    operation: "Xem",
  },
];
export default {
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ["1"],
      data,
      columns,
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    alertRequestCode(text, record) {
      console.log("text", text);
      console.log("record", record);
      this.$router.push({ name: "RequestDetails" });
    },
    alertOperation(code) {
      alert(`Request Code: ${code} + 1`);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
};
</script>

<style>
.requirement-list {
  padding: 10px;
}
</style>

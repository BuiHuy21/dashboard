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
          <a-breadcrumb-item>Chi tiết yêu cầu</a-breadcrumb-item>
        </a-breadcrumb>
        <span>Chi tiết yêu cầu</span>
      </template>
    </a-page-header>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="Thông tin chung">
        <a-row :gutter="32" style="margin-bottom: 20px">
          <a-col :span="4">
            <p>Nhập mã yêu cầu</p>
            <a-input placeholder="Vui lòng nhập mã yêu cầu" />
          </a-col>
          <a-col :span="4">
            <p>Loại yêu cầu xử lý</p>
            <a-input placeholder="Người tạo" />
          </a-col>
          <a-col :span="4">
            <p>Dịch vụ</p>
            <a-input placeholder="Người tạo" />
          </a-col>
          <a-col :span="4">
            <p>Loại giao dịch</p>
            <a-input placeholder="Người tạo" />
          </a-col>
        </a-row>
        <a-row :gutter="32" style="margin-bottom: 20px">
          <a-col :span="4">
            <p>Lĩnh vực kinh doanh</p>
            <a-input placeholder="Người tạo" />
          </a-col>
          <a-col :span="4">
            <p>Trạng thái yêu cầu</p>
            <a-input placeholder="Người tạo" />
          </a-col>
        </a-row>
        <a-row :gutter="32" style="margin-bottom: 20px">
          <a-col :span="4">
            <p>Người tạo</p>
            <a-input placeholder="Người tạo" />
          </a-col>
          <a-col :span="4">
            <p>Ngày tạo</p>
            <a-input placeholder="Ngày tạo" />
          </a-col>
          <a-col :span="4">
            <p>Người duyệt</p>
            <a-input placeholder="Người duyệt" />
          </a-col>
          <a-col :span="4">
            <p>Ngày duyệt</p>
            <a-input placeholder="Ngày duyệt" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4"></a-col>
          <a-col :span="5"></a-col>
          <a-col :span="5"></a-col>
          <a-col :span="5"></a-col>
          <template v-if="browsingStatus === 'waiting'">
            <a-col :span="2">
              <a-button type="primary" style="width: 90%">Từ chối </a-button>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" style="width: 90%"> Duyệt </a-button>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <template
            v-if="browsingStatus === 'refuse' || browsingStatus === 'approved'"
          >
            <a-table
              :columns="columns1"
              :data-source="data1"
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
          </template>
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
        <span>Danh sách giao dịch</span>
      </template>
      <template v-if="browsingStatus === 'approved'">
        <a-row type="flex">
          <a-select
            default-value="Trạng thái"
            @change="handleChange"
            style="width: 200px; padding-right: 20px"
          >
            <a-select-option value="d" disabled> Trạng thái </a-select-option>
            <a-select-option value="jack"> Chi tiền BTXH </a-select-option>
            <a-select-option value="jack"> Thu hộ tiền COD </a-select-option>
            <a-select-option value="jack"> Thanh toán QR </a-select-option>
          </a-select>
          <a-button type="primary"> Nhập lại </a-button>
        </a-row>
      </template>
      <a-row type="flex" justify="space-between" v-else>
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
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "Nguyên nhân",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Mã giao dịch core PPC",
    dataIndex: "transactionCode",
    key: "transactionCode",
  },
  {
    title: "Số tiền giao dịch   ",
    dataIndex: "transactionAmount",
    key: "transactionAmount",
  },
  {
    title: "Thời gian giao dịch",
    dataIndex: "transactionTime",
    key: "transactionTime",
  },
  {
    title: "Trạng thái giao dịch",
    dataIndex: "transactionStatus",
    key: "transactionStatus",
  },
  {
    title: "Trạng thái cập nhập",
    dataIndex: "updateStatus",
    key: "updateStatus",
  },
  {
    title: "Lý do cập nhập",
    dataIndex: "updateReason",
    key: "updateReason",
  },
  {
    title: "Trạng thái hạch toán",
    dataIndex: "accountingStatus",
    key: "accountingStatus",
  },
];

const data = [
  {
    key: "1",
    status: 404,
    reason: "không có",
    transactionCode: "203023123123",
    transactionAmount: 1000000,
    transactionTime: "2014-12-26 23:12:00",
    transactionStatus: "Chờ thực hiện",
    updateStatus: "Thành công",
    updateReason: "Lỗi hệ thống",
    accountingStatus: "Không có",
  },
  {
    key: "2",
    status: 402,
    reason: "không có",
    transactionCode: "4343332233",
    transactionAmount: 5300000,
    transactionTime: "2014-12-26 23:12:00",
    transactionStatus: "Chờ xác nhận",
    updateStatus: "Chưa thành công",
    updateReason: "Lỗi hệ thống",
    accountingStatus: "Không có",
  },
];
const columns1 = [
  {
    title: "Tổng bản ghi",
    dataIndex: "totalRecord",
    key: "totalRecord",
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalMoney",
    key: "totalMoney",
  },
  {
    title: "Thành công",
    dataIndex: "success",
    key: "success",
  },
  {
    title: "Thất bại",
    dataIndex: "error",
    key: "error",
  },
  {
    title: "Chờ xử lý",
    dataIndex: "pending",
    key: "pending",
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Trạng thái kết thúc",
    dataIndex: "endTime",
    key: "endTime",
  },
];

const data1 = [
  {
    totalRecord: "1",
    totalMoney: 43000,
    success: 0,
    error: 0,
    pending: 0,
    startTime: "2014-12-26 23:12:00",
    endTime: "2014-12-28 23:12:00",
  },
];
export default {
  data() {
    return {
      activeKey: ["1"],
      data,
      columns,
      data1,
      columns1,
      //   browsingStatus: "approved",
      //   browsingStatus: "waiting",
      browsingStatus: "refuse",
    };
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

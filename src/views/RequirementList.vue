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
          <a-breadcrumb-item>
            <router-link to="/">Trang chủ</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Xử lý đối soát</a-breadcrumb-item>
          <a-breadcrumb-item>Danh sách yêu cầu</a-breadcrumb-item>
        </a-breadcrumb>
        <span>Danh sách yêu cầu</span>
      </template>
    </a-page-header>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="Điều kiện tìm kiếm">
        <a-row :gutter="16" style="margin-bottom: 20px">
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
              <a-select-option value="0">
                Cập nhập trạng thái GD
              </a-select-option>
              <a-select-option value="1">
                Cập nhập trạng thái GD,hạch toán
              </a-select-option>
              <a-select-option value="2">
                Cập nhập trạng thái GD,thực hiện hoàn toàn
              </a-select-option>
              <a-select-option value="3"> Insert giao dịch</a-select-option>
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
        <a-row :gutter="16" style="margin-bottom: 20px">
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
        <a-col> Tổng số bản ghi: {{ dataColumns?.length }} </a-col>
        <a-col>
          <a-button type="primary" icon="download"> Xuất exel </a-button>
        </a-col>
      </a-row>
    </a-page-header>

    <a-table
      :columns="colums"
      :data-source="dataColumns"
      :pagination="{ pageSize: 8 }"
      style="background: white"
      bordered
    >
      <template slot="requestCode" slot-scope="text, record">
        <a @click="alertRequestCode(record.key)"> {{ text }} </a>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div
          v-if="record.requestStatus === 'Chờ duyệt'"
          style="display: flex; gap: 5px; white-space: nowrap"
        >
          <a @click="clickView(record.key)">Xem</a>

          <a @click="clickView(record.key)">| Duyệt</a>
          <a-modal
            v-model="visibleRefuse"
            okText="Xác nhận"
            cancelText="Hủy"
            title="Thông báo từ hệ thống"
            @ok="handleOkRefuse"
          >
            <p>*Lý do</p>
            <a-input placeholder="Nhập lý do" />
            <p>*Mật khẩu</p>
            <a-input placeholder="Nhập mật khẩu" />
          </a-modal>
          <a @click="clickView(record.key)">| Từ chối</a>
        </div>
        <div v-else style="display: flex; justify-content: center">
          <a @click="clickView(record.key)">Xem</a>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: ["1"],
    };
  },

  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    alertRequestCode(id) {
      console.log("id", id);

      this.$router.push({ name: "RequestDetails", params: { id } });
    },
    alertOperation(code) {
      alert(`Request Code: ${code} + 1`);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    clickView(id) {
      this.$router.push({ name: "RequestDetails", params: { id } });
    },
    clickApprove() {
      alert("đây là nút duyệt");
    },
    clickRefuse() {
      alert("đây là nút từ chối");
    },
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },

  computed: {
    dataColumns() {
      return this.$store.getters.dataColumns;
    },
    colums() {
      return this.$store.getters.colums;
    },
  },
};
</script>

<style>
.requirement-list {
  padding: 10px;
}
</style>

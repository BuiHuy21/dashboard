<template>
  <div class="requirement-list" style="background: #f0f0f0">
    <bread-crum />
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="2" header="Điều kiện tìm kiếm">
        <a-form :form="form" @submit="handleSubmit">
          <a-row :gutter="16" style="margin-bottom: 20px">
            <a-col :span="5">
              <a-form-item label="Loại yêu cầu">
                <a-select
                  style="width: 100%"
                  @change="handleSelectChange"
                  placeholder="-- Chọn --"
                  v-decorator="[
                    'requestType',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Đây là trường dữ liệu bắt buộc!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option value="d" disabled>
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option value="Cập nhập trạng thái GD">
                    Cập nhập trạng thái GD
                  </a-select-option>
                  <a-select-option value="Cập nhập trạng thái GD,hạch toán">
                    Cập nhập trạng thái GD,hạch toán
                  </a-select-option>
                  <a-select-option
                    value="Cập nhập trạng thái GD,thực hiện hoàn toàn"
                  >
                    Cập nhập trạng thái GD,thực hiện hoàn toàn
                  </a-select-option>
                  <a-select-option value="Insert giao dịch"
                    >Insert giao dịch</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="Dịch vụ">
                <a-select
                  style="width: 100%"
                  placeholder="-- Chọn --"
                  @change="handleSelectChange"
                  v-decorator="[
                    'service',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Đây là trường dữ liệu bắt buộc!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option value="d" disabled>
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option value="a"> Hỗ trợ thu hộ </a-select-option>
                  <a-select-option value="b"> Hỗ trợ chi hộ </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="Lĩnh vực kinh doanh">
                <a-select
                  style="width: 100%"
                  placeholder="-- Chọn --"
                  @change="handleSelectChange"
                  v-decorator="[
                    'businessField',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Đây là trường dữ liệu bắt buộc!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option value="d" disabled>
                    -- Chọn --
                  </a-select-option>
                  <a-select-option value="a"> Chi tiền BTXH </a-select-option>
                  <a-select-option value="j"> Thu hộ tiền COD </a-select-option>
                  <a-select-option value="c"> Thanh toán QR </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="Loại giao dịch">
                <a-select
                  style="width: 100%"
                  placeholder="-- Chọn --"
                  @change="handleSelectChange"
                  v-decorator="[
                    'transactionType',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Đây là trường dữ liệu bắt buộc!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option value="d" disabled>
                    -- Tất cả --
                  </a-select-option>
                  <a-select-option value="a"> Thanh toán </a-select-option>
                  <a-select-option value="b"> Chuyển tiền </a-select-option>
                  <a-select-option value="y"> Hoàn </a-select-option>
                  <a-select-option value="c"> Hủy </a-select-option>
                  <a-select-option value="u"> Thu khác </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 20px">
            <a-button type="link" html-type="submit">
              <a-icon type="upload" /> Tải file mẫu
            </a-button>
          </a-row>
          <a-row type="flex" justify="space-between">
            <a-col style="display: flex">
              <a-upload
                name="file"
                @change="handleChangeUpload"
                :showUploadList="false"
                :disabled="isDisableSelectUpload"
              >
                <a-button
                  type="primary"
                  :disabled="isDisableSelectFile"
                  @click="handleSelectFile"
                >
                  Chọn file
                </a-button>
              </a-upload>

              <a-button style="margin-left: 20px" @click="handleReset">
                Nhập lại
              </a-button>
            </a-col>
            <a-col>
              <a-button
                type="primary"
                :disabled="isDisabled || tableData.length === 0"
                @click="checkData"
              >
                Kiểm tra dữ liệu
              </a-button>
              <a-modal
                v-model="visible"
                okText="Xác nhận"
                cancelText="Hủy"
                title="Thông báo từ hệ thống"
                @ok="handleOk"
              >
                <p>*Mật khẩu</p>
                <a-input placeholder="Nhập mật khẩu" />
              </a-modal>
              <a-button
                style="margin-left: 20px"
                :disabled="tableData.length === 0"
                @click="showModal"
              >
                Gửi yêu cầu
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>

      <a-page-header
        style="
          border: 1px solid rgb(235, 237, 240);
          margin-top: 10px;
          background: white;
        "
      >
        <div v-if="filteredData.length > 0" style="padding: 16px">
          <h3>Danh sách giao dịch</h3>
          <template v-if="hasSelected && !isListSelect">
            <p>
              Số bản ghi đã chọn: {{ selectedRowKeys.length }}/{{
                filteredData.length
              }}
            </p>
          </template>
          <template v-if="isListSelect">
            <p>
              Số bản ghi đã chọn: {{ selectedRowKeys.length }}/{{
                filteredData.length
              }}
            </p>
            <p>
              Số bản ghi hợp lệ: {{ selectedRowKeys.length }}/{{
                filteredData.length
              }}
            </p>
            <p>
              Số bản ghi không hợp lệ:
              {{ filteredData.length - selectedRowKeys.length }}/{{
                filteredData.length
              }}
            </p>
            <a-col style="margin-bottom: 20px">
              <a-select
                v-model="selectedStatus"
                style="width: 200px"
                placeholder="-- Chọn trạng thái --"
                @change="handleSelectChangeStatus"
              >
                <a-select-option value=""> -- Tất cả -- </a-select-option>
                <a-select-option value="Giao dịch đã tạo">
                  Giao dịch đã tạo</a-select-option
                >
                <a-select-option value="Giao dịch lỗi">
                  Giao dịch lỗi
                </a-select-option>
              </a-select>
              <a-button style="margin-left: 20px" type="primary">
                Tải xuống
              </a-button>
            </a-col>
          </template>

          <a-table
            bordered
            :columns="columns"
            :data-source="filteredData"
            :row-selection="rowSelection"
            :row-key="(record) => record.id"
            :pagination="pagination"
            @change="handleTableChange"
          >
          </a-table>
        </div>
      </a-page-header>
    </a-collapse>
  </div>
</template>

<script>
import breadCrum from "@/components/bread-crum.vue";
import { dataColumns1, dataColumns2 } from "@/data";
import readXlsxFile from "read-excel-file";
export default {
  components: { breadCrum },
  data() {
    return {
      selectedStatus: "",
      activeKey: ["2"],
      visible: false,
      visibleRefuse: false,
      isDisabled: true,
      isDisableSelectFile: false,
      isDisableSelectUpload: true,
      form: this.$form.createForm(this),
      tableData: [],
      columns: [],
      pagination: {
        current: 1,
        pageSize: 5,
      },
      selectedRowKeys: [],
      isListSelect: false,
      statusCheckEnabled: false,
      isSelectAll: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
    filteredData() {
      if (this.selectedStatus === "") {
        return this.tableData;
      }
      return this.tableData.filter((item) => {
        return item.status === this.selectedStatus;
      });
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        onSelectAll: this.onSelectAll,
        getCheckboxProps: (record) => ({
          props: {
            disabled:
              this.statusCheckEnabled && record.status !== "Giao dịch đã tạo",
          },
        }),
      };
    },
  },

  methods: {
    handleTableChange(pagination) {
      this.pagination = pagination;
      const selectedValue = this.form.getFieldValue("requestType");

      if (selectedValue?.includes("Insert giao dịch")) {
        this.columns = dataColumns2(this.pagination);
      } else if (selectedValue?.includes("Cập nhập trạng thái GD")) {
        this.columns = dataColumns1(this.pagination);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isDisableSelectUpload = false;
          let fileUrl = "";
          if (values.requestType.includes("Insert giao dịch")) {
            fileUrl = "/files/20240920_insert_giao_dich.xlsx";
          } else if (values.requestType.includes("Cập nhập trạng thái GD")) {
            fileUrl = "/files/20240920_doi_trang_thai (3).xlsx";
          }
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = fileUrl.split("/").pop();
          link.click();
        }
      });
    },
    handleSelectFile(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          this.isDisableSelectUpload = false;
        }
      });
    },
    onSelectAll(selected) {
      if (selected) {
        if (!this.isSelectAll) {
          this.selectedRowKeys = this.tableData
            .filter((item) => {
              const props = this.rowSelection.getCheckboxProps(item);
              return !props.props.disabled;
            })
            .map((item) => item.id);

          this.isSelectAll = true;
        }
      } else {
        this.selectedRowKeys = [];
        this.isSelectAll = false;
      }
    },
    handleChangeUpload(info) {
      const file = info.file.originFileObj;
      if (!file) return;
      readXlsxFile(file)
        .then((rows) => {
          const selectedValue = this.form.getFieldValue("requestType");

          if (selectedValue?.includes("Insert giao dịch")) {
            this.columns = dataColumns2(this.pagination);
          } else if (selectedValue?.includes("Cập nhập trạng thái GD")) {
            this.columns = dataColumns1(this.pagination);
          }

          const headerRowIndex = rows?.findIndex((row) => row?.includes("STT"));
          const headerRow = rows[headerRowIndex].map((item) =>
            this.cleanHeader(item)
          );

          const definedHeaders = this.columns.map((col) => col.title);

          const isHeaderMatching =
            JSON.stringify(definedHeaders) === JSON.stringify(headerRow);

          if (!isHeaderMatching) {
            throw new Error("Header trong file không khớp với định nghĩa.");
          }
          const requiredColumn = headerRow
            .map((header, index) => (header?.includes("*") ? index : -1))
            .filter((index) => index !== -1);

          const missDataRows = rows
            .slice(headerRowIndex + 1)
            .filter((row) =>
              typeof row[0] === "number" ||
              (typeof row[0] === "string" && !isNaN(row[0].trim()))
                ? requiredColumn.some(
                    (index) =>
                      !row[index] || row[index] === null || row[index] === ""
                  )
                : false
            );

          if (missDataRows.length > 0) {
            throw new Error(
              "Dữ liệu trong các cột bắt buộc chưa được điền đầy đủ."
            );
          }

          const sttColumnIndex = headerRow.findIndex((col) => col === "STT");

          this.tableData = rows
            .slice(headerRowIndex + 1)
            .filter((row) => Number(row[sttColumnIndex]))
            .map((row, index) => {
              const rowData = {};

              if (selectedValue?.includes("Insert giao dịch")) {
                rowData.id = index + 1;
                rowData.referenceCode = row[1];
                rowData.transactionAmount = row[2];
                rowData.fee = row[3];
                rowData.tax = row[4];
                rowData.transactionBank = row[5];
                rowData.transactionTime = row[6];
                rowData.transactionNapas = row[7];
                rowData.napasTraceid = row[8];
                rowData.name = row[9];
                rowData.reason = row[10];
              } else if (selectedValue?.includes("Cập nhập trạng thái GD")) {
                rowData.id = index + 1;
                rowData.transactionCode = row[1];
                rowData.transactionAmount = row[2];
                rowData.transactionTime = row[3];
                rowData.transactionStatus = row[4];
                rowData.updatedStatus = row[5];
                rowData.updateReason = row[6];
              }

              return rowData;
            });
          this.isDisableSelectFile = true;
          this.isDisabled = false;
          this.selectedRowKeys = this.tableData.map((item) => item.id);
        })
        .catch((err) => {
          this.$notification.open({
            message: "Lỗi",
            description: err?.message,
          });
        });
    },

    cleanHeader(header) {
      return header.replace(/\(\*\)|\*/g, "").trim();
    },
    checkData() {
      this.statusCheckEnabled = true;
      let url = "";
      const selectedValue = this.form.getFieldValue("requestType");
      if (selectedValue?.includes("Insert giao dịch")) {
        url = "/data2.json";
      } else if (selectedValue?.includes("Cập nhập trạng thái GD")) {
        url = "/data.json";
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.isListSelect = false;

          this.tableData = data.map((row, index) => ({
            ...row,
            id: index + 1,
            status: index % 2 == 0 ? "Giao dịch đã tạo" : "Giao dịch lỗi", // Thêm cột "status" với giá trị mặc định
          }));

          const newColumns = [...this.columns];
          const statusColumnExists = newColumns.some(
            (col) => col.key === "status"
          );

          if (!statusColumnExists) {
            newColumns.splice(1, 0, {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              align: "center",
            });
          }

          this.columns = newColumns;
          this.isListSelect = true;
          this.updateSelectedKeys();
        })
        .catch((error) => {
          console.error("Error loading fake data:", error);
        });
    },
    updateSelectedKeys() {
      this.selectedRowKeys = this.tableData
        .filter((item) => item.status === "Giao dịch đã tạo")
        .map((item) => item.id);
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    showModalRefuse() {
      this.visibleRefuse = true;
    },
    handleOkRefuse() {
      this.visibleRefuse = false;
    },
    handleSelectChange() {
      this.isDisableSelectFile = false;
    },
    handleSelectChangeStatus(value) {
      this.selectedStatus = value;
      // let dataFilter = this.tableData;
      // if (this.selectedStatus !== "") {
      //   dataFilter = this.tableData.filter(
      //     (item) => item.status === this.selectedStatus
      //   );
      // }

      // this.selectedRowKeys = dataFilter
      //   .filter((item) => {
      //     const props = this.rowSelection.getCheckboxProps(item);
      //     return !props.props.disabled;
      //   })
      //   .map((item) => item.id);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleReset() {
      this.form.resetFields();
      this.isSelectAll = false;
      this.isDisableSelectFile = false;
      this.statusCheckEnabled = false;
      this.tableData = [];
      this.columns = [];
    },
  },
};
</script>

<style></style>

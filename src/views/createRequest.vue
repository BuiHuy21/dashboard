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
          <a-breadcrumb-item>Tạo yêu cầu</a-breadcrumb-item>
        </a-breadcrumb>
        <span>Tạo yêu cầu</span>
      </template>
    </a-page-header>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="Điều kiện tìm kiếm">
        <a-form :form="form" @submit="handleSubmit">
          <a-row :gutter="32" style="margin-bottom: 20px">
            <a-col :span="5">
              <a-form-item
                label="Loại yêu cầu"
                :validate-status="requestTypeError() ? 'error' : ''"
                :help="requestTypeError() || ''"
              >
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
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item
                label="Dịch vụ"
                :validate-status="serviceError() ? 'error' : ''"
                :help="serviceError() || ''"
              >
                <a-select
                  style="width: 100%"
                  @change="handleSelectChange"
                  placeholder="-- Chọn --"
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
              <a-form-item
                label="Lĩnh vực kinh doanh"
                :validate-status="businessFieldError() ? 'error' : ''"
                :help="businessFieldError() || ''"
              >
                <a-select
                  style="width: 100%"
                  @change="handleSelectChange"
                  placeholder="-- Chọn --"
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
              <a-form-item
                label="Loại giao dịch"
                :validate-status="transactionTypeError() ? 'error' : ''"
                :help="transactionTypeError() || ''"
              >
                <a-select
                  style="width: 100%"
                  @change="handleSelectChange"
                  placeholder="-- Chọn --"
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
            <a-button type="link" @click="downloadExcel">
              <a-icon type="upload" /> Tải file mẫu
            </a-button>
          </a-row>
          <a-row type="flex" justify="space-between">
            <a-col style="display: flex">
              <a-upload
                name="file"
                :multiple="true"
                :beforeUpload="beforeUpload"
                :headers="headers"
                @change="handleChangeUpload"
                :showUploadList="false"
              >
                <a-button
                  type="primary"
                  :disabled="hasErrors(form.getFieldsError())"
                >
                  Chọn file
                </a-button>
              </a-upload>

              <a-button style="margin-left: 20px" @click="resetForm">
                Nhập lại
              </a-button>
            </a-col>
            <a-col>
              <a-button
                type="primary"
                @click="checkData"
                :disabled="hasErrors(form.getFieldsError())"
              >
                Kiểm tra dữ liệu
              </a-button>
              <a-button style="margin-left: 20px" html-type="submit">
                Gửi yêu cầu
              </a-button>
            </a-col>
          </a-row>
        </a-form>
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
      <template v-if="hasSelected">
        {{ `Đã chọn ${selectedRowKeys.length}/${tableData.length} bản ghi` }}
      </template>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="tableData"
      >
      </a-table>
    </a-page-header>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import readXlsxFile from "read-excel-file";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      activeKey: ["1"],
      headers: {
        authorization: "authorization-text",
      },
      hasErrors,
      selectedRowKeys: [],
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      tableData: [],
      columns: [],
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    beforeUpload(file) {
      const isExel =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExel) {
        message.error("Vui lòng chọn dúng định dạng file exel");
        return false;
      }
      return true;
    },
    handleChangeUpload(info) {
      const file = info.file.originFileObj;
      if (file) {
        readXlsxFile(file)
          .then((rows) => {
            const headerRowIndex = rows.findIndex((row) => row.includes("STT"));
            const headerRow = rows[headerRowIndex];
            this.columns = headerRow.map((title, index) => ({
              title: title,
              dataIndex: index,
              key: index,
            }));
            this.tableData = rows
              .slice(headerRowIndex + 1)
              .map((row, index) => {
                const rowData = {};
                row.forEach((cell, cellIndex) => {
                  rowData[cellIndex] = cell;
                });
                rowData.id = index;
                return rowData;
              });
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    downloadExcel() {
      const fileUrl = "/files/20240920_insert_giao_dich.xlsx";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "20240920_insert_giao_dich.xlsx";
      link.click();
    },
    handleSelectChange(value) {
      console.log(value);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    resetForm() {
      this.form.resetFields();
    },

    requestTypeError() {
      const { getFieldError, isFieldTouched } = this.form;
      return (
        isFieldTouched("requestTypeError") && getFieldError("requestTypeError")
      );
    },
    serviceError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("serviceError") && getFieldError("serviceError");
    },
    transactionTypeError() {
      const { getFieldError, isFieldTouched } = this.form;
      return (
        isFieldTouched("transactionTypeError") &&
        getFieldError("transactionTypeError")
      );
    },
    businessFieldError() {
      const { getFieldError, isFieldTouched } = this.form;
      return (
        isFieldTouched("businessFieldError") &&
        getFieldError("businessFieldError")
      );
    },
    checkData() {
      this.form.validateFields((err) => {
        if (!err) {
          message.success("Form hợp lệ! Đang kiểm tra dữ liệu...");
        }
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>

<style>
.requirement-list {
  padding: 10px;
}
</style>

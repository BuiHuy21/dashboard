<template>
  <div class="requirement-list" style="background: #f0f0f0">
    <bread-crum />
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="2" header="Điều kiện tìm kiếm">
        <a-form :form="form" @submit="handleSubmit">
          <a-row :gutter="32" style="margin-bottom: 20px">
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
                  <!-- <a-select-option value="0">
                    Cập nhập trạng thái GD
                  </a-select-option>
                  <a-select-option value="1">
                    Cập nhập trạng thái GD,hạch toán
                  </a-select-option> -->
                  <a-select-option value="b">
                    Cập nhập trạng thái GD,thực hiện hoàn toàn
                  </a-select-option>
                  <a-select-option value="a"> Insert giao dịch</a-select-option>
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
                :beforeUpload="beforeUpload"
                @change="handleChangeUpload"
                :multiple="true"
                :headers="headers"
                :showUploadList="false"
              >
                <a-button type="primary"> Chọn file </a-button>
              </a-upload>

              <a-button style="margin-left: 20px" @click="handleReset">
                Nhập lại
              </a-button>
            </a-col>
            <a-col>
              <a-button type="primary" :disabled="isDisable">
                Kiểm tra dữ liệu
              </a-button>
              <a-button style="margin-left: 20px" :disabled="true">
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
    </a-collapse>
  </div>
</template>

<script>
import breadCrum from "@/components/bread-crum.vue";
import { message } from "ant-design-vue";
import readXlsxFile from "read-excel-file";
export default {
  components: { breadCrum },
  data() {
    return {
      activeKey: ["2"],
      headers: {
        authorization: "authorization-text",
      },
      isDisable: true,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      tableData: [],
      columns: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    handleSelectChange(value) {
      console.log(value);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let fileUrl = "";
          if (values.requestType === "a") {
            fileUrl = "/files/20240920_insert_giao_dich.xlsx";
          } else if (values.requestType === "b") {
            fileUrl = "/files/20240920_doi_trang_thai (3).xlsx";
          }
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = fileUrl.split("/").pop();
          link.click();
        }
      });
    },
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
    handleReset() {
      this.form.resetFields();
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
              key: `${title}/${index}`,
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

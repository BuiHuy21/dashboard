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
                :showUploadList="false"
                :disabled="isDisableSelectFile"
              >
                <a-button type="primary" :disabled="isDisableSelectFile">
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
                @click="chekcData"
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
        <div v-if="tableData.length > 0" style="padding: 16px">
          <h3>Danh sách giao dịch</h3>
          <template v-if="hasSelected && !isListSelect">
            <p>
              Số bản ghi đã chọn: {{ selectedRowKeys.length }}/{{
                tableData.length
              }}
            </p>
          </template>
          <template v-if="isListSelect">
            <p>
              Số bản ghi đã chọn: {{ selectedRowKeys.length }}/{{
                tableData.length
              }}
            </p>
            <p>
              Số bản ghi hợp lệ: {{ selectedRowKeys.length }}/{{
                tableData.length
              }}
            </p>
            <p>
              Số bản ghi không hợp lệ:
              {{ tableData.length - selectedRowKeys.length }}/{{
                tableData.length
              }}
            </p>
            <a-col style="margin-bottom: 20px">
              <a-select
                style="width: 200px"
                placeholder="-- Chọn trạng thái --"
                @change="handleSelectChange"
              >
                <a-select-option value="d" disabled>
                  -- Tất cả --
                </a-select-option>
                <a-select-option value="a"> Giao dịch được tạo</a-select-option>
                <a-select-option value="b"> Giao dịch lỗi </a-select-option>
              </a-select>
              <a-button style="margin-left: 20px" type="primary">
                Tải xuống
              </a-button>
            </a-col>
          </template>

          <a-table
            :columns="columns"
            :data-source="tableData"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
          >
          </a-table>
        </div>
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
      visible: false,
      visibleRefuse: false,
      isDisabled: true,
      isDisableSelectFile: true,
      form: this.$form.createForm(this),
      tableData: [],
      columns: [],
      selectedRowKeys: [],
      loading: false,
      isListSelect: false,
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },

  methods: {
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
      } else {
        return true;
      }
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
              key: title,
              align: "center",
              customRender: (text) => <p style="color:green">{text}</p>,
            }));
            const sttColumnIndex = headerRow.findIndex((col) => col === "STT");

            this.tableData = rows
              .slice(headerRowIndex + 1)
              .filter((row) => Number.isInteger(Number(row[sttColumnIndex])))
              .map((row, index) => {
                const rowData = {};
                row.forEach((cell, cellIndex) => {
                  rowData[cellIndex] = cell;
                });
                rowData.id = index;
                return rowData;
              });
            this.isDisabled = false;
          })
          .catch((error) => {
            console.log("error", error);
          });
        this.selectedRowKeys = this.tableData.map((item, index) => index);
      }
    },
    chekcData() {
      setTimeout(() => {
        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          status: index % 2 === 0 ? "Giao dịch đã được tạo" : "Giao dịch Lỗi",
        }));
        const newColumns = [...this.columns];
        newColumns.splice(1, 0, {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        });
        this.columns = newColumns;
        this.isDisabled = true;
        this.isDisableSelectFile = true;
        this.selectedRowKeys = [];
        this.isListSelect = true;
      }, 1000);
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
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleReset() {
      this.form.resetFields();
      this.tableData = [];
      this.columns = [];
    },
  },
};
</script>

<style></style>

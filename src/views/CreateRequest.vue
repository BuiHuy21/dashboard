<!-- <template>
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
                @change="handleSelectChangeStatus"
              >
                <a-select-option value="d" disabled>
                  -- Tất cả --
                </a-select-option>
                <a-select-option value="h"> Giao dịch được tạo</a-select-option>
                <a-select-option value="k"> Giao dịch lỗi </a-select-option>
              </a-select>
              <a-button style="margin-left: 20px" type="primary">
                Tải xuống
              </a-button>
            </a-col>
          </template>

          <a-table
            :columns="columns"
            :data-source="tableData"
            :pagination="{ pageSize: 15 }"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
            :row-key="(record) => record.id"
          >
          </a-table>
        </div>
      </a-page-header>
    </a-collapse>
  </div>
</template>

<script>
import breadCrum from "@/components/bread-crum.vue";
import readXlsxFile from "read-excel-file";
export default {
  components: { breadCrum },
  data() {
    return {
      activeKey: ["2"],
      visible: false,
      visibleRefuse: false,
      isDisabled: true,
      isDisableSelectFile: false,
      isDisableSelectUpload: true,
      form: this.$form.createForm(this),
      tableData: [],
      columns: [],
      selectedRowKeys: [],
      fakeData: [],
      loading: false,
      isProcessing: false,
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

    handleChangeUpload(info) {
      const file = info.file.originFileObj;

      if (!file) return;

      if (this.isProcessing) return; // Ngăn gọi hàm nhiều lần
      this.isProcessing = true;

      readXlsxFile(file)
        .then((rows) => {
          const selectedValue = this.form.getFieldValue("requestType");
          let requiredConfirmationText = "";

          if (selectedValue?.includes("Insert giao dịch")) {
            requiredConfirmationText = "BIÊN BẢN XÁC NHẬN GIAO DỊCH CHÊNH LỆCH";
          } else if (selectedValue?.includes("Cập nhập trạng thái GD")) {
            requiredConfirmationText = "BIÊN BẢN XÁC NHẬN SAI LỆCH TRẠNG THÁI";
          }

          const hasRequiredText = rows?.some((row) =>
            row?.some((cell) => cell?.includes(requiredConfirmationText))
          );

          if (!hasRequiredText) {
            throw new Error("Không trùng cấu trúc với file mẫu");
          }

          const headerRowIndex = rows?.findIndex((row) => row?.includes("STT"));
          const headerRow = rows[headerRowIndex];

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

          this.columns = headerRow.map((title, index) => ({
            title: title,
            dataIndex: index,
            key: title,
            align: "center",
          }));

          this.tableData = rows
            .slice(headerRowIndex + 1)
            .filter((row) => Number(row[sttColumnIndex])) // Chỉ giữ các dòng có số trong cột STT
            .map((row) => {
              const rowData = {};
              row.forEach((cell, cellIndex) => {
                rowData[cellIndex] = cell;
              });
              rowData.id = row[sttColumnIndex];
              return rowData;
            });

          this.isDisableSelectFile = true;
          this.isProcessing = false;
          this.isDisabled = false;
          this.selectedRowKeys = this.tableData.map((item) => item.id);
        })
        .catch(() => {
          this.$notification.open({
            message: "Lỗi",
            description:
              "Dữ liệu trong file không hợp lệ,không tồn tại bản ghi, thiếu trường thông tin bắt buộc, không đúng định dạng",
          });
          this.isProcessing = false;
        });
    },
    checkData() {
      // Bổ sung cột 'Trạng thái' nếu chưa có
      const newColumns = [...this.columns];
      const statusColumnExists = newColumns.some((col) => col.key === "status");

      if (!statusColumnExists) {
        newColumns.push({
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
          align: "center",
        });
      }

      // So sánh mã tham chiếu giữa bảng upload và dữ liệu fake
      this.tableData = this.tableData.map((row) => {
        const matchedFakeData = this.fakeData.find(
          (fake) => fake.refCode === row[1] // Giả sử mã tham chiếu là cột 1
        );

        // Thêm trạng thái từ dữ liệu fake vào bảng
        return {
          ...row,
          status: matchedFakeData
            ? matchedFakeData.status
            : "Không tìm thấy mã tham chiếu",
        };
      });

      // Cập nhật lại bảng với cột mới
      this.columns = newColumns;
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
    handleSelectChangeStatus() {},
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleReset() {
      this.form.resetFields();
      this.isDisableSelectFile = false;
      this.tableData = [];
      this.columns = [];
      this.isProcessing = false;
    },
  },
};
</script>

<style></style> -->

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :span="24">
        <el-col>
          <el-input
            v-model="listQuery.keyword"
            placeholder="卡号或者姓名"
            style="width: 200px;"
            class="filter-item"
            :disabled="judgeRole()"
            clearable
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            class="filter-item"
            v-model="listQuery.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsForDate"
          ></el-date-picker>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
          <FilenameOption class="filter-item" v-model="filename" />
          <BookTypeOption class="filter-item" v-model="bookType" />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleExplore"
            :loading="downloadLoading"
          >导出</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="claim_company">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        highlight-current-row
        style="width: 100%;"
        :height="maxheight"
        :span-method="arraySpanMethod"
      >
        <el-table-column label="日期" width="180px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createdate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜品名称" width="180px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ordercount }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { fetchMealList } from "@/api/record";
import waves from "@/directive/waves"; // Waves directive
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import FilenameOption from "@/components/Excel/FilenameOption";
import BookTypeOption from "@/components/Excel/BookTypeOption";
import { config } from "./config";
import dayjs from "dayjs";
export default {
  name: "meallist",
  components: { Pagination, FilenameOption, BookTypeOption },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      u8list: [],
      u8listCopy: [],
      list: null,
      total: 0,
      listLoading: false,
      index: 0,
      listQuery: {
        keyword: "",
        date: [
          dayjs()
            .startOf("month")
            .format("YYYY-MM-DD"),
          dayjs()
            .endOf("month")
            .format("YYYY-MM-DD")
        ]
      },
      pickerOptionsForDate: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      btnIsLoading: false,
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      spanArr: []
    };
  },
  computed: {
    maxheight: function() {
      return window.innerHeight * 0.6;
    }
  },
  watch: {
    list: {
      // 监听 list 数据
      handler(val, oldVal) {
        let list = this.list; // 数据源
        let index = {};
        for (let item of list) {
          let token = item.createdate; // 标识字段
          // 没有该对象属性，说明第一次
          if (index[token] === undefined) {
            index[token] = 1;
          } else {
            index[token]++;
          }
        }
        this.index = index; // 标识
      },
      deep: true // 深度监听，数据源发生变化重新计算
    }
  },
  methods: {
    judgeRole() {
      return [...this.$store.getters.roles].shift() == "user";
    },
    getList() {
      this.spanArr = [];
      const temp = JSON.parse(JSON.stringify(this.listQuery));
      delete temp.date;
      if (this.listQuery.date == null) {
        return this.$notify({
          title: "提示",
          message: "请先指定要查询的日期!",
          type: "warning",
          duration: 2000
        });
      }
      this.listLoading = true;
      fetchMealList(
        Object.assign({}, temp, {
          begindate: this.listQuery.date[0],
          enddate: this.listQuery.date[1]
        })
      ).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data;
          if (data.length <= 0) {
            this.$notify({
              title: "提示",
              message: "没有查询到数据!",
              type: "warning",
              duration: 2000
            });
          }
        } else {
          this.$notify({
            title: "提示",
            message: "没有查询到数据!",
            type: "warning",
            duration: 2000
          });
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 0);
      });
    },
    handleFilter() {
      this.getList();
    },
    handleExplore() {
      if (this.list.length > 0) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [...config];
          const filterVal = [...config].map(m => {
            return m.prop;
          });
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader.map(m => {
              return m.title;
            }),
            data,
            filename: this.filename,
            autoWidth: true,
            bookType: this.bookType
          });
          this.downloadLoading = false;
        });
      } else {
        return this.$notify({
          title: "错误",
          message: `没有数据可以导出`,
          type: `error`,
          duration: 2000
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let cols = [0]; // 需要合并的列
      if (cols.some(index => index === columnIndex)) {
        let token = row.createdate;
        // 只针对首行做合并单元格操作
        if (this.index.hasOwnProperty(token)) {
          const rowSpan = this.groupNumber(token);
          if (columnIndex === Math.max.apply(null, cols)) {
            // 删除已经执行过合并操作的标识
            delete this.index[token];
          }
          return [rowSpan, 1];
        }
        return [0, 0];
      }
    },
    groupNumber(token) {
      if (this.index && this.index.hasOwnProperty(token)) {
        return this.index[token];
      }
    }
  },
  mounted() {
    if ([...this.$store.getters.roles].shift() == "user") {
      this.listQuery.keyword = this.$store.getters.username;
    }
  }
};
</script>
<style lang='less'>
.filter-item {
  .el-range-input,
  .el-range-separator {
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>


<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :span="24">
        <el-col>
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
      >
        <el-table-column label="序号" width="50px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
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
import { fetchFavMealList } from "@/api/record";
import waves from "@/directive/waves"; // Waves directive
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import FilenameOption from "@/components/Excel/FilenameOption";
import BookTypeOption from "@/components/Excel/BookTypeOption";
import { config } from "./config";
import dayjs from "dayjs";
export default {
  name: "favmeal",
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
      listQuery: {
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
  created() {
    this.getList();
  },
  methods: {
    getList() {
      if (this.listQuery.date == null) {
        return this.$notify({
          title: "提示",
          message: "请先指定要查询的日期!",
          type: "warning",
          duration: 2000
        });
      }
      this.spanArr = [];
      this.listLoading = true;
      fetchFavMealList(
        Object.assign(
          {},
          { begindate: this.listQuery.date[0], enddate: this.listQuery.date[1] }
        )
      ).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data;
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


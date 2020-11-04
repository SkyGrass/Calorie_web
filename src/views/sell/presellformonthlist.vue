<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          <el-input
            v-model="listQuery.searchword"
            placeholder="预订单号"
            style="width: 150px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-select
            v-model="listQuery.status"
            clearable
            placeholder="状态"
            style="width: 90px"
            class="filter-item"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
          <el-select
            v-model="listQuery.ccuscode"
            placeholder="开单客户"
            filterable
            :filter-method="filterCus"
            clearable
            class="filter-item"
            style="width: 200px"
          >
            <el-option
              v-for="item in u8list"
              v-bind:key="item.ccuscode"
              :label="item.ccusname"
              :value="item.ccuscode"
            ></el-option>
          </el-select>
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
          <el-date-picker
            class="filter-item"
            v-model="listQuery.requestdate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="到货开始日期"
            end-placeholder="到货结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsForRequestDate"
          ></el-date-picker>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <FilenameOption class="filter-item" v-model="filename"/>
          <BookTypeOption class="filter-item" v-model="bookType"/>
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

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      highlight-current-row
      :height="maxheight"
      :span-method="objectSpanMethod"
      style="width: 100%;"
    >
      <el-table-column
        label="操作"
        align="center"
        :width="specialWidth"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            v-permission="['seller','admin']"
            v-if="scope.row.FStatus === 0"
            :loading="btnIsLoading"
            @click="handleAudit(scope)"
          >审批</el-button>
          <el-button
            type="info"
            size="mini"
            v-permission="['seller','admin']"
            v-if="scope.row.FStatus === 1"
            :loading="btnIsLoading"
            @click="handleUnAudit(scope)"
          >弃审</el-button>
          <el-button
            type="danger"
            size="mini"
            v-permission="['seller','admin']"
            v-if="scope.row.FStatus === 1"
            :loading="btnIsLoading"
            @click="handleBuild(scope)"
          >生单</el-button>
          <el-button size="mini" @click="handleShow(scope.row)">查看</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDel(scope.row)"
            v-if="scope.row.FStatus===0 && judgeRole()"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="销售类型" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FSTName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预订单号" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FBillNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经销商" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTraderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开单客户" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FCusName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税率" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTaxRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="制单人" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FBillerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.FStatus | statusFilter">{{ scope.row.FStatusName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FVerifierName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核日期" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FVerifierDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="U8单号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FU8BillNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行号" width="50px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存货编码" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FInvCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存货名称" width="240px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FInvName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存货规格" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FInvStd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FComUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FQty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体积" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FVolume }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总体积" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTotalVolume }}</span>
        </template>
      </el-table-column>
      <el-table-column label="面价" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FPlanPrice }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="日期" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FPrice }}</span>
        </template>
      </el-table-column>-->
      <!-- <el-table-column label="日期" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FAmount }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="含税单价" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTaxPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税额" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTaxAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣额" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FDisAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="价税合计" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FSum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="到货日期" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FRequestDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="特价项目" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FProject}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分录备注" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FEntryRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最终无税单价" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FPrice2}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最终无税金额" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FAmount2}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最终含税单价" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FTaxPrice2}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最终价税合计" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FSum2}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  fetchU8CusListHaveBind,
  fetchU8CusListWithCode,
  fetchU8CusList
} from "@/api/u8cus";
import {
  getPreSellForMonthList,
  auditPresell,
  unAuditPresell,
  buildU8So,
  delPreSell
} from "@/api/presell";
import waves from "@/directive/waves"; // Waves directive
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import FilenameOption from "./components/FilenameOption";
import BookTypeOption from "./components/BookTypeOption";
import { config } from "./config";
export default {
  name: "preselllist",
  components: { Pagination, FilenameOption, BookTypeOption },
  directives: { waves, permission },
  filters: {
    statusFilter(status) {
      const statusMap = ["info", "success", "warning", "danger"];
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      u8list: [],
      u8listCopy: [],
      list: null,
      total: 0,
      listLoading: false,
      statusOptions: [
        {
          key: `0`,
          display_name: `未审批`
        },
        {
          key: `1`,
          display_name: `已审批`
        },
        {
          key: `2`,
          display_name: `生单`
        },
        {
          key: `3`,
          display_name: `关闭`
        }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        status: "",
        searchword: "",
        ccuscode: "",
        date: [],
        requestdate: []
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
      pickerOptionsForRequestDate: {
        shortcuts: [
          {
            text: "下一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "下一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "下三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
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
    specialWidth() {
      const role = [...this.$store.getters.roles].shift();
      const grouprole1 = ["seller", "admin", "sa"];
      return grouprole1.findIndex(f => f === role) > -1 ? "300px" : "200px";
    },
    maxheight: function() {
      return window.innerHeight * 0.6;
    }
  },
  created() {
    this.getList();
    this.getU8CusList();
  },
  methods: {
    judgeRole() {
      return (
        [...this.$store.getters.roles].shift() != "seller" &&
        [...this.$store.getters.roles].shift() != "admin"
      );
    },
    getList() {
      this.spanArr = [];
      this.listLoading = true;
      getPreSellForMonthList(
        Object.assign({}, this.listQuery, {
          role: [...this.$store.getters.roles].shift(),
          biller: this.$store.getters.username
        })
      ).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data.items;
          this.total = data.total;
        }

        let contactDot = 0;
        this.list.forEach((item, index) => {
          item.index = index;
          if (index === 0) {
            this.spanArr.push(1);
          } else {
            if (item.FID === this.list[index - 1].FID) {
              this.spanArr[contactDot] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              contactDot = index;
            }
          }
        });

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    getU8CusList() {
      const role = [...this.$store.getters.roles].shift();
      switch (role) {
        case "customer":
          fetchU8CusListWithCode({ cuscode: this.$store.getters.username })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.u8list = data.items;
                this.u8listCopy = data.items;
              }
            })
            .catch(() => {});
          break;
        case "seller":
        case "admin":
        case "sa":
          fetchU8CusList()
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.u8list = data.items;
                this.u8listCopy = data.items;
              }
            })
            .catch(() => {});
          break;
        case "trader":
          fetchU8CusListHaveBind({ trader: this.$store.getters.username })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.u8list = data.items;
                this.u8listCopy = data.items;
              }
            })
            .catch(() => {});
          break;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
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
    filterCus(value) {
      if (value) {
        this.u8list = [...this.u8listCopy].filter(
          f => f.ccuscode.indexOf(value) > -1 || f.ccusname.indexOf(value) > -1
        );
      } else {
        this.u8list = [...this.u8listCopy];
      }
    },
    handleShow(row) {
      this.$router.push({
        path: `/presellformonth`,
        query: {
          id: row.FID
        }
      });
    },
    handleUnAudit(scope) {
      const row = scope.row;
      const rowIndex = scope.$index;
      this.$confirm(`您的操作将改变此预订单的审批状态, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.btnIsLoading = true;
          unAuditPresell({
            verifier: this.$store.getters.username,
            id: row.FID
          })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.list[rowIndex].FVerifierDate = data.date;
                this.list[rowIndex].FVerifierName = data.verifier;
                this.list[rowIndex].FStatusName = data.statusname;
                this.list[rowIndex].FStatus = data.status;
              }
              this.btnIsLoading = false;
              return this.$notify({
                title: state == `success` ? "成功" : "错误",
                message: message,
                type: state,
                duration: 2000
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleAudit(scope) {
      const row = scope.row;
      const rowIndex = scope.$index;
      this.$confirm(`您的操作将改变此预订单的审批状态, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.btnIsLoading = true;
          auditPresell({ verifier: this.$store.getters.username, id: row.FID })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.list[rowIndex].FVerifierDate = data.date;
                this.list[rowIndex].FVerifierName = data.verifier;
                this.list[rowIndex].FStatusName = data.statusname;
                this.list[rowIndex].FStatus = data.status;
              }
              this.btnIsLoading = false;
              return this.$notify({
                title: state == `success` ? "成功" : "错误",
                message: message,
                type: state,
                duration: 2000
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleDel(scope) {
      const row = scope.row;
      const rowIndex = scope.$index;
      this.$confirm(`您的操作将删除此销售单, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.btnIsLoading = true;
          delPreSell({ id: row.FID })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.getList();
              }
              this.btnIsLoading = false;
              return this.$notify({
                title: state == `success` ? "成功" : "错误",
                message: message,
                type: state,
                duration: 2000
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleBuild(scope) {
      const row = scope.row;
      const rowIndex = scope.$index;
      this.$confirm(`您的操作将生成U8销售单, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.btnIsLoading = true;
          buildU8So({ id: row.FID })
            .then(response => {
              const { data, state, message } = response.data;
              if (state === `success`) {
                this.getList();
              }
              this.btnIsLoading = false;
              return this.$notify({
                title: state == `success` ? "成功" : "错误",
                message: message,
                type: state,
                duration: 2000
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 13) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
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


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
    <el-row :span="24">
      <el-col :span="5">
        <div class="claim_company">
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            border
            highlight-current-row
            clearable
            style="width: 100%;"
            :height="maxheight"
          >
            <el-table-column label="日期" width="120px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createdate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="早餐" width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.breakfast }}</span>
              </template>
            </el-table-column>
            <el-table-column label="中餐" width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.lunch }}</span>
              </template>
            </el-table-column>
            <el-table-column label="晚餐" width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.dinner }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="19" :style="{height:maxheight+'px'}">
        <div id="calore_chart" :style="{height:maxheight+'px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchRecord } from "@/api/record";
import waves from "@/directive/waves"; // Waves directive
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import FilenameOption from "@/components/Excel/FilenameOption";
import BookTypeOption from "@/components/Excel/BookTypeOption";
import { config } from "./config";
import dayjs from "dayjs";
//import calcjs from "calcjs";
import * as math from "mathjs";
import echarts from "echarts";
export default {
  name: "calorie",
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
      spanArr: [],
      meals: [
        { label: "早餐", value: "1" },
        { label: "中餐", value: "2" },
        { label: "晚餐", value: "3" }
      ],
      option: {
        title: {
          text: "卡路里曲线表",
          left: "center",
          align: "right"
        },
        color: ["#5CACEE", "#EE9A00", "#BDBDBD"],
        legend: {
          left: "center",
          top: "bottom",
          data: ["早餐", "中餐", "晚餐"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {},
          formatter: params => {
            const { name } = params[0]; /**date */
            let temp = this.tipsData.filter(f => f.label == name)[0].value;
            let tips_breakfast = "";
            let tips_lunch = "";
            let tips_dinner = "";
            temp.forEach(meal => {
              let breakfast = "";
              let lunch = "";
              let dinner = "";
              if (meal.meal == "早餐") {
                meal.list.forEach(every => {
                  breakfast += `菜名:${every.name},卡路里:${every.calorie}<br/>`;
                });
                tips_breakfast = `${meal.meal}:<br/>${
                  breakfast.length > 0 ? breakfast : "无"
                }`;
              } else if (meal.meal == "中餐") {
                meal.list.forEach(every => {
                  lunch += `菜名:${every.name},卡路里:${every.calorie}<br/>`;
                });
                tips_lunch = `${meal.meal}:<br/>${
                  lunch.length > 0 ? lunch : "无"
                }`;
              } else if (meal.meal == "晚餐") {
                meal.list.forEach(every => {
                  dinner += `菜名:${every.name},卡路里:${every.calorie}<br/>`;
                });
                tips_dinner = `${meal.meal}:<br/>${
                  dinner.length > 0 ? dinner : "无"
                }`;
              }
            });
            return (
              `${tips_breakfast}<br/>` + `${tips_lunch}<br/>` + `${tips_dinner}`
            );
          }
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      },
      tipsData: []
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
      fetchRecord(
        Object.assign({}, temp, {
          begindate: this.listQuery.date[0],
          enddate: this.listQuery.date[1]
        })
      ).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          //this.list = data;
          console.log(data);
          this.buildShowData(data);
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
    buildShowData(data) {
      /**get date */
      let _dateArr = data.map(m => m.createdate);
      _dateArr = Array.from(new Set(_dateArr));
      let _tipsData = [];
      let _showData = [];
      _dateArr.forEach(date => {
        let temp = { createdate: date };
        let tips_temp = { label: date, value: [] };
        let _rs = data.filter(f => f.createdate == date);
        this.meals.forEach(meal => {
          let chart_temp = { type: "line", name: "", data: [] };
          let sum = 0;
          let _r = _rs.filter(f => f.meal == meal.value);

          _r.forEach(m => {
            sum = math.add(sum, m.calorie);
          });

          tips_temp.value.push({
            meal: meal.label,
            list: _r.map(s => {
              return {
                name: s.name,
                calorie: s.calorie
              };
            })
          });

          if (meal.value == 1) {
            temp.breakfast = sum;
          } else if (meal.value == 2) {
            temp.lunch = sum;
          } else if (meal.value == 3) {
            temp.dinner = sum;
          }
        });

        _showData.push(temp);
        _tipsData.push(tips_temp);
      });

      this.list = _showData;
      this.tipsData = _tipsData;

      this.buildChart(_dateArr, [
        {
          name: "早餐",
          type: "line",
          data: _showData.map(s => {
            return s.breakfast;
          })
        },
        {
          name: "中餐",
          type: "line",
          data: _showData.map(s => {
            return s.lunch;
          })
        },
        {
          name: "晚餐",
          type: "line",
          data: _showData.map(s => {
            return s.dinner;
          })
        }
      ]);
    },
    buildChart(xAxis_data, series_data) {
      this.option.xAxis[0].data = xAxis_data;

      this.option.series = series_data;
      let myChart = echarts.init(document.getElementById("calore_chart"));
      myChart.setOption(this.option);
      window.addEventListener("resize", function() {
        this.myChart.resize();
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

#calore_chart {
  width: 100%;
  border: 1px solid #e6e6e6;
  margin: 0 auto;
}
</style>


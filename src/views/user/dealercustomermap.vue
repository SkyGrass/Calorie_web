<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.searchword"
        placeholder="昵称/用户名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.isclosed"
        placeholder="状态"
        clearable
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
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="昵称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否停用" width="80px" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isclosed"/>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="handlerShowCus(scope.row)">绑定</el-button>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item label="是否停用">
          <el-checkbox v-model="temp.isclosed"/>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.remark"
            type="textarea"
            placeholder="请简述备注信息"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormCus" title="选取U8客户">
      <div class="filter-container">
        <el-input
          v-model="u8cuslistQuery.searchword"
          placeholder="U8客户编码/客户名称"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleU8Filter"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleU8Filter"
        >搜索</el-button>
      </div>
      <tree-transfer
        :title="title"
        :from_data="data"
        :to_data="toData"
        :default-props="{label:'ccusname'}"
        :mode="mode"
        node_key="ccuscode"
        pid="parentId"
        height="540px"
        open-all
        default-transfer
        @addBtn="add"
        @removeBtn="remove"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCus = false">取消</el-button>
        <el-button type="primary" @click="handlerCus()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchTraderList,
  fetchCustomerList,
  createUser,
  updateUser,
  delUser
} from "@/api/user";
import {
  fetchU8CusListForBind,
  fetchU8CusListHaveBind,
  saveTraderBindCus
} from "@/api/u8cus";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import treeTransfer from "el-tree-transfer";
export default {
  name: "ComplexTable",
  components: { Pagination, treeTransfer },
  directives: { waves },
  data() {
    return {
      mode: "transfer",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        isclosed: undefined,
        searchword: undefined
      },
      u8cuslistQuery: {
        page: 1,
        limit: 20,
        trader: undefined,
        searchword: undefined
      },
      statusOptions: [
        {
          key: `true`,
          display_name: `停用`
        },
        {
          key: `false`,
          display_name: `启用`
        }
      ],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      dialogFormCus: false,
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      title: ["尚未绑定的客户", "已选取客户"],
      data: [],
      toData: [],
      tempData: [],
      currentRow: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchTraderList(this.listQuery).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data.items;
          this.total = data.total;
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.userId = parseInt(Math.random() * 100) + 1024; // mock a id
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.userId === this.temp.userId) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: `${row.isclosed ? "启用" : "停用"}成功`,
        type: "success",
        duration: 2000
      });
      row.isclosed = !row.isclosed;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    handlerShowCus(row) {
      this.dialogFormCus = true;
      this.currentRow = Object.assign({}, row);
      this.getU8CusList(this.currentRow);
    },
    getU8CusList(row) {
      this.u8cuslistLoading = true;
      fetchU8CusListForBind(this.u8cuslistQuery).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.data = data.items.map(m => {
            let t = m;
            m.ccusname = `(${m.ccuscode})${m.ccusname}`;
            return m;
          });
        }

        // Just to simulate the time of the request
        setTimeout(() => {
          this.u8cuslistLoading = false;
        }, 1.5 * 1000);
      });
      const { username } = row;
      this.currentTrader = username;
      fetchU8CusListHaveBind({ trader: username }).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.toData = data.items.map(m => {
            let t = m;
            m.ccusname = `(${m.ccuscode})${m.ccusname}`;
            return m;
          });
        }
      });
    },
    handleU8Filter() {
      this.u8cuslistQuery.page = 1;
      this.getU8CusList(this.currentRow);
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      this.tempData = toData;
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      this.tempData = toData;
    },
    handlerCus() {
      //saveTraderBindCus
      let temp = [...this.tempData];
      const title =
        temp.length <= 0
          ? `此操作将清空此经销商全部的绑定客户,是否继续?`
          : `此操作将绑定此经销商和客户,是否继续?`;
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          saveTraderBindCus({
            trader: this.currentRow.username,
            list: temp.map(m => {
              var t = {};
              t.trader = this.currentTrader;
              t.customer = m.ccuscode;
              return t;
            })
          })
            .then(response => {
              const { data, state, message } = response.data;
              this.dialogFormCus = false;
              this.$notify({
                title: state === `success` ? "成功" : "失败",
                message: message,
                type: state,
                duration: 2000
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>

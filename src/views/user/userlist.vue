<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.searchword"
        placeholder="卡号/用户名"
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
      <el-select
        v-model="listQuery.role"
        placeholder="角色"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
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
      <el-table-column label="卡号" width="150px" align="center">
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
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否停用" width="80px" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isclosed" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="400px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="info"
            size="mini"
            v-permission="['admin']"
            @click="handleResetPwd(scope.row)"
          >重置密码</el-button>
          <el-button type="warning" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            :type="scope.row.isclosed?'success':'danger'"
            size="mini"
            @click="handleDelete(scope.row)"
          >{{ scope.row.isclosed?'启用':'停用' }}</el-button>
          <el-button type="danger" size="mini" @click="handleRemove(scope.row)">删除</el-button>
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
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="角色" prop="role">
          <el-select v-model="temp.role" class="filter-item" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.key"
              :label="item.display_name+'('+item.key+')'"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="卡号" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" :disabled="canEdit()" />
        </el-form-item>
        <el-form-item label="是否停用">
          <el-checkbox v-model="temp.isclosed" />
        </el-form-item>
        <el-form-item v-if="temp.role === 'customer'" label="U8客户编码" prop="cuscode">
          <el-input v-model="temp.cuscode" clearable placeholder="选取要绑定的U8客户">
            <el-button slot="append" icon="el-icon-search" @click="handlerCus()"></el-button>
          </el-input>
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

    <el-dialog :visible.sync="dialogCusVisible" title="选取U8客户">
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
      <el-table
        :data="u8list"
        v-loading="u8cuslistLoading"
        border
        fit
        highlight-current-row
        max-height="250"
        style="width: 100%"
      >
        <el-table-column prop="ccuscode" label="U8客户编码" />
        <el-table-column prop="ccusname" label="U8客户名称" />
        <el-table-column
          label="操作"
          align="center"
          width="120px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleConfirm(scope.row)">选取</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="u8total>0"
        :total="u8total"
        :page.sync="u8cuslistQuery.page"
        :limit.sync="u8cuslistQuery.limit"
        @pagination="getU8CusList"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCusVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createUser,
  updateUser,
  reSetUserPwd,
  delUser,
  removeUser,
  syncUser
} from "@/api/user";
import { fetchU8CusListForCanBind } from "@/api/u8cus";
import { fetchRoleForSelect } from "@/api/role";
import waves from "@/directive/waves"; // Waves directive
import permission from "@/directive/permission/index.js"; // 权限判断指令
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      u8list: null,
      total: 0,
      u8total: 0,
      listLoading: true,
      u8cuslistLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        isclosed: undefined,
        searchword: undefined,
        role: undefined
      },
      u8cuslistQuery: {
        page: 1,
        limit: 20,
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
      roleOptions: [],
      temp: {
        roleId: "",
        rolename: "",
        rolecode: "",
        roledescription: "",
        isclosed: false,
        isbuildin: false
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rules: {
        role: [
          { required: true, message: "角色为必输项目", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称为必输项目", trigger: "blur" }],
        username: [
          { required: true, message: "用户名为必输项目", trigger: "blur" }
        ],
        cuscode: [
          { required: true, message: "U8客户编码为必输项目", trigger: "change" }
        ]
      },
      dialogCusVisible: false
    };
  },
  created() {
    this.getList();
    this.getRoleForSelect();
    this.syncUserFromSN();
  },
  methods: {
    canEdit() {
      return this.dialogStatus === `update`;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data.items;
          this.total = data.total;
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 0);
      });
    },
    getU8CusList() {
      this.u8cuslistLoading = true;
      fetchU8CusListForCanBind(this.u8cuslistQuery).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.u8list = data.items;
          this.u8total = data.total;
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.u8cuslistLoading = false;
        }, 1.5 * 0);
      });
    },
    getRoleForSelect() {
      fetchRoleForSelect().then(response => {
        const { state, data, message } = response.data;
        this.roleOptions = data;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleU8Filter() {
      this.u8cuslistQuery.page = 1;
      this.getU8CusList();
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
      this.temp = {};
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          // this.temp.userId = parseInt(Math.random() * 100) + 1024; // mock a id
          const form = Object.assign({}, this.temp);
          createUser(form).then(response => {
            const { data, state, message } = response.data;
            if (state === `success`) {
              this.list.unshift(data);
              this.total += 1;
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: state === `success` ? "成功" : "失败",
              message: message,
              type: state,
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
    handleRemove(row) {
      this.$confirm(`此操作将删除此用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { userId } = row;
          removeUser({ userId }).then(response => {
            const { state, message } = response.data;
            if (state === `success`) {
              for (const v of this.list) {
                if (v.userId === userId) {
                  const index = this.list.indexOf(v);
                  this.list.splice(index, 1);
                  this.total = this.total - 1;
                  break;
                }
              }
            }
            this.$notify({
              title: state === `success` ? "成功" : "失败",
              message: message,
              type: state,
              duration: 2000
            });
          });
        })
        .catch(() => {});
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(response => {
            const { state, message } = response.data;
            if (state === `success`) {
              for (const v of this.list) {
                if (v.userId === this.temp.userId) {
                  const index = this.list.indexOf(v);
                  if (this.temp.role != "customer") this.temp.cuscode = "";
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
            } else {
              this.$notify({
                title: "失败",
                message: message,
                type: "error",
                duration: 2000
              });
            }
          });
        }
      });
    },
    handleDelete(row) {
      const title = row.isclosed ? "启用" : "停用";
      this.$confirm(`此操作将${title}此用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { userId } = row;
          delUser({ userId }).then(response => {
            const { state, message } = response.data;
            this.$notify({
              title: state === `success` ? "成功" : "失败",
              message: `${title}成功`,
              type: state,
              duration: 2000
            });
            row.isclosed = state === `success` && !row.isclosed;
          });
        })
        .catch(() => {});
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
    handlerCus() {
      this.dialogCusVisible = !this.dialogCusVisible;
      this.getU8CusList();
    },
    handleConfirm(row) {
      this.dialogCusVisible = !this.dialogCusVisible;
      this.temp.cuscode = row.ccuscode;
    },
    handleResetPwd(row) {
      this.$confirm(`此操作将重置此用户的登录密码为123456, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { userId } = row;
          reSetUserPwd({ userId })
            .then(response => {
              const { state, message } = response.data;
              if (state === `success`) {
                this.$message({
                  type: "success",
                  message: "重置成功，请尽快通知用户!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "重置失败!"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "重置失败!"
              });
            });
        })
        .catch(() => {});
    },
    syncUserFromSN(){
      syncUser();
    }
  }
};
</script>

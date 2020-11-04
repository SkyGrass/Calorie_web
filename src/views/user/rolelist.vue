<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="角色编码" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rolecode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否停用" width="80px" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isclosed"/>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="210px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roledescription }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="350px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- <el-button size="mini" plain @click="handleCreate()">新增</el-button> -->
          <el-button type="warning" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            :type="scope.row.isclosed?'success':'danger'"
            size="mini"
            @click="handleDelete(scope.row)"
          >{{ scope.row.isclosed?'启用':'停用' }}</el-button>
          <!-- <el-button size="mini" type="info" plain @click="handleMenu(scope.row)">菜单</el-button> -->
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

    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="角色编码" prop="rolecode">
          <el-input
            v-model="temp.rolecode"
            :readonly="dialogStatus=='update'"
            :disabled="dialogStatus=='update'"
          />
        </el-form-item>
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="temp.rolename"/>
        </el-form-item>
        <el-form-item label="是否停用" prop="isclosed">
          <el-checkbox v-model="temp.isclosed"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledescription">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="temp.roledescription"
            type="textarea"
            placeholder="请简述此角色的作用"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createRole, updateRole, delRole } from "@/api/role";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import treeToArray from "./customEval";
import treeTransfer from "el-tree-transfer";
import { getAllMenu } from "@/api/menu";

export default {
  name: "ComplexTable",
  components: { Pagination, treeTransfer },
  data() {
    return {
      mode: "transfer",
      tableKey: 0,
      func: treeToArray,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        roleId: ``,
        rolecode: ``,
        rolename: ``,
        isclosed: false,
        roledescription: ``
      },
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      dialogFormVisible: false,
      rules: {
        rolecode: [
          { required: true, message: "角色编码不可为空", trigger: "blur" }
        ],
        rolename: [
          { required: true, message: "角色名称不可为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      return fetchList().then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.list = data.items;
          this.total = data.total;
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 0);
      });
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
          const form = Object.assign({}, this.temp);
          createRole(form).then(response => {
            const { state, message, data } = response.data;
            if (state === `success`) {
              this.list.unshift(data);
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
      this.dialogFormVisible = true;
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
          const tempData = Object.assign({}, this.temp);
          updateRole(tempData).then(response => {
            const { state, message } = response.data;
            if (state === `success`) {
              for (const v of this.list) {
                if (v.roleId === this.temp.roleId) {
                  const index = this.list.indexOf(v);
                  this.list.splice(index, 1, this.temp);
                  break;
                }
              }
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
    handleDelete(row) {
      const title = row.isclosed ? "启用" : "停用";
      this.$confirm(`此操作将${title}此角色, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const { roleId } = row;
          delRole({ roleId }).then(response => {
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
    }
  }
};
</script>

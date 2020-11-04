<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.searchword"
        placeholder="名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >新增</el-button>
    </div>

    <tree-table :data="data" :columns="columns" :eval-func="func" :expand-all="expandAll" border>
      <el-table-column label="模块" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重定向地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.redirect }}</span>
        </template>
      </el-table-column>
      <el-table-column label="侧边栏显示" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.hidden"/>
        </template>
      </el-table-column>
      <el-table-column label="子菜单保持" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.alwaysShow"/>
        </template>
      </el-table-column>
      <el-table-column label="停用" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isclosed"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item label="模块" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="temp.path"/>
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="temp.component"/>
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirect">
          <el-input v-model="temp.redirect"/>
        </el-form-item>
        <el-form-item label="侧边栏显示" prop="hidden">
          <el-checkbox v-model="temp.hidden"/>
        </el-form-item>
        <el-form-item label="子菜单保持" prop="alwaysShow">
          <el-checkbox v-model="temp.alwaysShow"/>
        </el-form-item>
        <el-form-item label="是否停用" prop="isclosed">
          <el-checkbox v-model="temp.isclosed"/>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="meta.title"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="meta.icon"/>
        </el-form-item>
        <el-form-item label="禁止缓存" prop="noCache">
          <el-checkbox v-model="meta.noCache"/>
        </el-form-item>
        <el-form-item label="面包屑显示" prop="breadcrumb">
          <el-checkbox v-model="meta.breadcrumb"/>
        </el-form-item>
        <el-form-item label="允许角色" prop="roles">
          <el-checkbox-group v-model="meta.roles">
            <el-checkbox v-for="item in roles" :key="item.roleId" :label="item.rolecode"/>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="指定父级" prop="parentId">
          <ELTreeSelect
            ref="treeSelect"
            :styles="styles"
            v-model="temp.parentId"
            :select-params="selectParams"
            :tree-params="treeParams"
            @node-click="_nodeClickFun"
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
/**
   Auth: Lei.j1ang
   Created: 2018/1/19-14:54
   */
import treeTable from "@/components/TreeTable";
import treeToArray from "./customEval";

import ELTreeSelect from "el-tree-select";
import waves from "@/directive/waves"; // Waves directive
import { getAllMenu } from "@/api/menu";
import { fetchList } from "@/api/role";
export default {
  name: "CustomTreeTableDemo",
  components: { treeTable, ELTreeSelect },
  directives: { waves },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      rowclass: "rowclass",
      columns: [
        {
          text: "",
          value: "meta.title",
          width: 50,
          align: "center"
        },
        {
          text: "排序",
          value: "sort",
          width: 50,
          align: "center"
        }
      ],
      temp: {},
      meta: {},
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
      },
      data: [],
      listQuery: {
        searchword: undefined
      },
      roles: [],
      styles: {
        width: "300px"
      },
      test: "",
      selectParams: {
        clearable: true,
        placeholder: "根节点"
      },
      treeParams: {
        "default-expand-all": true,
        filterable: false,
        "check-strictly": true,
        "render-content": this._renderFun,
        data: [],
        props: {
          children: "children",
          label: "title",
          value: "menuId"
        }
      }
    };
  },
  created() {
    this.getMenus();
    this.getAllRole();
  },
  methods: {
    getMenus() {
      return getAllMenu().then(response => {
        this.data = response.data;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.temp = Object.assign({}, row); // copy obj
      this.meta = Object.assign({}, row.meta);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        // this.treeParams.data = ;
        this.$refs.treeSelect.treeDataUpdateFun(
          this.filterCanUseRouter(this.temp)
        );
        console.log(this.treeParams.data);
      });
    },
    getAllRole() {
      return fetchList().then(response => {
        this.roles = response.data.items;
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp, this.meta);
          tempData.meta = { ...this.meta };
          console.log(tempData);
          // updateRole(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.roleId === this.temp.roleId) {
          //       const index = this.list.indexOf(v);
          //       this.list.splice(index, 1, this.temp);
          //       break;
          //     }
          //   }
          //   this.dialogFormVisible = false;
          //   this.$notify({
          //     title: "成功",
          //     message: "更新成功",
          //     type: "success",
          //     duration: 2000
          //   });
          // });
        }
      });
    },
    filterCanUseRouter(menu) {
      return this.data.filter(
        f => f.menuId != menu.menuId && f.parentId != menu.menuId
      );
    },
    // 树点击
    _nodeClickFun(data, node, vm) {
      console.log(this.temp.parentId, data);
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
        </span>
      );
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          // updateRole(tempData).then(() => {
          for (const v of this.data) {
            if (v.menuId === tempData.menuId) {
              const index = this.data.indexOf(v);
              this.data.splice(index, 1, tempData);
              break;
            }
          }
          // });
          console.log(this.data);
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style>
.rowclass {
  text-align: center;
}
</style>

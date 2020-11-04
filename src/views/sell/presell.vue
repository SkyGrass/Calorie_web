<template>
  <div class="app-container">
    <el-form
      inline
      :model="orderForm"
      :rules="rules"
      ref="orderForm"
      label-width="80px"
      class="demo-orderForm"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="单号" prop="FBillNo" required>
            <el-input class="fixitem" v-model="orderForm.FBillNo" disabled></el-input>
            <span v-if="haveDel" style="color:red;font-size:18px">此订单已删除!</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日期" prop="FDate" required>
            <el-date-picker
              class="fixitem"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="orderForm.FDate"
              type="date"
              placeholder="选择日期"
              :disabled="canEdit"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="judgeRole()">
          <el-form-item label="经销商" prop="FDealerName">
            <el-input class="fixitem" v-model="orderForm.FDealerName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开单客户" prop="FCusName" required>
            <el-select
              class="fixitem"
              v-model="orderForm.FCusName"
              placeholder="请选择开单客户"
              :clearable="clearable"
              filterable
              :filter-method="filterU8"
              :disabled="canEdit"
              @change="changeCus"
            >
              <el-option
                v-for="item in u8List"
                v-bind:key="item.ccuscode"
                :label="item.ccusname"
                :value="item.ccuscode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="销售类型" prop="FSTCode" required>
            <el-select
              class="fixitem"
              v-model="orderForm.FSTCode"
              placeholder="请选择销售类型"
              :disabled="canEdit"
            >
              <el-option
                v-for="item in u8StList"
                v-bind:key="item.cstcode"
                :label="item.cstname"
                :value="item.cstcode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税率" required prpp="FTaxRate">
            <el-input-number
              class="fixitem"
              v-model="orderForm.FTaxRate"
              :step="1"
              :min="0"
              :max="100"
              :disabled="canEdit"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制单人" prop="FBillerName">
            <el-input class="fixitem" v-model="orderForm.FBillerName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="FStatus">
            <el-select class="fixitem" v-model="orderForm.FStatus" disabled>
              <el-option label="未审批" value="0"></el-option>
              <el-option label="审批" value="1"></el-option>
              <el-option label="生单" value="2"></el-option>
              <el-option label="关闭" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="orderForm.FStatus !=='0'">
        <el-col :span="6">
          <el-form-item label="审核人" prop="FVerifier">
            <el-input class="fixitem" v-model="orderForm.FVerifier" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核日期" prop="FVerifyDate">
            <el-date-picker
              class="fixitem"
              disabled
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="orderForm.FVerifyDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="U8单号" prop="FU8BillNo">
            <el-input disabled class="fixitem" v-model="orderForm.FU8BillNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- <el-form-item label="备注" prop="Fremark" label-width="0"> -->
          <el-input
            placeholder="请输入预订单的备注"
            style="width:81vw"
            type="textarea"
            :disabled="canEdit"
            v-model="orderForm.Fremark"
          ></el-input>
          <!-- </el-form-item> -->
        </el-col>
      </el-row>
    </el-form>

    <el-button-group style="margin-top:20px" v-permission="['customer','trader','admin']">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addRow"
        v-if="this.formStatus !== `look`"
      >增行</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        @click="clearRow"
        v-if="this.formStatus !== `look`"
      >清空行</el-button>
      <el-button
        icon="el-icon-edit"
        @click="editForm"
        v-if="this.formStatus === `look` && !haveDel"
        :disabled="haveAudit()"
      >编辑订单</el-button>
      <el-button
        type="danger"
        icon="el-icon-edit"
        @click="delForm"
        v-if="this.formStatus === `look`&& !haveAudit() && !haveDel"
      >删除订单</el-button>
      <el-button
        type="warning"
        icon="el-icon-check"
        @click="saveForm"
        v-if="this.formStatus !== `look`"
      >保存订单</el-button>
    </el-button-group>
    <el-button-group style="margin-top:20px" v-permission="['seller','admin']">
      <el-button
        type="danger"
        icon="el-icon-circle-check-outline"
        @click="AuditForm"
        v-if="orderForm.FStatus==='0' && this.formStatus =='look'"
        :loading="btnIsLoading"
      >审批</el-button>
      <el-button
        type="info"
        icon="el-icon-circle-close-outline"
        @click="UnAuditForm"
        v-if="orderForm.FStatus ==='1'"
        :loading="btnIsLoading"
      >弃审</el-button>
      <el-button
        type="danger"
        icon="el-icon-circle-check-outline"
        @click="BuildSo"
        v-if="orderForm.FStatus ==='1'"
        :loading="btnIsLoading"
      >生单</el-button>
    </el-button-group>
    <el-button-group style="margin-top:20px" v-permission="['customer','trader','admin']">
      <el-button
        type="primary"
        icon="el-icon-circle-check-outline"
        @click="PreviewBill"
        :loading="btnIsLoading"
      >预览</el-button>
    </el-button-group>
    <el-button-group style="margin-top:20px">
      <el-popover
        placement="top-start"
        title="友情提醒"
        width="400"
        trigger="hover"
        content="根据结算关系是两方还是三方，下单时需分两种情况：
          一、如是两方关系，即付款、开票客户均为经销商，则经销商、开票客户两个信息栏统一填写经销商名称。
          二、如是三方关系，有经销商作为服务商，则经销商选项那栏填写服务商单位名称，开票客户那栏填写建设单位名称，即最终开票单位。"
      >
        <el-button slot="reference">友情提醒</el-button>
      </el-popover>
    </el-button-group>
    <div class="claim_company">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        style="margin-top:10px"
        :max-height="maxheight"
        @header-click="headerclick"
        :show-summary="showsummary"
        :summary-method="getSummary"
      >
        <el-table-column align="center" label="行号" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.FNo }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              style="width:40px"
              icon="el-icon-delete"
              :disabled="canEdit"
              @click="delRow(scope.$index)"
            ></el-button>
            <el-button
              v-if="scope.row.edit"
              type="success"
              size="mini"
              style="width:40px"
              icon="el-icon-circle-check-outline"
              :disabled="canEdit"
              @click="confirmEdit(scope.row)"
            ></el-button>
            <el-button
              v-else
              type="primary"
              size="mini"
              style="width:40px"
              icon="el-icon-edit"
              :disabled="canEdit"
              @click="scope.row.edit=!scope.row.edit"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="存货编码" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input
                size="mini"
                placeholder="输入存货编码/名称 回车检索"
                v-model="scope.row.FInvCode"
                class="input-with-select"
                @focus="changeCurrentRow(scope.$index)"
                @change="transSearch"
                @keyup.enter.native="onSearch(scope)"
              >
                <el-button slot="append" icon="el-icon-search" @click="showInvList(scope)"></el-button>
              </el-input>
            </template>
            <span v-else>{{ scope.row.FInvCode }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="存货名称" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.FInvName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="存货规格" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.FInvStd }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="单位" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.FInvUnitName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="数量" width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input-number
                size="mini"
                v-model="scope.row.FQty"
                @change="handleChange($event ,scope.$index)"
                :min="0.1"
                :max="10000"
                :step="0.1"
              ></el-input-number>
            </template>
            <span v-else>{{ scope.row.FQty }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="体积" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FVolume }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="总体积" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FTotalVolume }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="面价" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FPlanPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="含税单价" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FTaxPrice }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="无税单价" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.FPrice }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="无税金额" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.FAmount }}</span>
        </template>
        </el-table-column>-->
        <el-table-column align="center" label="税率" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.FTaxRate }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="税额" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.FTaxAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="折扣额" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FDisAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="价税合计" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.FSum }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="到货日期(点击复制)" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-date-picker
                size="mini"
                style="width:80%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="scope.row.FRequestDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptionsStartForRequest"
              ></el-date-picker>
            </template>
            <span v-else>{{ scope.row.FRequestDate.split(' ')[0].replace(/\//g,'-') }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="特价项目(点击复制)" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input type="text" size="mini" placeholder="请输入" v-model="scope.row.FProject"/>
            </template>
            <span v-else>{{ scope.row.FProject }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="分录备注" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input type="text" size="mini" placeholder="请输入" v-model="scope.row.FEntryRemark"/>
            </template>
            <span v-else>{{ scope.row.FEntryRemark }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终无税单价" width="120" v-if="formStatus==='look'">
          <template slot-scope="scope">
            <span>{{ scope.row.FPrice2 }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终无税金额" width="120" v-if="formStatus==='look'">
          <template slot-scope="scope">
            <span>{{ scope.row.FAmount2 }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终含税单价" width="120" v-if="formStatus==='look'">
          <template slot-scope="scope">
            <span>{{ scope.row.FTaxPrice2 }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最终价税合计" width="120" v-if="formStatus==='look'">
          <template slot-scope="scope">
            <span>{{ scope.row.FSum2 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogInvVisible" title="存货列表" v-el-drag-dialog width="60%">
      <div class="filter-container">
        <el-input
          v-model="listQuery.searchword"
          placeholder="存货编码/存货名称"
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
      </div>
      <el-table
        tooltip-effect="dark"
        v-loading="invListLoading"
        :key="tableKey"
        :data="invList"
        border
        fit
        highlight-current-row
        show-overflow-tooltip
        max-height="150"
        style="width: 100%;"
      >
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-circle-check-outline"
              @click="confirm([scope.row])"
            >选取</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="存货编码" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cinvcode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="存货名称" width="250px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cinvname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cinvstd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位" width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ccomunitname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="体积" width="70px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ivolume }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最小订单量" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fminquantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="面价" width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.iuprice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="含税单价" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.iinvnowcost }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="invTotal>0"
        :total="invTotal"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getInvList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInvVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="confirm()">确认</el-button> -->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogPreviewVisible" title="订单预览" v-el-drag-dialog width="95%">
      <div class="filter-container" style="display:flex;font-size:16px">
        <legend>
          <fieldset>
            <legend>单据信息</legend>
            <table>
              <tr v-for="(value, key,index) in orderFormPre" v-bind:key="index">
                <td>{{key}}:{{value}}</td>
              </tr>
            </table>
          </fieldset>
        </legend>
        <div style="display:flex;flex-direction:column">
          <legend>
            <fieldset>
              <legend>列表信息</legend>
              <table style="border-collapse:collapse;border:1px solid black;text-align:center">
                <thead>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">行号</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">存货编码</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">存货名称</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">存货规格</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">单位</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">数量</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">体积</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">总体积</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">面价</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">含税单价</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">税率</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">税额</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">折扣额</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">价税合计</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">到货日期</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">特价项目</th>
                  <th style="border-collapse:collapse;border:1px solid black;text-align:center">分录备注</th>
                  <th
                    style="border-collapse:collapse;border:1px solid black;text-align:center"
                  >最终无税单价</th>
                  <th
                    style="border-collapse:collapse;border:1px solid black;text-align:center"
                  >最终无税金额</th>
                  <th
                    style="border-collapse:collapse;border:1px solid black;text-align:center"
                  >最终含税单价</th>
                  <th
                    style="border-collapse:collapse;border:1px solid black;text-align:center"
                  >最终含税合计</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in listPre"
                    v-bind:key="index"
                    style="border:1px solid black;"
                  >
                    <td
                      style="border:1px solid black;"
                      v-for="(value,key) in item"
                      v-bind:key="key"
                    >{{value}}</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </legend>
          <!-- <legend>
            <fieldset>
              <legend>合计信息</legend>
              <table>
                <tr v-for="(value, key,index) in summary" v-bind:key="index">
                  <td class="pre">{{key}}:{{value}}</td>
                </tr>
              </table>
            </fieldset>
          </legend>-->
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPreviewVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="confirm()">确认</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchU8CusListHaveBind,
  fetchU8CusListWithCode,
  fetchU8CusList
} from "@/api/u8cus";
import { fetchU8StList } from "@/api/u8st";
import { fetchInvList, fetchCusInvList } from "@/api/inv";
import {
  getPreSellBillNo,
  savePreSell,
  getPreSellInfo,
  buildU8So,
  delPreSell,
  auditPresell,
  unAuditPresell,
  GetPreviewData
} from "@/api/presell";
import waves from "@/directive/waves"; // Waves directive  sadsas
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import permission from "@/directive/permission/index.js"; // 权限判断指令
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import { Calc } from "calc-js";
import { getFirstTime } from "@/utils";
export default {
  name: `presell`,
  components: { Pagination },
  directives: { waves, elDragDialog, permission },
  data() {
    return {
      tableKey: 0,
      formStatus: `add`,
      canEdit: true,
      orderForm: {
        FID: "",
        FType: "",
        FBillNo: "",
        FDate: undefined,
        FSTCode: "",
        FCustCode: "",
        FCusName: "",
        FDealerCode: "",
        FDealerName: "",
        FTaxRate: 13,
        FBiller: "",
        FBillerName: "",
        FVerifier: "",
        FVerifyDate: "",
        Fremark: "",
        FU8BillNo: "",
        FStatus: "0"
      },
      entryForm: {
        edit: true,
        FEntryID: 0,
        FID: 0,
        FNo: "1",
        FInvCode: "",
        FInvName: "",
        FInvStd: "",
        FInvUnitCode: "",
        FInvUnitName: "",
        FQty: 0,
        FPlanPrice: 0.0,
        FTaxPrice: 0.0,
        FPrice: 0.0,
        FAmount: 0.0,
        FTaxRate: 13,
        FDisAmount: 0.0,
        FSum: 0.0,
        FRequestDate: "",
        FProject: "",
        FEntryRemark: "",
        FRowState: "",
        FPrice2: 0.0,
        FAmount2: 0.0,
        FTaxPrice2: 0.0,
        FSum2: 0.0,
        FVolume: 0,
        FTotalVolume: 0
      },
      rules: {
        FBillNo: [
          { required: true, message: "单号不可无空!", trigger: "change" }
        ],
        FCusName: [
          { required: true, message: "开单客户不可无空!", trigger: "change" }
        ],
        FSTCode: [
          { required: true, message: "销售类型不可无空!", trigger: "change" }
        ]
      },
      list: [],
      u8List: [],
      u8ListCopy: [],
      u8StList: [],
      invList: [],
      invTotal: 0,
      listLoading: true,
      invListLoading: true,
      dialogInvVisible: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchword: undefined,
        ccuscode: undefined
      },
      multipleSelection: [],
      currentRole: "customer",
      currentDate: "",
      currentRow: 0,
      pickerOptionsStart: {
        disabledDate(time) {
          // console.log(time, getLastTime());
          return time.getTime() < getFirstTime().getTime();
        }
      },
      pickerOptionsStartForRequest: {},
      btnIsLoading: false,
      haveDel: false,
      summaryColumns: [
        {
          label: `数量`,
          fieldname: `FQty`
        },
        {
          label: `体积`,
          fieldname: `FVolume`
        },
        {
          label: `总体积`,
          fieldname: `FTotalVolume`
        },
        {
          label: `税额`,
          fieldname: `FTaxAmount`
        },
        {
          label: `价税合计`,
          fieldname: `FSum`
        },
        {
          label: `最终无税金额`,
          fieldname: `FAmount2`
        },
        {
          label: `最终价税合计`,
          fieldname: `FSum2`
        }
      ],
      dialogPreviewVisible: false,
      orderFormPre: {},
      listPre: [],
      summary: {}
    };
  },
  watch: {
    formStatus: {
      handler: function(nv) {
        this.canEdit = nv === `look`;
      }
    },
    "orderForm.FCustCode": {
      handler: function(nv) {
        this.listQuery.ccuscode = nv;
      }
    },
    "orderForm.FTaxRate": {
      handler: function(nv) {
        this.list.forEach(f => {
          f.FTaxRate = nv;
        });
      }
    },
    "orderForm.FDate": {
      handler: function(nv) {
        if (this.formStatus == `add` || this.formStatus == `edit`) {
          this.list.forEach(f => {
            if (new Date(nv).getTime() >= new Date(f.FRequestDate).getTime()) {
              f.FRequestDate = null;
            }
          });
        }
        this.pickerOptionsStartForRequest = {
          disabledDate(time) {
            return time.getTime() < new Date(nv).getTime();
          }
        };
      }
    }
  },
  methods: {
    transSearch(val) {
      this.listQuery.searchword = val;
    },
    changeCus(value) {
      this.orderForm.FCustCode = value;
    },
    judgeRole() {
      return this.currentRole == "trader";
    },
    filterU8(value) {
      if (value) {
        this.u8List = [...this.u8ListCopy].filter(
          f => f.ccuscode.indexOf(value) > -1 || f.ccusname.indexOf(value) > -1
        );
      } else {
        this.u8List = [...this.u8ListCopy];
      }
    },
    confirmEdit(row) {
      row.edit = false;
      this.$message({
        message: `行${row.FNo}被确认!`,
        type: "success"
      });
    },
    showInvList(scope) {
      this.dialogInvVisible = !this.dialogInvVisible;
      this.currentRow = scope.$index;
      this.getInvList(scope.row);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getInvList();
    },
    changeCurrentRow(rowIndex) {
      this.currentRow = rowIndex;
    },
    onSearch(scope) {
      const row = scope.row;
      if (row.FInvCode === `` || row.FInvCode === undefined) {
        this.dialogInvVisible = !this.dialogInvVisible;
        this.currentRow = scope.$index;
        this.getInvList(scope.row);
      } else {
        fetchInvList(
          Object.assign({}, this.listQuery, { searchword: row.FInvCode })
        ).then(response => {
          this.dialogInvVisible = true;
          const { data, state, message } = response.data;
          if (state === `success`) {
            if (data.items.length > 0) {
              this.invList = data.items;
              this.invTotal = data.total;
            } else {
              const _data = [Object.assign({}, this.orderForm)];
              this.confirm(_data);
              this.$notify({
                title: "提示",
                message: "没有查询到数据!",
                type: "warning",
                duration: 2000
              });
            }
          } else {
            this.$notify({
              title: "错误",
              message: message,
              type: "warning",
              duration: 2000
            });
          }
          this.invListLoading = false;
        });
      }
    },
    getInvList(row) {
      this.invListLoading = true;
      fetchInvList(this.listQuery).then(response => {
        const { data, state, message } = response.data;
        if (state === `success`) {
          this.invList = data.items;
          this.invTotal = data.total;
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.invListLoading = false;
        }, 1.5 * 1000);
      });
    },
    confirm(data) {
      const selected = data; //|| [...this.multipleSelection];
      // console.log(selected);
      if (selected.length > 0) {
        selected.forEach((f, i) => {
          // const lastRowNo = this.addRow();
          // console.log(lastRowNo)
          // this.currentRow = lastRowNo;
          this.list[this.currentRow].FInvCode = selected[i].cinvcode;
          this.list[this.currentRow].FInvName = selected[i].cinvname;
          this.list[this.currentRow].FInvStd = selected[i].cinvstd;
          this.list[this.currentRow].FInvUnitCode = selected[i].ccomunitcode;
          this.list[this.currentRow].FInvUnitName = selected[i].ccomunitname;
          this.list[this.currentRow].FQty = selected[i].fminquantity;
          this.list[this.currentRow].FVolume = selected[i].ivolume;
          this.list[this.currentRow].FTotalVolume = 1 * selected[i].ivolume;
          this.list[this.currentRow].FPlanPrice = selected[i].iuprice; //面价:从存货价格表中取
          this.list[this.currentRow].FPlanPrice = selected[i].iuprice; //面价:从存货价格表中取
          this.list[this.currentRow].FTaxPrice = selected[i].iinvnowcost; //含税单价:默认从客户价格表中取，没有就取面价 ();

          //  fetchCusInvList({
          //     ccuscode: this.FCustCode,
          //     cinvccode: selected[i].cinvccode
          //   })
          //     .then(response => {
          const FPlanPrice = this.list[this.currentRow].FPlanPrice;
          const FTaxRate = this.orderForm.FTaxRate;
          const FTaxPrice = this.list[this.currentRow].FTaxPrice;
          const FQty = this.list[this.currentRow].FQty;
          const FPrice = Calc.divide(
            FTaxPrice,
            Calc.sum(1, Calc.divide(FTaxRate, 100))
          );
          const FAmount = Calc.multiply(FPrice, FQty);
          const FSum = Calc.multiply(FTaxPrice, FQty); //价税合计:含税单价*数量
          const FTaxAmount = Calc.multiply(Calc.divide(FTaxRate, 100), FSum); //税额:价税合计*(税率/100)
          const FDisAmount = Calc.multiply(
            FQty,
            Calc.minus(FPlanPrice, FTaxPrice)
          ); //折扣额:数量*(面价-含税单价）
          this.list[this.currentRow].FTaxPrice = FTaxPrice; //含税单价:默认从客户价格表中取，没有就取面价
          this.list[this.currentRow].FPrice = FPrice.toFixed(2); //无税单价:含税单价/(1+税率/100)
          this.list[this.currentRow].FAmount = FAmount.toFixed(2); //无税金额:数量*无税单价
          this.list[this.currentRow].FTaxAmount = FTaxAmount.toFixed(2); //无税金额:数量*无税单价
          this.list[this.currentRow].FSum = FSum.toFixed(2); //无税金额:数量*无税单价
          this.list[this.currentRow].FDisAmount = FDisAmount.toFixed(2); //折扣额:数量*(面价-含税单价）
          //     })
          //     .catch(err => {});
        });
        this.dialogInvVisible = false;
      } else {
        this.$notify({
          title: "错误",
          message: "没有勾选",
          type: "warning",
          duration: 2000
        });
      }
    },
    handleChange(val, nv) {
      this.currentRow = nv;
      if (this.list[nv].FInvCode == "") return;
      const FPlanPrice = this.list[nv].FPlanPrice;
      const FTaxRate = this.orderForm.FTaxRate;
      const FTaxPrice = this.list[nv].FTaxPrice;
      const FQty = val;
      const FVolume = this.list[nv].FVolume;
      const FPrice = Calc.divide(
        FTaxPrice,
        Calc.sum(1, Calc.divide(FTaxRate, 100))
      );
      const FAmount = Calc.multiply(FPrice, FQty);
      const FSum = Calc.multiply(FTaxPrice, FQty); //价税合计:含税单价*数量
      const FTaxAmount = Calc.multiply(Calc.divide(FTaxRate, 100), FSum); //税额:价税合计*(税率/100)
      const FDisAmount = Calc.multiply(FQty, Calc.minus(FPlanPrice, FTaxPrice)); //折扣额:数量*(面价-含税单价）
      this.list[nv].FTaxPrice = FTaxPrice; //含税单价:默认从客户价格表中取，没有就取面价
      this.list[nv].FPrice = FPrice.toFixed(2); //无税单价:含税单价/(1+税率/100)
      this.list[nv].FAmount = FAmount.toFixed(2); //无税金额:数量*无税单价
      this.list[nv].FTaxAmount = FTaxAmount.toFixed(2); //无税金额:数量*无税单价
      this.list[nv].FSum = FSum.toFixed(2); //无税金额:数量*无税单价
      this.list[nv].FDisAmount = FDisAmount.toFixed(2); //折扣额:数量*(面价-含税单价）
      this.list[nv].FTotalVolume = Calc.multiply(FVolume, FQty); //总体积:体积*数量
    },
    addRow() {
      this.list.push(
        Object.assign({}, this.entryForm, {
          FNo: this.list.length + 1,
          FID: this.formStatus == "add" ? 0 : this.orderForm.FID
        })
      );
      return this.list.length - 1;
    },
    delRow(row) {
      this.$confirm(`删除行${row + 1}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.list.splice(row, 1);
          this.reCalcRowNo();
        })
        .catch(() => {});
    },
    clearRow() {
      this.$confirm(`清空表格全部行, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.list = [];
          this.addRow();
        })
        .catch(() => {});
    },
    editForm() {
      this.$confirm(`此操作将编辑此预订单, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formStatus = `edit`;
        })
        .catch(() => {});
    },
    delForm() {
      this.$confirm(`此操作将删除此预订单, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delPreSell({ id: this.orderForm.FID }).then(response => {
            const { data, message, state } = response.data;
            this.haveDel = state === `success`;

            this.$notify({
              title: state === `success` ? "成功" : "错误",
              message: message,
              type: state === `success` ? "success" : "warning",
              duration: 2000
            });
          });
        })
        .catch(() => {});
    },
    cancelEditForm() {
      this.formStatus = `look`;
    },
    beforSaveForm() {
      const temp = [...this.list];
      return (
        temp.length > 0 &&
        temp.some(f => !f.edit && f.FInvCode !== `` && f.FRequestDate !== ``)
      );
    },
    saveForm() {
      if (this.beforSaveForm()) {
        this.$refs["orderForm"].validate(valid => {
          if (valid) {
            this.$confirm(`此操作将提交您的编辑, 是否继续?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.list = this.list.filter(f => f.FInvCode != "");
                const postForm = Object.assign(
                  {},
                  { state: this.formStatus },
                  { form: this.orderForm },
                  { list: this.list }
                );
                savePreSell(postForm)
                  .then(response => {
                    const { data, message, state } = response.data;
                    if (state === `success`) {
                      this.formStatus = `look`;
                      this.$router.push({
                        path: `/presell`,
                        query: {
                          id: data
                        }
                      });
                    }
                    this.$notify({
                      title: state === `success` ? "成功" : "错误",
                      message: message,
                      type: state === `success` ? "success" : "warning",
                      duration: 2000
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(() => {});
          }
        });
      } else {
        this.$notify({
          title: "错误",
          message:
            "表单部分行尚未被确认或者表单信息不完整! \n 注意：存货编码或者到期时间不可为空",
          type: "warning",
          duration: 2000
        });
      }
    },
    reCalcRowNo() {
      this.list.forEach((f, i) => {
        f.FNo = i + 1;
      });
    },
    getPreSellInfo(fid) {
      getPreSellInfo({ id: fid })
        .then(response => {
          const { data, message, state } = response.data;
          if (state === `success`) {
            this.orderForm = data.form;
            this.list = data.list.map(m => {
              let t = m;
              t.edit = false;
              return t;
            });
            this.formStatus = `look`;
            setTimeout(() => {
              this.listLoading = false;
            }, 1.5 * 1000);
          }
        })
        .catch(() => {});
    },
    UnAuditForm() {
      if (this.orderForm.FStatus == `1`) {
        this.$confirm(`您的操作将改变此预订单的审批状态, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.btnIsLoading = true;
            unAuditPresell({
              verifier: this.$store.getters.username,
              id: this.orderForm.FID
            })
              .then(response => {
                const { data, state, message } = response.data;
                if (state === `success`) {
                  this.orderForm.FVerifyDate = data.date;
                  this.orderForm.FVerifier = data.verifier;
                  this.orderForm.FStatus = data.status + "";
                }
                this.btnIsLoading = false;
                return this.$notify({
                  title: state == `success` ? "成功" : "错误",
                  message: message,
                  type: state,
                  duration: 2000
                });
              })
              .catch(() => {
                console.log(`error`);
              });
          })
          .catch(() => {});
      } else {
        this.$notify({
          title: "错误",
          message: "已完成弃审!",
          type: "error",
          duration: 2000
        });
      }
    },
    AuditForm() {
      if (this.orderForm.FStatus == `0`) {
        this.$confirm(`您的操作将改变此预订单的审批状态, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.btnIsLoading = true;
            auditPresell({
              verifier: this.$store.getters.username,
              id: this.orderForm.FID
            })
              .then(response => {
                const { data, state, message } = response.data;
                if (state === `success`) {
                  this.orderForm.FVerifyDate = data.date;
                  this.orderForm.FVerifier = data.verifier;
                  this.orderForm.FStatus = data.status + "";
                }
                this.btnIsLoading = false;
                return this.$notify({
                  title: state == `success` ? "成功" : "错误",
                  message: message,
                  type: state,
                  duration: 2000
                });
              })
              .catch(() => {
                console.log(`error`);
              });
          })
          .catch(() => {});
      } else {
        this.$notify({
          title: "错误",
          message: "已完成审批!",
          type: "error",
          duration: 2000
        });
      }
    },
    PreviewBill() {
      GetPreviewData({
        id: this.orderForm.FID
      })
        .then(response => {
          const { data, state, message } = response.data;
          if (state === `success`) {
            const { form, list } = data;
            delete form.FID;
            this.orderFormPre = form;
            var summary_qty = 0;
            var summary_volumn = 0;
            var summary_totalvolumn = 0;
            var summary_taxamount = 0;
            var summary_sum = 0;
            list.forEach(item => {
              delete item.FID;
              delete item.FRowState;
              summary_qty = Calc.sum(summary_qty, item.FQty);
              summary_volumn = Calc.sum(summary_volumn, item.FVolume);
              summary_totalvolumn = Calc.sum(
                summary_totalvolumn,
                item.FTotalVolume
              );
              summary_taxamount = Calc.sum(summary_taxamount, item.FTaxAmount);
              summary_sum = Calc.sum(summary_sum, item.FSum);
            });
            let temp = { ...[...list].pop() };
            for (const key in temp) {
              temp[key] = "";
            }
            temp.FInvCode = "合计";
            temp.FQty = summary_qty;
            temp.FVolume = summary_volumn;
            temp.FTotalVolume = summary_totalvolumn;
            temp.FTaxAmount = summary_taxamount;
            temp.FSum = summary_sum;

            this.listPre = [...list, temp];
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
      this.dialogPreviewVisible = !this.dialogPreviewVisible;
    },
    BuildSo() {
      if (this.orderForm.FStatus == `1`) {
        this.$confirm(`您的操作将生成U8销售单, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.btnIsLoading = true;
            buildU8So({
              id: this.orderForm.FID
            })
              .then(response => {
                const { data, state, message } = response.data;
                if (state === `success`) {
                  this.getPreSellInfo(this.$route.query.id);
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
      } else {
        this.$notify({
          title: "错误",
          message: "已完成审批!",
          type: " ",
          duration: 2000
        });
      }
    },
    haveAudit() {
      return this.orderForm.FStatus > 0;
    },
    headerclick(column, event) {
      const { label } = column;
      if (label == `到货日期(点击复制)`) {
        if (this.formStatus == `add` || this.formStatus == `edit`) {
          const _row = [...this.list].filter(f => f.FRequestDate != "").shift();
          _row && this.list.forEach(f => (f.FRequestDate = _row.FRequestDate));
        }
      }
      if (label == `特价项目(点击复制)`) {
        if (this.formStatus == `add` || this.formStatus == `edit`) {
          const _row = [...this.list].filter(f => f.FProject != "").shift();
          _row && this.list.forEach(f => (f.FProject = _row.FProject));
        }
      }
    },
    getSummary(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (this.summaryColumns.findIndex(f => f.label == column.label) > -1) {
          const _c = this.summaryColumns.find(f => f.label == column.label);
          const values = data.map(item => Number(item[_c.fieldname]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return Calc.sum(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = "";
          }
        }
      });

      return sums;
    }
  },
  mounted() {
    //通过是否传入ID判断当前表单状态是新增还是编辑
    this.currentRole = [...this.$store.getters.roles].shift();
    if (this.$route.query.id) {
      this.getPreSellInfo(this.$route.query.id);
    } else {
      if (this.currentRole == `trader`) {
        this.orderForm.FDealerCode = this.$store.getters.username;
        this.orderForm.FDealerName = this.$store.getters.name;
        this.orderForm.FType = 1; //经销商是2
      }
      if (this.currentRole == `customer`) {
        this.orderForm.FCustCode = this.$store.getters.cuscode;
        // this.orderForm.FCusName = this.$store.getters.name; // 2019-03-29 客户取消名称绑定
        this.orderForm.FType = 2; //客户是2
      }
      if (this.currentRole == `admin`) {
        this.orderForm.FType = 2; //客户是2
      }
      this.orderForm.FBiller = this.$store.getters.username;
      this.orderForm.FBillerName = this.$store.getters.name;
      getPreSellBillNo({ type: "presell" })
        .then(response => {
          const { data, state, message } = response.data;
          if (state === `success`) {
            const { billNo, date } = data;
            setTimeout(() => {
              this.listLoading = false;
            }, 1.5 * 1000);
            this.canEdit = false;
            this.orderForm.FBillNo = billNo;
            this.orderForm.FDate = date;
            this.pickerOptionsStartForRequest = {
              disabledDate(time) {
                return time.getTime() <= new Date(date).getTime();
              }
            };
          }
        })
        .catch(error => {});
    }
    if (this.currentRole == `trader`) {
      fetchU8CusListHaveBind({ trader: this.$store.getters.username })
        .then(response => {
          const { data, message, state } = response.data;
          if (state === `success`) {
            this.u8List = data.items;
            this.u8ListCopy = data.items;

            // if (this.formStatus === `add`)
            //   this.orderForm.FCustCode = [...data.items].shift().ccuscode;
          }
        })
        .catch(() => {});
    }
    if (this.currentRole == `customer`) {
      fetchU8CusListWithCode({ cuscode: this.$store.getters.username })
        .then(response => {
          const { data, message, state } = response.data;
          if (state === `success`) {
            this.u8List = data.items;
            this.u8ListCopy = data.items;

            // if (this.formStatus === `add`)
            //   this.orderForm.FCustCode = [...data.items].shift().ccuscode;
          }
        })
        .catch(() => {});
    }
    if (this.currentRole == `admin`) {
      fetchU8CusList()
        .then(response => {
          const { data, message, state } = response.data;
          if (state === `success`) {
            this.u8List = data.items;
            this.u8ListCopy = data.items;

            // if (this.formStatus === `add`)
            //   this.orderForm.FCustCode = [...data.items].shift().ccuscode;
          }
        })
        .catch(() => {});
    }

    fetchU8StList().then(response => {
      const { data, message, state } = response.data;
      if (state === `success`) {
        this.u8StList = data.items;
      }
      // if (this.formStatus === `add`)
      //   this.orderForm.FSTCode = [...data.items].shift().cstcode;
    });
    this.entryForm.FTaxRate = this.orderForm.FTaxRate;
    for (let index = 1; index < 6; index++) {
      this.list.push(
        Object.assign({}, this.entryForm, {
          FNo: index
        })
      );
    }
  },
  computed: {
    showsummary: function() {
      return true; //this.orderForm.FStatus == 2 && this.formStatus == "look";
    },
    clearable: function() {
      this.currentRole = [...this.$store.getters.roles].shift();
      return (
        (this.currentRole == `customer` && this.formStatus == `add`) ||
        this.formStatus == `edit`
      );
    },
    maxheight: function() {
      return window.innerHeight * 0.4;
    }
  }
};
</script>

<style scoped>
.fixitem {
  width: 200px;
}
.offset {
  width: 180px;
}
</style>
<style  lang='less'>
.claim_company {
  .el-table {
    overflow: auto;
  }
  .el-table::after {
    position: relative !important;
  }
}
</style>

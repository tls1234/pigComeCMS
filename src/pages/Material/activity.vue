<template>
  <div class="activity">
    <el-form :inline="true" :model="countForm" label-width="5px" size="mini" class="searchForm">
      <el-form-item class="float_left">
        <el-select v-model="countForm.id" placeholder="优惠活动类型" clearable>
          <!-- <el-option v-for="item in list" :label="item.type" :key="item.type"  :value="item.merchantid">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">满减优惠</span>
              <span v-if="scope.row.type == 0">打折优惠</span>
            </template>
          </el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="reachForm" type="primary">确定</el-button>
      </el-form-item>
      <el-form-item class="float_right">
        <el-button type="primary" @click="addCountDZ">新增打折优惠</el-button>
      </el-form-item>
      <el-form-item class="float_right">
        <el-button type="primary" @click="addCountMJ">新增满减优惠</el-button>
      </el-form-item>
    </el-form>
    <el-table class="activity-table" height="calc(100% - 105px)" border :data="list">
      <el-table-column prop="type" label="活动种类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=== 1 ">满减优惠</span>
          <span v-if="scope.row.type=== 0 ">打折优惠</span>
        </template>
      </el-table-column>
      <el-table-column prop="dis" label="折扣(单个商品)" align="center"></el-table-column>
      <el-table-column prop="full" label="满 (满减优惠所有商品)" align="center"></el-table-column>
      <el-table-column prop="reduce" label="减 (满减优惠所有商品)" align="center"></el-table-column>
      <el-table-column prop="name" label="折扣商品" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >编辑</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">删除</el-button>
        </template> 
      </el-table-column> 
    </el-table>
    <div class="pageination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchObj.pageNum"
        :page-sizes="[10, 15, 20, 35]"
        :page-size="searchObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchObj.totalCount">
      </el-pagination>
    </div>
    <!-- 这里是弹窗的内容 -->

    <el-dialog :modal-append-to-body="false" @close="close(addForm)" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
      <el-form :inline="true" :model='addForm'  ref="addForm" label-width="150px" class="searchForm demo-form-inline" rule='rules' size="small">
        <el-form-item label="优惠种类：" prop="type" class="myitem" width="50%">
          <el-select v-model="addForm.type" clearable placeholder="请选择优惠的类型" :disabled="true" >
            <el-option v-for="item in this.discount" :key="item.type" :label="item.typeName" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣范围：" prop="type" class="myitem" width="50%">
          <el-select v-model="addForm.dis" clearable placeholder="请选择折扣点" :disabled="addtype" >
            <el-option label="0.1" :value="'0.1'"></el-option>
            <el-option label="0.2" :value="'0.2'"></el-option>
            <el-option label="0.3" :value="'0.3'"></el-option>
            <el-option label="0.4" :value="'0.4'"></el-option>
            <el-option label="0.5" :value="'0.5'"></el-option>
            <el-option label="0.6" :value="'0.6'"></el-option>
            <el-option label="0.7" :value="'0.7'"></el-option>
            <el-option label="0.8" :value="'0.8'"></el-option>
            <el-option label="0.9" :value="'0.9'"></el-option>
            <el-option label="1" :value="'1'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="full" label="(满减优惠)满：" class="myitem" >
          <el-input type="text" placeholder="请输入金额" v-model="addForm.full" :disabled="addtypeT" width="45%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" label="优惠商品名字：" class="myitem">
          <el-select v-model="addForm.shopId" clearable placeholder="请选择需要折扣的商品" :disabled="myshop">
            <el-option v-for="item in this.shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="reduce" label="(满减优惠)减：" class="myitem">
          <el-input type="text" placeholder="请输入金额" v-model="addForm.reduce" :disabled="addtypeT" width="50%" >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="createName" label="创建的时间：" class="myitem">
          <el-date-picker
          :disabled="false"
            v-model="addForm.createdTime"
            type="date"
            placeholder="创建时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary">取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        countForm: {
          id:null,
          name:null
        },
        addForm:{
          shopId:null,//优惠商品id
          manjId: null,
          id:null,//优惠id
          type:null,//优惠类型
          dis:null,//折扣
          full:null,//满
          reduce:null,//减
          name:null,//优惠的商品
          createdTime:null//创建时间
        },
        myshop:false,
        addtype:false,
        addtypeT:false,
        dialogVisible:false, //弹窗显示与否
        title:null,//弹窗的名字
        list:[],
        shopList:[],
        searchObj:{
          pageSize:10,
          pageNum:1,
          totalCount:1
        },
        discount:[
          {
            type:0,
            typeName:"打折优惠活动",
          },
          {
            type:1,
            typeName:'满减优惠活动'
          }
        ],
      }
    },
    created () {
      this.discountAll();
      this.cose();
      // this.addDiscount()
      // this.addByFull()
    },
    methods: {
      cose () {
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data.data.list)
          this.shopList = res.data.data.list
          // console.log(this.shopList[0].id)
         })
      },
      close (form) {
        // debugger;
        this.addtype = false;
        this.addtypeT = false;
        this.myshop = false;
        for(var i in form){
          form[i] = null;
        }
        this.discountAll()
      },
      // 添加活动
      addCountDZ () {//新增打折优惠
        this.addForm.type = 0
        console.log(this.addForm.type)
        this.addtypeT = true
        this.dialogVisible = true;
        this.title = '添加打折优惠活动'
      },
      addCountMJ () {//新增满减优惠
        this.dialogVisible = true;
        this.addtype = true;
        this.addForm.type = 1
        this.myshop = true
        this.title = '添加满减优惠活动'
        console.log(this.addForm.type)
      },
      //搜索框搜索
      reachForm() {

      },
      //修改活动
      remove(scope) {
        console.log(scope)
        this.dialogVisible =true
        this.addForm = scope;
        this.myshop = true
        if(this.addForm.type) {
          this.title = "编辑满减优惠活动"
          this.addtype = true;
        }else {
          this.addtypeT = true;
          this.title = "编辑打折优惠活动"
          console.log(scope.commodityid)
          this.addForm.shopId = scope.commodityid
          this.myshop = true
        }

      },
      del(scope) {
        console.log(scope)
        this.addForm = scope;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("deledDiscount",{id:this.addForm.id}).then((res)=>{
            // console.log(res)
              this.discountAll()
              if(res.data.retCode==200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      cancel () {
        this.dialogVisible = false;
      },
      save () {
        // debugger;
        if(this.addForm.type==1 && this.title=="添加满减优惠活动"){
          this.$api("discountFull",{type:this.addForm.type,full:this.addForm.full,reduce:this.addForm.reduce}).then((res)=>{//新增满减优惠活动
            if(res.data.retCode!==200) {
              this.$message(res.data.message)
            }else{
              this.$message("添加成功")
              this.discountAll()
            }
          })
        }else if(this.addForm.type==1 && this.title=="编辑满减优惠活动") {
          this.$api('updateDiscount',{id:this.addForm.id,type:this.addForm.type,full:this.addForm.full,reduce:this.addForm.reduce}).then((res)=>{//修改优惠活动（满减优惠活动）
            if(res.data.retCode!==200) {
              this.$message(res.data.message)
            }else{
              this.$message("修改成功");
              this.discountAll()
            }
          })
        }else if(this.addForm.type==0 && this.title=="添加打折优惠活动"){
          // this.$api('updateDiscount',{id:this.addForm.id,type:this.addForm.type})
          this.$api("discountAddDis",{type:this.addForm.type,commodityid:this.addForm.shopId,dis:this.addForm.dis}).then((res)=>{//新增打折优惠活动
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message(res.data.message)
            }else{
              this.$message("添加成功")
              this.discountAll()
            }
          })
        }else if (this.addForm.type==0 && this.title=="编辑打折优惠活动") {
          this.$api('updateDiscount',{id:this.addForm.id,type:this.addForm.type,commodityid:this.addForm.shopId,dis:this.addForm.dis}).then((res)=>{//修改优惠活动（打折优惠活动
            if(res.data.retCode!==200) {
              this.$message(res.data.message)
            }else{
              this.$message("编辑成功")
              this.discountAll()
            }
          })
        }
        
          this.dialogVisible = false
      },
      //页面初始查询数据
      discountAll () {//查询所有优惠
        this.$api('discountAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          var data = res.data.data.list;
          this.list = data;
          this.searchObj.pageSize =res.data.data.pageSize;
          this.searchObj.pageNum = res.data.data.pageNum;
          this.searchObj.totalCount =res.data.data.total
        })
      },
      addDiscount () {
         this.$api('discountAddDis',{type:'0',commodityid:'2',dis:'0.8'}).then((res)=>{
          console.log(res)
        })
      },
      addByFull () {
         this.$api('discountFull',{type:'1',full:'20',reduce:'10'}).then((res)=>{
          console.log(res)
        })
      },
      
      handleSizeChange (val) {//改变每页显示多少条
        this.searchObj.pageSize = val;
        this.discountAll()
      },
      handleCurrentChange (val) { //改变前往多少页
        this.searchObj.pageNum = val;
        this.discountAll()
      }
    }
  }
</script>
<style lang="less">
    .myitem{
      padding:30px 0 ;
      // width: 45%;
    }
    .radio {
      width: 90% !important;
    }
</style>
<style>
  .activity{
    width: 100%;
    height:100%;
    text-align: center;
    color: black;
    color: rgba(0, 0, 0, 0.349)
  }
  .searchForm{
        padding: 10px;
    }
</style>



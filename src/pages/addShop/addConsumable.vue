<template>
    <div class="goods">
      <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
        <el-form-item class="float_left">
          <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
            <el-option v-for="channel in shopType" :key="channel.id" :label="channel.name" :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float_left">
            <el-button @click="earchForm" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item class="float_right">
          <el-button type="primary" @click="addtype">添加商品类型</el-button>
        </el-form-item>
      </el-form>
      <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
        <el-table-column prop="upName" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
        <el-table-column prop="img" label="商品logo" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(tableData)" :visible.sync="myDisable" :show-close="false" width="900px">
        <el-form :inline="true" :model="tableData" ref="imgType" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item label="商品类型：" prop="higherup" class="myitem">
            <el-select v-model="tableData.higherup" clearable placeholder="请选择产品的类型" @change="getShop" :disabled='typeId'>
              <el-option v-for="item in this.shopType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> 
          </el-form-item>
          <el-form-item label="商品类型："  class="myitem">
            <el-input type="text" clearable placeholder="如：春装" v-model="GetName" :disabled='typedd' @blur="getInput" ></el-input> 
          </el-form-item>
          <el-form-item label="商品名称：" prop="name" class="myitem">
            <el-input type="text" placeholder="如：上衣" v-model="tableData.name" ></el-input> 
          </el-form-item>
          <el-form-item label="上传产品图片：">
            <el-upload
              name="img"
              :data="tableData"
              class="avatar-uploader"
              action="/api/type/addByType"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :on-remove="fileList"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i><br>
              <small class="uploadSmall">建议使用750*750，10M以内的jpg、png图片</small>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ImgClose(tableData)">取消</el-button>
          <el-button type="primary" @click="ImgSave(tableData)">保存</el-button>
        </span>
      </el-dialog>
      <!-- 这里是分页功能 -->
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

    </div>
</template>
<script>
  // import GoodsObj from ' ./unit.js '
import unit from './unit.js';
  export default {
    data () {
      return {
        standNameNum:null,
        unit:unit.unit,
        unitCh:null,
        standDisc:false,//添加规格弹框状态     
        imageUrl:null,//上传图片img的地址
        imgType:{
          name:null,
          img:null
        },
        tableData:{
          name:null,
          higherup:null,
          status:'4'
        },
        GetName:null,
        myDisable:false,
        updateShop:{
          name1:"商品类型：",
          name2:"商品名称：",
          name3:"商品无规格价格：",
          name4:"编辑时间：",
          inputName1:'请选择商品类型',
          inputName2:"请选择商品名称",
          inputName3:"输入商品价格（大于十五的商品金额）",
          inputName4:"编辑时间"
        },
        arr:[],//这是耗材规格的数组
        typeId:false,
        typedd:false,
        disable:false,//是否禁用select框
        dialogVisible: false,
        dis:false,
        title: null,
        searchObj: {
          createDay: null,
          searchContent: null,
          sortField: null,
          sortOrder: null,
          updateDay: null,
          topicalName: null,
          channelId: null,
          productType: null,
          pageNum: 1,
          pageSize: 10,
          totalCount:0
        },
        actionType:null,//操作类型
        higherup:null, //搜索框需要传递的参数(这是商品类型)
        shopId:null,
        addform: {
          id:null,
          merchantid:null,
          name:null,
          number:null,
          type:null,
          standType:null,
          upName:null,
          price:null,
          standPrice:null,
          standName:null,
          standardsModelList:null,
          remark:null
        },
        shopType:[],//商品类型
        classShop:[],//根据商品类型获得相应的商品
        addShop:[],
        productTypes: [],
        list1:[]
      }
    },
    created () {
      // this.allshop()
      // this.addshop();
      // this.get()
      this.ces();
      this.status();
      // this.clasShop();
    },
    methods: {
      fileList() {//上传成功以后删除图片
        
      },
      handleAvatarSuccess(res, file) {//图片上传函数
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {//图片上传函数
        const isJPG = /image\/[jpeg|jpg|png]/.test(file.type);
          const isLt1M = file.size / 1024 / 1024 < 10;

          if (!isJPG) {
          this.$message.error("上传LOGO图片格式应为jpeg|jpg|png!");
          }
          if (!isLt1M) {
          this.$message.error("上传LOGO图片大小不能超过 10MB!");
          }
          return isJPG && isLt1M;
      }, 
      ImgClose (tableData) {//添加商品类型的函数取消函数
        this.myDisable = false;
        this.fileList();
        // console.log(tableData)
        for(var i = 0;i<tableData.length;i++) {
          tableData[i].name = null;
          tableData[i].higherup = null;
        }
      },
      ImgSave (tableData) {//确认添加类型
        this.fileList();
        this.imageUrl =null;
        this.tableData.name =null;
        this.tableData.higherup=null;
        if(tableData.higherup==null) {
          this.$api('addByTypeOne',{name:this.GetName,higherup:"0",status:'3'}).then((res)=>{
            console.log(res);
          })
        }
        this.myDisable = false;

      },
      getInput() {//添加商品类型input框
        if(this.tableData.GetName) {
          this.typeId =true;
        }else {
          this.typeId = false;
        }
      },
      addtype() {//添加商品的按钮
        this.myDisable = true;
        this.actionType = 3;
        this.disable = false;
        this.title = "添加商品类型"
        
      },
      num() {//当下拉结束后找值
      // debugger;
        console.log(this.addform.standName)
        var arr = this.addform.standardsModelList;
        for (var i=0;i<arr.length;i++) {
          if(arr[i].name == this.addform.standName) {
            this.addform.standPrice = arr[i].price;
            this.addform.standType = arr[i].id;
          }
        }
      },
      input1 () {//输入的金额判断
        var reg = /^1[6-9]$|^[2-9]\d$|^1\d{2}$/;
        if(reg.test(this.addform.price)){
          this.addform.pice = reg.test(this.addform.price);
        }else if (/[^\d]/.test(this.addform.price)) {
          this.addform.price=this.addform.price.replace(/[^\d]/g,'')
        }
        else{
          this.$message("请正确输入大于十五的金额");
          this.addform.price = null;
        }
      },
      stop() {
        this.dis = true;
      },
      getShop(){//这里是点击商品类型获取相应商品
        this.clasShop();
        if(this.tableData.higherup) {
          this.typedd =true;
        }else{
          this.typedd = false;
        }

        
      },
      deleStand(scope) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("deleteStand",{id:scope.id}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
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
      deleShop(scope) {//删除商品相当于下架订单
        console.log(scope);
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("deleteStand",{id:scope.id}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
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
       save () {//保存
        this.dialogVisible = false
        if(this.actionType==1){
            this.$api("addshop",{typeid:this.addform.id, price:this.addform.price,remark:this.addform.remark}).then((res)=>{
            if(res.data.retCode!==200) {
            this.$message(res.data.message)
            }else{
              this.$message(res.data.message)
            }
            console.log(res)
          })
          this.ces()
          }else if(this.actionType==2) {
          // console.log(this.addform)
          // debugger;
          if(this.addform.standName) {
            this.$api('updateByStandards',{id:this.addform.standType,name:this.addform.standName,price:this.addform.standPrice}).then((res)=>{
              if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
            })
          }else{
            this.$api('upshop',{id:this.addform.id,price:this.addform.price}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
          })
          }
          this.ces()
        }else if(this.actionType == 4) {
            this.addform.standName = this.standNameNum + "/" + this.unitCh
             this.$api('addStandards',{commodityid:this.addform.id,name:this.addform.standName,price:this.addform.standPrice}).then((res)=>{
              if(res.data.retCode!==200) {
              this.$message('添加规格失败')
            }else{
              this.$message('添加规格成功')
            }
            })
            this.ces()
        } 
      },
      close (addform) {//取消的时候数据消失
        this.ces()
        this.dialogVisible = false;
        this.typeId =false;
        this.standDisc = false;
        for(var i in addform) {
          addform[i] = null;
          addform.status = '4';
        }
      },
      changeValue (value) {//这里获取搜索框的id
        var obj={};
        obj = this.productTypes.find((item)=>{
          return item.id == value
        });
         this.higherup = value
         console.log(this.higherup)
         console.log(obj)
      },
      status () {//查询我们的所有商品的类型
        this.$api('typeStatusOne',{params:{status:"3"}}).then((res)=>{
          console.log(res.data.data);
          this.shopType = res.data.data
        })
      },
      clasShop () {//这里根据商品类型查询相应的商品集
      // debugger;
        this.$api('typeFindOne',{params:{id:this.addform.type}}).then((res)=>{
          console.log(res);
          this.classShop = res.data.data;
          for(var i=0;i<this.classShop.length;i++) {
            console.log(this.classShop)
            if(this.classShop[i].type) {
              // console.log(this.classShop[i].type)
              this.classShop[i].type = true;
              console.log(this.dis)
            }else{
              this.classShop[i].type = false;
            }
          }
        })
      },
      earchForm () {       //搜索框搜索内容的
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,higherup:this.searchObj.productType}}).then((res)=>{
           console.log(res)
           var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
         })
      },  
      ces (){ //查询所有商品(模版)
        // debugger;
        this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data)
          var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
           for(var i=0;i<this.list1.length;i++) {
            this.arr=this.list1[i].standardsModelList
            console.log(this.arr)
          }
        })
      },
      handleSizeChange (val) {   //点击每页多少条的时候触发的函数(end)
        // debugger;
        this.searchObj.pageSize = val
        this.ces()
      },
      handleCurrentChange (val) { //点击前往第几页的时候触发的函数(end)
        this.searchObj.pageNum = val;
        this.ces();
      },
      add () {       //添加商品函数
        this.actionType =1;
        this.disable = false
        this.title = "添加商品"
        this.dialogVisible = true
      },
      upStand(scope) {//添加商品规格
        this.title = "添加产品规格",
        this.typeId = true;
        this.standDisc = true;
        this.actionType = 4;
        this.addform.name = scope.name;
        this.addform.upName = scope.upName;
        this.addform.id = scope.id;
      },

      edit (myCode) {
        // debugger;        //编辑商品
        this.typeId =true;
        console.log(myCode.row)
        this.dialogVisible = true;
        this.actionType=2;
        var row =  myCode.row;
        this.addform.name = row.name;
        this.addform.upName = row.upName;
        this.addform.id = row.id;
        this.addform.price = row.price;
        this.addform.standardsModelList  = row.standardsModelList;

        console.log(myCode)
        this.title = '编辑商品';
        
      },
    },
    computed: {
    } 
  }
</script>
<style long="less">
  .myitem{
    padding: 30px 0;
  }
  .myitem1{
    padding: 30px 0;
    width: 50%
  }
  .myitem1>.el-form-item__content {
    width: 60%;
  }
  .goods{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
    }
  .searchForm{
      padding: 10px;
  }
  .newInput{
    display: inline-block;
    width: 60%;
  }
  .newSelect{
    display: inline-block;
    width: 30%;
  }
  .form{
    padding: 10px 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
 
</style>


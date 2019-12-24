<template>
  <div class="aptitude">
    <el-table class="activity-table" height="calc(100% - 50px)" border :data="list">
      <el-table-column prop="license" label="营业执照图片" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.license" alt="营业执照图片" @click="License(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="idPositive" label="法人身份证正面" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.idPositive" alt="法人身份证正面" @click="IdPositive(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="idSide" label="法人身份证背面" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.idSide" alt="身份证背面" @click="IdSide(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="legalphoto" label="手持身份证照" align="center">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.legalphoto" alt="手持身份证照" @click="legalphoto(scope)" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="legalName" label="法人姓名" align="center"></el-table-column>
      <el-table-column prop="legalId" label="法人身份证号" align="center"></el-table-column>
      <el-table-column prop="shopName" label="商铺名称" align="center" class="colum"></el-table-column>
      <el-table-column prop="address" label="商铺地址" align="center" class="colum"></el-table-column>
      <el-table-column prop="contact" label="联系人" align="center" class="colum"></el-table-column>
      <el-table-column prop="contactPhone" label="联系电话" align="center" class="colum"></el-table-column>
      <el-table-column prop="logo" label="店铺图片" align="center" class="colum">
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.logo" alt="店铺图片" @click="image(scope)" class="itemImage">
          <!-- <button type="text" class="button" >大图</button> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)" size="mini" >通过</el-button>
          <el-button type="text" @click="del(scope.row)" size="mini">不通过</el-button>
        </template> 
      </el-table-column>  -->
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
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="pass.passVisible"  width="300px" @close="close(pass)">
      <el-form :inline="false" :model='pass' ref="pass"  class="searchForm">
        <el-form-item label="不通过原因：" prop="passText">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入不通过的原因内容"
            v-model="pass.passText">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updata">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="title" :visible.sync="dialogTableVisible"  width="900px">
      <div class="imge">
        <img :src="'/test' + DelogImage" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import List from './list.js'
// import list from './list.js';
export default {
  data () {
    return {
      pass:{
        id:null,
        passText:null,
        passVisible:false
      },
      searchObj:{
        pageNum:1,
        pageSize:10,
        totalCount:0
      },
      DelogImage:null,//图片地址
       title:"图片详情",
      list:null,
       dialogTableVisible:false//对话框
    }
  },
  created () {
    this.getAll()
  },
  
  methods:{
    getAll () {
      // debugger;
      this.$api("archives",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
      this.list = res.data.data.list;
      var mustList=[];
      for(let i=0;i<this.list.length;i++) {
        if(this.list[i].status == 2){
          mustList.push(this.list[i]);
        }
      }
      this.list = mustList;
      console.log(res)
      
      this.searchObj.pageNum = res.data.data.pageNum;
      this.searchObj.pageSize = res.data.data.pageSize;
      this.searchObj.totalCount = res.data.data.total;

    })
    },
    handleSizeChange (val) {//分页功能
      this.searchObj.pageSize = val;
      this.getAll()
    },
    handleCurrentChange (val) {//按页数分类
      this.searchObj.pageNum = val;
      this.getAll();
    },
    image(scope) {//点击放大图片查看
      // console.log(scope.row)
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.logo
      console.log(this.DelogImage)
    },
    close(pass){//弹窗消失
      pass.passText=null;
      pass.passVisible=false
    },
    IdPositive (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.idPositive;
    },
    IdSide (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.idSide;
    },  
    License (scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.license;
    },
    legalphoto(scope) {
      this.dialogTableVisible = true;
      this.DelogImage = scope.row.legalphoto;
    },
    remove(scope) {
      this.pass.id= scope.id
      this.$api('upArchives',{status:'1',remark:"已通过",id:this.pass.id}).then((res)=>{
        if(res.data.retCode==200) {
          this.$message({
            message:"审核通过了",
            type: "success"
          })
        }
        this.getAll();
        // console.log('已经通过')
      })
    },
    //未通过认证
    del(scope) {
      this.pass.id = scope.id
      this.pass.passVisible = true;
        this.title="审核不通过原因"
    },
    updata(){
      this.$api("upArchives",{status:'2', remark:this.pass.passText, id:this.pass.id}).then((res)=>{
        if(res.data.retCode==200){
          this.$message.error("审核未通过")
        }
        this.getAll();
        // console.log("未通过")
      })
    },
  }
}
</script>
<style long="less">
  .aptitude {
     width: 100%;
    height:100%;
    text-align: center;
    color: black;
    color: rgba(0, 0, 0, 0.349)
  }
  .imge{
    width: 80%;
    /* height: 400px; */
    margin: 0 auto;
    /* border: 1px solid red; */
  }
  .itemImage{
    height: 50px;
    vertical-align: middle;
  }
  .activity-table{
    width:100%;
  }
  .imge img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%; 
  }
  .pageination{
    margin-top: 10px;
  }
</style>
<style long="less" scoped>
</style>




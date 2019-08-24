<template>
  <div class="advertising">
    <el-form :inline="true" label-width="5px" size="mini"  class="searchForm">
      <el-form-item class="float_right">
        <el-button @click="upBanner" type="primary" >添加广告</el-button>
      </el-form-item>
    </el-form>
    <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
      <el-table-column prop="img" label="广告图片" align="center" >
        <template slot-scope="scope">
          <img :src="'/test' + scope.row.img" alt="广告图片" class="itemImage">
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="deleteBanner(scope)" type="text" size="mini">删除</el-button>
        </template>  
      </el-table-column>
    </el-table>
    <el-dialog :modal-append-to-body="false" :title="title" @close="close(tabledata)" center :visible.sync="myDisable" :show-close="false" width="900px">
      <el-form :inline="true" :model="tabledata" label-width="150px" class="searchFrom demo-form-inline" >
        <el-form-item label="开始时间：" prop="startTime" class="myitem">
          <el-date-picker v-model="tabledata.startTime" type="datetime" placeholder="选择开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime" class="myitem">
          <el-date-picker v-model="tabledata.endTime" type="datetime" placeholder="选择开始时间" format="yyyy-MM-dd HH-mm-ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传产品图片：">
          <el-upload
          ref="upload"
            name="img"
            :data="tabledata"
            class="avatar-uploader"
            action="/api/banner/addBanner"
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
        <el-button type="primary" @click="ImgClose(tabledata)">取消</el-button>
        <el-button type="primary" @click="ImgSave(tabledata)">保存</el-button>
      </span>
    </el-dialog>
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
export default {
  data () {
    return {
      title:'添加广告banner',
      myDisable:false,//弹框的出现
      list1: [],//table列表数组
      searchObj:{//分页
        pageNum:1,
        pageSize:10,
        totalCount:0
      },
      tabledata:{
        startTime:null,
        endTIme:null
      },
      imageUrl:null//图片的展示
    }
  },
  created () {
    this.getAall();
  },
  methods: {
    delImg () {
      this.imageUrl = null;
    },
    getAall () {//查询所有的banner
      this.$api('allBanner',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
        console.log(res);
        this.list1 = res.data.data.list;
        //console.log(this.list1)
      })
    },
    upBanner () {//添加广告图片
      this.myDisable = true;
    },
    deleteBanner (scope) {//删除广告图片
      this.$api('deleBanner',{params:{id:scope.row.id}}).then((res)=>{
        console.log(res)
        
      this.getAall();
      })
    },
    fileList () {//上传图片成功以后删除图片函数
    
    },
    close (addform) {//取消的时候数据消失
        this.getAall();
        this.imageUrl = null;
        for(var i in addform) {
          addform[i] = null;
        }
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
    ImgClose (tabledata) {//弹窗取消函数
      this.fileList ();
      this.myDisable = false;

    },
    ImgSave(tabledata) {//弹窗保存函数
      this.fileList();
      this.myDisable = false;
      this.getAall();
    },
    handleSizeChange (val) {
      this.searchObj.pageSize = val;
      this.getAall ();
    },
    handleCurrentChange (val) {
      this.searchObj.pageNum = val;
      this.getAall ();
    }
  }
}
</script>
<style scoped>
  .advertising {
    width: 100%;
    height: 100%;
  }
  .itemImage{
    height: 50px;
    vertical-align: middle;
  }
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
</style>



<template>
  <div class="perm-container">
    <el-card class="box-card" shadow="always">
      <div class="clearfix" slot="header">
        <b>
          <vab-icon icon="superscript-2" />
          {{ menu && menu.label ? '【' + menu.label + '】' : '' }}权限分配
        </b>
      </div>
      <el-row style="margin-bottom: 10px">
        <el-col :span="18">
          <el-tag v-if="role" type="primary">{{ role.name }}</el-tag>
          <el-tag v-if="menu" style="margin-left: 5px" type="success">{{ menu.label }}</el-tag>
          <el-tag v-if="!role" style="margin-left: 5px" type="info">
            <i class="el-icon-info"></i>
            请选择角色
          </el-tag>
          <el-tag v-if="!menu" style="margin-left: 5px" type="info">
            <i class="el-icon-info"></i>
            请选择菜单
          </el-tag>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button :disabled="isRoot" icon="el-icon-check" size="mini" type="primary" @click="handleSubmit">提交</el-button>
        </el-col>
      </el-row>

      <div v-if="permissionList.length > 0">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" style="margin-top: 20px" @change="handleCheckAllChange">全选</el-checkbox>
        <el-row>
          <el-col v-for="permission in permissionList" :key="permission.id" :span="8" style="margin-top: 20px">
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content">
                URL权限：{{ permission.urlPerm }}
                <br />
                按钮权限：{{ permission.btnPerm }}
              </div>
              <el-checkbox :key="permission.id" v-model="permission.checked" border :label="permission.id" size="mini" @change="handleCheckChange">
                {{ permission.name }}
              </el-checkbox>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
      <div v-else style="text-align: center">
        <vab-icon icon="nodata" style="width: 150px; height: 150px" />
        <el-row>
          <el-link type="info" :underline="false">{{ !role ? '请选择角色' : !menu ? '请选择菜单' : '暂无数据，您可在【菜单管理】配置权限数据' }}</el-link>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getPermissionList } from '@/api/system/permission'
  import { listRolePermission, updateRolePermission } from '@/api/system/role'

  export default {
    name: 'Permission',
    // props: ['type'],
    data() {
      return {
        loading: false,
        ids: [],
        initialCheckedPermissionIds: [],
        menu: undefined,
        role: undefined,
        isIndeterminate: true,
        checkAll: false,
        permissionList: [],
        isRoot: false,
      }
    },
    methods: {
      handleQuery() {
        this.loading = true
        const menuId = this.menu.value
        getPermissionList({
          menuId: menuId,
        }).then((response) => {
          const { data } = response
          if (this.role.code == this.ROOT_ROLE_CODE) {
            // 如果是超级管理员默认勾选全部且不可编辑
            this.isRoot = true
            data.map((item) => this.$set(item, 'checked', true))
            this.permissionList = data
            this.loading = false
          } else {
            this.isRoot = false
            listRolePermission(this.role.id, { menuId: menuId }).then((res) => {
              this.initialCheckedPermissionIds = res.data
              data.map((item) => {
                if (this.initialCheckedPermissionIds.includes(item.id)) {
                  item.checked = true
                }
              })
              this.permissionList = data
              this.loading = false
            })
          }
        })
      },
      menuClick(menu, role) {
        this.role = role
        this.menu = menu

        if (role && menu) {
          this.handleQuery()
        } else {
          this.permissionList = []
          this.initialCheckedPermissionIds = []
        }
      },
      handleSubmit: function () {
        const checkedPermissionIds = this.permissionList.filter((item) => item.checked).map((item) => item.id)
        // 判断选中权限是否变动
        if (
          this.initialCheckedPermissionIds.length == checkedPermissionIds.length &&
          this.initialCheckedPermissionIds.sort().every(function (v, i) {
            return v == checkedPermissionIds[i]
          })
        ) {
          this.$message.warning('数据未变动')
          return
        }
        updateRolePermission(this.menu.value, this.role.id, checkedPermissionIds).then((response) => {
          this.$message.success('提交成功' + response.msg)
        })
      },
      handleCheckAllChange(checked) {
        if (checked) {
          this.permissionList.map((item) => (item.checked = true))
        } else {
          // 全不选
          this.permissionList.map((item) => (item.checked = false))
        }
        this.isIndeterminate = false
      },
      handleCheckChange(item, val) {
        console.log('handleCheckChange', item, val)
        const checkedCount = this.permissionList.filter((item) => item.checked).length
        this.checkAll = checkedCount === this.permissionList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.permissionList.length
      },
    },
  }
</script>

<style scoped>
  .perm-container {
    margin-bottom: 20px;
  }
</style>

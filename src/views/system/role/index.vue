<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="10" :xs="24">
        <role ref="role" @roleClick="roleClick" />
      </el-col>
      <el-col :span="6" :xs="24">
        <menus ref="menu" @menuClick="menuClick" />
      </el-col>
      <el-col :span="8" :xs="24">
        <permission ref="permission" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Role from './components/Role'
  import Menus from './components/Menu'
  import Permission from './components/Permission'

  export default {
    name: 'RoleIndex',
    components: { Permission, Role, Menus },
    data() {
      return {
        role: undefined,
        menu: undefined,
      }
    },
    methods: {
      roleClick(role) {
        // console.log(role)
        this.role = role
        this.menu = undefined
        this.$refs.menu.roleClick(role)
        this.$refs.permission.menuClick(this.menu, this.role)
      },
      menuClick(menu) {
        if (!this.role) {
          this.$message.warning('请选择角色')
          return
        }
        this.menu = menu
        this.$refs.permission.menuClick(this.menu, this.role)
      },
    },
  }
</script>

<style scoped></style>

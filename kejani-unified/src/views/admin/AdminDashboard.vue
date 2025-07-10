<template>
  <div>
    <h1>Admin Dashboard</h1>
    <AdminView />
  </div>
</template>

<script>
import AdminView from './AdminView.vue'

export default {
  name: 'AdminDashboard',
  components: {
    AdminView
  }
}
</script>

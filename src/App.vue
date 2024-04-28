<template>
  <div>
    <ActivityTable :activities="activities" @toggle-completion="toggleCompletion" @remove-activity="removeActivity" />

    <h2>Form Pendaftaran Kegiatan</h2>

    <table>
      <tr>
        <td><label for="activityName">Nama Kegiatan:</label></td>
        <td><input type="text" id="activityName" v-model="activityName" required></td>
      </tr>
      <tr>
        <td><label for="activityDate">Tanggal Kegiatan:</label></td>
        <td><input type="date" id="activityDate" v-model="activityDate" required></td>
      </tr>
      <tr>
        <td><label for="activityTime">Jam Kegiatan:</label></td>
        <td><input type="time" id="activityTime" v-model="activityTime" required></td>
      </tr>
      <tr>
        <td colspan="2">
          <button @click="submitForm">Tambah Kegiatan</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import ActivityTable from './components/ActivityTable.vue';

export default {
  components: {
    ActivityTable
  },
  setup() {
    const activities = ref([]);
    const activityName = ref('');
    const activityDate = ref('');
    const activityTime = ref('');

    const submitForm = () => {
      activities.value.push({
        name: activityName.value,
        date: activityDate.value,
        time: activityTime.value,
        completed: false
      });
      activityName.value = '';
      activityDate.value = '';
      activityTime.value = '';
    };

    const toggleCompletion = index => {
      activities.value[index].completed = !activities.value[index].completed;
    };

    const removeActivity = index => {
      activities.value.splice(index, 1);
    };

    return { activities, activityName, activityDate, activityTime, submitForm, toggleCompletion, removeActivity };
  }
};
</script>

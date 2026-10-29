<script setup>
import { formatMoney, formatDate } from '~/utils/format'

const service = useRequestsService()
const auth = useAuthStore()

const requests = ref([])
const loading = ref(true)

async function load() {
  loading.value = true

  try {
    const response = await service.getRequests()
    requests.value = response.items
  } finally {
    loading.value = false
  }
}

async function changeStatus(request, status) {
  const oldStatus = request.status
  request.status = status

  try {
    await service.updateStatus(request.id, status)
  } catch {
    request.status = oldStatus
  }
}

onMounted(load)
</script>

<template>
  <section>
    <div class="page-head">
      <div>
        <span class="eyebrow">Change requests</span>
        <h1>Согласования</h1>
        <p>
          Изменения работ, бюджета и сроков.
        </p>
      </div>
    </div>

    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <div v-else class="request-list">
      <article
        v-for="request in requests"
        :key="request.id"
        class="request"
      >
        <div class="request-head">
          <div>
            <small>{{ request.projectName }}</small>
            <h3>{{ request.title }}</h3>
          </div>

          <span class="badge">
            {{ request.statusLabel }}
          </span>
        </div>

        <p>{{ request.description }}</p>

        <div class="request-meta">
          <div>
            <small>Бюджет</small>
            <strong>
              +{{ formatMoney(request.amount) }}
            </strong>
          </div>

          <div>
            <small>Срок</small>
            <strong>+{{ request.days }} дн.</strong>
          </div>

          <div>
            <small>Создано</small>
            <strong>
              {{ formatDate(request.createdAt) }}
            </strong>
          </div>
        </div>

        <div
          v-if="
            !auth.isManager &&
            request.status === 'pending'
          "
          class="request-actions"
        >
          <button
            class="button button--secondary"
            @click="changeStatus(request, 'declined')"
          >
            Отклонить
          </button>

          <button
            class="button"
            @click="changeStatus(request, 'approved')"
          >
            Согласовать
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

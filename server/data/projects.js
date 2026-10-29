// NOTE: в публичной версии используются демонстрационные данные вместо данных заказчика.

const baseStages = [
  {
    id: 1,
    title: 'Фундамент',
    status: 'done',
    statusLabel: 'Завершено',
    progress: 100,
    startDate: '2026-03-18',
    endDate: '2026-04-22',
    description:
      'Монолитные работы, гидроизоляция и ввод инженерных коммуникаций.'
  },
  {
    id: 2,
    title: 'Коробка здания',
    status: 'done',
    statusLabel: 'Завершено',
    progress: 100,
    startDate: '2026-04-23',
    endDate: '2026-07-11',
    description:
      'Несущие конструкции, перекрытия, кровля и наружный контур.'
  },
  {
    id: 3,
    title: 'Инженерные системы',
    status: 'active',
    statusLabel: 'В работе',
    progress: 72,
    startDate: '2026-07-12',
    endDate: '2026-11-08',
    description:
      'Отопление, водоснабжение, электрика, вентиляция и слаботочные сети.'
  },
  {
    id: 4,
    title: 'Чистовая отделка',
    status: 'planned',
    statusLabel: 'Запланировано',
    progress: 0,
    startDate: '2026-11-09',
    endDate: '2026-12-22',
    description:
      'Напольные покрытия, малярные работы, двери и сантехника.'
  }
]

const baseEstimate = [
  {
    id: 1,
    title: 'Подготовительные работы',
    note: 'Площадка и временные сети',
    planned: 780000,
    actual: 745000
  },
  {
    id: 2,
    title: 'Фундамент',
    note: 'Бетон, арматура и гидроизоляция',
    planned: 3120000,
    actual: 3195000
  },
  {
    id: 3,
    title: 'Коробка и кровля',
    note: 'Стены, перекрытия и фасад',
    planned: 5280000,
    actual: 5210000
  },
  {
    id: 4,
    title: 'Инженерные системы',
    note: 'ОВ, ВК, ЭОМ и слаботочные сети',
    planned: 4650000,
    actual: 3220000
  },
  {
    id: 5,
    title: 'Отделка',
    note: 'Материалы и работы',
    planned: 4570000,
    actual: 520000
  }
]

const baseActivity = [
  {
    id: 1,
    date: '2026-10-27',
    title: 'Завершен монтаж теплого пола',
    text: 'Контуры опрессованы, замечаний по системе нет.'
  },
  {
    id: 2,
    date: '2026-10-23',
    title: 'Обновлена смета',
    text: 'Учтено изменение оборудования котельной.'
  },
  {
    id: 3,
    date: '2026-10-19',
    title: 'Добавлен фотоотчет',
    text: 'Загружен новый отчет с текущего этапа работ.'
  }
]

export const projects = [
  {
    id: 'river-house',
    name: 'River House',
    type: 'Частный дом',
    address: 'Ленинградская область, Всеволожский район',
    status: 'active',
    statusLabel: 'В работе',
    progress: 68,
    budget: 18400000,
    area: 248,
    startDate: '2026-03-18',
    deadline: '2026-12-22'
  },
  {
    id: 'forest-line',
    name: 'Forest Line',
    type: 'Загородный дом',
    address: 'Ленинградская область, Курортный район',
    status: 'active',
    statusLabel: 'В работе',
    progress: 43,
    budget: 22100000,
    area: 312,
    startDate: '2026-05-12',
    deadline: '2027-02-18'
  },
  {
    id: 'north-loft',
    name: 'North Loft',
    type: 'Реконструкция',
    address: 'Санкт-Петербург, Петроградский район',
    status: 'active',
    statusLabel: 'В работе',
    progress: 81,
    budget: 9800000,
    area: 164,
    startDate: '2026-02-04',
    deadline: '2026-11-30'
  },
  {
    id: 'pine-yard',
    name: 'Pine Yard',
    type: 'Частный дом',
    address: 'Ленинградская область, Выборгский район',
    status: 'planning',
    statusLabel: 'Подготовка',
    progress: 12,
    budget: 27600000,
    area: 356,
    startDate: '2026-09-20',
    deadline: '2027-07-15'
  },
  {
    id: 'lake-view',
    name: 'Lake View',
    type: 'Гостевой дом',
    address: 'Ленинградская область, Приозерский район',
    status: 'paused',
    statusLabel: 'Приостановлен',
    progress: 35,
    budget: 7400000,
    area: 126,
    startDate: '2026-04-14',
    deadline: '2027-03-20'
  },
  {
    id: 'white-house',
    name: 'White House',
    type: 'Частный дом',
    address: 'Ленинградская область, Тосненский район',
    status: 'completed',
    statusLabel: 'Завершен',
    progress: 100,
    budget: 16300000,
    area: 238,
    startDate: '2025-09-08',
    deadline: '2026-08-26'
  },
  {
    id: 'oak-residence',
    name: 'Oak Residence',
    type: 'Частный дом',
    address: 'Ленинградская область, Гатчинский район',
    status: 'active',
    statusLabel: 'В работе',
    progress: 57,
    budget: 20500000,
    area: 284,
    startDate: '2026-04-27',
    deadline: '2027-01-24'
  }
]

export function getProject(id) {
  const project = projects.find(item => item.id === id)

  if (!project) {
    return null
  }

  return {
    ...project,
    stages: baseStages,
    estimate: baseEstimate,
    activity: baseActivity
  }
}

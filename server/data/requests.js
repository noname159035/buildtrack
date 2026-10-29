export const requests = [
  {
    id: 1,
    projectName: 'River House',
    title: 'Замена оборудования котельной',
    description:
      'Предлагается заменить базовую комплектацию на оборудование с погодозависимой автоматикой.',
    amount: 186000,
    days: 2,
    status: 'pending',
    statusLabel: 'На согласовании',
    createdAt: '2026-10-23'
  },
  {
    id: 2,
    projectName: 'Forest Line',
    title: 'Дополнительное освещение участка',
    description:
      'Добавление уличных светильников и отдельной линии управления.',
    amount: 248000,
    days: 3,
    status: 'pending',
    statusLabel: 'На согласовании',
    createdAt: '2026-10-20'
  },
  {
    id: 3,
    projectName: 'North Loft',
    title: 'Изменение отделки санузла',
    description:
      'Замена выбранной плитки и корректировка раскладки.',
    amount: 74000,
    days: 1,
    status: 'approved',
    statusLabel: 'Согласовано',
    createdAt: '2026-10-10'
  }
]

export function getStatusLabel(status) {
  return {
    pending: 'На согласовании',
    approved: 'Согласовано',
    declined: 'Отклонено'
  }[status]
}

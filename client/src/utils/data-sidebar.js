const dataSidebar = [
  {
    id: 1,
    title: "Filtrar por tipo:",
    content: [
      {
        field: 'Normal'
      },
      {
        field: 'Flying'
      },
      {
        field: 'Poison',
        // checked: 'checked'
      },
    ]
  },
  {
    id: 2,
    title: "Filtrar por:",
    content: [
      {
        field: 'Originales'
      },
      {
        field: 'Creados por mi'
      },
    ]
  },
  {
    id: 3,
    title: "Ordenar:",
    content: [
      {
        field: 'Ascendente'
      },
      {
        field: 'Descendente'
      },
    ]
  },
  {
    id: 4,
    title: "Tipo de ordenamiento",
    content: [
      {
        field: 'Ordenar por alfabeto'
      },
      {
        field: 'Ordenar por tipo'
      },
    ]
  },

]

export default dataSidebar;
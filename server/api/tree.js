const data = () => {
  return {
    message: 'Success',
    data: [
      { "id": "ajson1", "parent": "#", "text": "父節點1", "li_attr": {class: "customCSS"} },
      { "id": "ajson2", "parent": "#", "text": "父節點2", "li_attr": {class: "customCSS"}  },
      { "id": "ajson3", "parent": "ajson2", "text": "子節點1", "li_attr": {class: "customCSS"}  },
      { "id": "ajson4", "parent": "ajson2", "text": "子節點2", "li_attr": {class: "customCSS"}  },
    ]
  }
}

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      resolve(data())
    }, 1000)
  })
})
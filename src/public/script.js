document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#input-csv')
    
    input.addEventListener('change', () => {
        const file = input.files[0]
        const name = file.name
        const formData = new FormData()

        formData.append("file", file)

        if (!file) return
        if (!name.endsWith('.csv')) {
            alert('Insira um arquivo correto')
            input.value = ''
        }

        fetch('http://localhost:3000/', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    })
})
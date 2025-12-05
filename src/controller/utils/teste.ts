const testee = () => {
    const dataaa = new Date('2026-03-19').getTime()
    const currenteDate = Date.now()

    if (dataaa > currenteDate) {
        console.log('futuru')
        return
    }
    console.log('passado')
}

export default testee

let etapas = async function getCandidatos() {
    
    const res = await fetch('http://localhost:3000/candidatos/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (res.status === 200) {
        let info = await res.json()
        etapas = info.candidatos   
        //console.log(etapas)
    } else {
        alert('Erro em buscar os candidatos, tente novamente')
    }

}

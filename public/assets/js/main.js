const input = document.getElementById("search-input");
const result = document.getElementById("result");

function showResult(message, type){
    result.innerHTML = message;
    result.className = `result ${type}`; 
}

async function handleCepSearch(){
    const rawCep = input.value.replace(/\D/g,"");

if( rawCep.length != 8 ){
    showResult("CEP inválido, use 8 números (Ex: 12345678 ou 12.345-678).", "error");

} else{
    showResult("Consultando CEP...", "loading");

    const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
    if( !response.ok ){
    showResult("Falha no serviço.", "error");
    } else{
        const data = await response.json();
        if( data.erro ){
        showResult("CEP não encontrado", "error");
        } else{
        const message = 
            `<p><strong>CEP:</strong> ${data.cep || "Não Disponivel"}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro || "Não Disponivel"}</p>
            <p><strong>Complemento:</strong> ${data.complemento || "Não Disponivel"}</p>
            <p><strong>Bairro:</strong> ${data.bairro || "Não Disponivel"}</p>
            <p><strong>Cidade:</strong> ${data.localidade || "Não Disponivel"}</p>
            <p><strong>UF:</strong> ${data.uf || "Não Disponivel"}</p>
            <p><strong>Estado:</strong> ${data.estado || "Não Disponivel"}</p>
            <p><strong>Região:</strong> ${data.regiao || "Não Disponivel"}</p>
            <p><strong>DDD:</strong> ${data.ddd || "Não Disponivel"}</p>`;
            showResult(message, "success"); 
            }
        }
    }
}

input.addEventListener("keydown",function(event){
    if( event.key == "Enter" ){
    handleCepSearch();
    }  
});

input.addEventListener("input", function(){
if( input.value.trim() == "" ){
    result.innerHTML = "";
    result.className = "result";
    }
})
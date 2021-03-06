const reduceRestoValidacaoCpf = (data) => (data.reduce((previous, current) => previous + current) * 10) % 11;

const mapCpf = (cpf, nivelAvaliacao) => {
    const avaliacao = {
        'primeiraValidacao': () => cpf?.map((number, index) => (index < 9) ? +number * ((cpf.length - 1) - index) : 0),
        'segundaValidacao': () => cpf?.map((number, index) => (index < 10) ? +number * (cpf.length - index) : 0)
    }
    return avaliacao[nivelAvaliacao]();
}

exports.validateCpf = (cpf) => {
    const regex = new RegExp(/[^0-9]/g);
    cpf = cpf.replace(regex, '').split('');

    const mapPrimeiraValidacao = mapCpf(cpf, 'primeiraValidacao');
    const valuePrimeiraValidacao = reduceRestoValidacaoCpf(mapPrimeiraValidacao);
    
    if(valuePrimeiraValidacao != +cpf[cpf.length -2]){
        return false;
    }

    const mapSegundaValidacao =  mapCpf(cpf, 'segundaValidacao');
    const valueSegundaValidacao =  reduceRestoValidacaoCpf(mapSegundaValidacao);

    if(valueSegundaValidacao != +cpf[cpf.length -1]){
        return false;
    }

    const regexCpf = new RegExp(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/);
    return cpf.join('').replace(regexCpf, "$1.$2.$3-$4");
}

exports.convertNumber = (value) => {
    const segregateIntegerAndDecimals = (value + '').split('.')
    const regex = new RegExp(/\B(?=(?:\d{3})+(?!\d))/g);
    return `${(segregateIntegerAndDecimals[0] + '').replace(regex, ".")},${segregateIntegerAndDecimals[1] !== undefined ? 
        (+segregateIntegerAndDecimals[1] / 10 < 1 ? segregateIntegerAndDecimals[1]+'0' : segregateIntegerAndDecimals[1].slice(-2)) : '00'}`;
}

exports.DateNormalize = (date) => {
    const time = new Date();
    const convertDateToArray = date.split('-');
    const dateTransaction = new Date(
        convertDateToArray[0], 
        +convertDateToArray[1] - 1, 
        convertDateToArray[2], 
        time.getHours(), 
        time.getMinutes(), 
        time.getSeconds()
    );

    return dateTransaction;

}
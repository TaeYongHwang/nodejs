const axios = require('axios')


//JSON RPC form으로 만들어주는 역할
makeRPCRequest = function(funname,...params ){
    const method = 'POST', host = '127.0.0.1', port = '8332', username='bitcoin', password = 'password';
    let request = {
            method: `${method}`,
            url: `http://${host}:${port}/`,
            headers:{ 'Content-Type': 'text/plain'},
            auth: {
                username: `${username}`,
                password: `${password}`
            },
            data: JSON.stringify({
                jsonrpc: '1.0',
                method: `${funname}`,
                params : params,
            })
    }

    return request
}


//request : makeRPCRequest로 만든 JSON RPC form으로
//axios를 이용해 해당 명령을 호출시켜, 결과값을 반환함
receiveFromRequest = async function(request){
    return axios(request).then((result, err) => {
        return result.data;
    });
}

module.exports = {
    makeRPCRequest,
    receiveFromRequest,
};
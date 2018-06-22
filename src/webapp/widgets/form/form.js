const axios = require('axios');
const form = {
    post() {
        let name = document.getElementById('name');
        let password = document.getElementById('password');
        let button = document.getElementById('button');
        button.onclick = function (){
            let nameVal = name.value;
            let passwordVal = password.value;
            axios.post(`/post`, {
                'name': nameVal,
                'pwd': passwordVal
            }, {
                headers: {
                    token: `http-post`
                }
            })
              .then(res => {
                  console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
            });
        };
    }
}
export default form;


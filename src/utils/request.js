import 'whatwg-fetch';

const Host = '/api';

function jsonToQueryString(json) {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

function getData(Vue, options) {
    return function (_url, _data, opt) {
        return new Promise(function (resolve, reject) {
            let requestUrl = Host + _url;
            // const token = this.$cookie.get('samllLogin')
            console.log(window.sessionStorage.samllLogin)
            requestUrl += (requestUrl.indexOf('?') > -1 ? '&' : '?') + 'token=' + window.sessionStorage.samllLogin || '';
            fetch(requestUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    // "User-SessionID": window.sessionStorage.sessionId || "",
                },
                ...opt,
                body: JSON.stringify(_data)
                // body: _data
            }).then(function (_res) {
                return _res.json();
            }).then(function (_data) {
                switch (_data.code) {
                    case 200:
                        if (_data.sessionId) {
                            window.sessionStorage.sessionId = _data.sessionId;
                        }
                        resolve(_data);
                        break;
                    case 401:
                        window.sessionStorage.removeItem('sessionId');
                        window.sessionStorage.removeItem('userInfo');
                        window.location.assign('/#/autologin');
                        reject(_data.remark);
                        break;
                    case 404:
                        reject(_data.remark);
                        break;
                    case 408:
                        reject(_data.remark);
                        break;
                    default:
                        reject(_data.remark);
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    }
}

const vueRequest = {};
vueRequest.install = function (Vue, options) {
    Vue.prototype.getData = getData(Vue.options); // 附在原型
}

export default vueRequest;
import 'whatwg-fetch';

const Host = '/api';

function jsonToQueryString(json) {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}

function getData(Vue, options) {
    return function (_url, _data, type) {
        return new Promise(function (resolve, reject) {
            let requestUrl = Host + _url;
            const token = window.sessionStorage.samllLogin || ''
            if (token) {
                requestUrl += (requestUrl.indexOf('?') > -1 ? '&' : '?') + 'token=' + window.sessionStorage.samllLogin || '';
            }
            fetch(requestUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": type ? "application/x-www-form-urlencoded" : "application/json;charset=utf-8",
                    // "User-SessionID": window.sessionStorage.sessionId || "",
                },
                body: _data
            }).then(function (_res) {
                return _res.json();
            }).then(function (_data) {
                switch (_data.code) {
                    case 0:
                        resolve(_data);
                        break;
                    case 500:
                        // window.sessionStorage.removeItem('sessionId');
                        // window.sessionStorage.removeItem('userInfo');
                        window.location.assign('/#/login');
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
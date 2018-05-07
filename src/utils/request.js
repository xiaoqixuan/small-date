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
            let requestUrl = '/scrm-web' + (_url.indexOf('wechat') > -1 ? _url : (Host + _url));
            // let requestUrl = _url.indexOf('wechat') > -1 ? _url : (Host + _url);
            // let requestUrl = Host + _url;
            const token = window.sessionStorage.samllLogin || ''
            // if (token) {
            //     requestUrl += (requestUrl.indexOf('?') > -1 ? '&' : '?') + 'token=' + window.sessionStorage.samllLogin || '';
            // }
            // 根据type判断是否为表单提交
            _data = type ? jsonToQueryString(_data) : JSON.stringify(_data)
            fetch(requestUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": type ? "application/x-www-form-urlencoded" : "application/json;charset=utf-8",
                    // "User-SessionID": window.sessionStorage.sessionId || "",
                    "token": window.sessionStorage.samllLogin || ''
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
                        if (_data.msg.indexOf('token') > -1) {
                            window.location.assign('/#/login');
                        }
                        reject(_data.msg);
                        break;
                    case 404:
                        reject(_data.msg);
                        break;
                    case 408:
                        reject(_data.msg);
                        break;
                    default:
                        reject(_data.msg);
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
function defineAPI({type = "GET", url}) {
    return (options) => {
        'use strict';
        var {data, URLSuffix = ""} = options;
        var xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open(type, url + URLSuffix);
            xhr.send(data);
        });
    };
}
export class EasyAPI {
    constructor(config = false) {
        this.baseUrl = window.location.origin;
        config && this._DEFINE_(config);
    }

    _DEFINE_(config = {}) {
        var _traverse = (handles, urlPrefix, target) => {
            Object.keys(handles).forEach(handle => {
                var {type, url = urlPrefix + "/" + handle, children = false} = handles[handle];
                target[handle] = defineAPI({
                    type,
                    url
                });
                children && _traverse(children, url, target[handle]);
            });
        };
        _traverse(config, this.baseUrl, this);
    }

    get root() {
        return this[''] ? this[''] : () => new Promise().reject();
    }
}
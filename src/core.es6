import {EventChain} from './lib/EventChain.es6';
import {EasyAPI} from './lib/EasyAPI.es6';
import {config} from './config.es6';

class CoinApp extends EventChain {
    constructor(config) {
        super();
        this.API = new EasyAPI(config.APIConfig);
        this.templates = {};

        this._renderTarget = null;
        this._config = config;
    }

    useTemplates(templates = this._config.templates) {
        templates.forEach(templateName => {
            var container = document.createElement('div');
            this.templates[templateName] = container;
            this.API.templates({
                URLSuffix: templateName + ".html"
            }).then(templateSource => {
                container.innerHTML = templateSource;
            });
        });
        return this;
    }
}

window.app = new CoinApp(config);
app.useTemplates();
document.body.appendChild(app.templates.header);
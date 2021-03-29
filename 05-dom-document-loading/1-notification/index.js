export default class NotificationMessage {
    constructor ({
       message = ''
    },{
        duration = 1000,
        type = 'success' 
    } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    get createTemplate() {
        return `
        <div class="notification success" style="--value: ${this.duration}">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
            </div>
        </div>
        `
    }

    render () {
        const element = document.createElement('div');

        element.innerHTML = this.createTemplate;

        this.element = element.firstElementChild;
    }
}

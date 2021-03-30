export default class NotificationMessage {
    constructor (message = 'default message', {
        duration = 10,
        type = 'success' 
    } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;
    }

    get createTemplate() {
        return `
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
            </div>
        `
    }

    messageCreate () {
        const wrapper = document.querySelector('.wrapper');
        const element = document.createElement('div');

        element.setAttribute('class',`notification ${this.type}`);
        element.setAttribute('style',`--value: ${this.duration}ms`)
        
        element.innerHTML = this.createTemplate;

        return wrapper.append(element);
    }

    show() {
        const button = document.getElementById('btn1');
        let activeMsg = button.getAttribute('data-active-message');
        
        if (activeMsg === 'false') {
            this.messageCreate();

            button.setAttribute('data-active-message','true');

            button.disabled = true;

            setTimeout(this.destroy, this.duration);
        }
    }

    destroy() {
        const msg = document.querySelector('.notification');
        const button = document.getElementById('btn1');

        msg.remove();

        button.setAttribute('data-active-message','false');
        button.disabled = false;
    }
}

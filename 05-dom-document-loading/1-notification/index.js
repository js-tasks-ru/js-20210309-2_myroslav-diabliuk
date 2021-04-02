export default class NotificationMessage {
    constructor (message = '',{
        duration = 1000,
        type = 'success' 
    } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    get template() {
        return `
            <div class="notification ${this.type}" style="--value: ${this.duration}ms">
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

        element.innerHTML = this.template;

        this.element = element.firstElementChild;
	}

	additionalFunction(button = document.getElementById('btn1')) {
		this.remove();	
		button.setAttribute('style', 'pointer-events: auto');
	}
	
	show(parent = document.body, button = document.getElementById('btn1')) {		
		parent.append(this.element);
		button.setAttribute('style', 'pointer-events: none');

		setTimeout(() => {
			this.additionalFunction();
		}, this.duration);
	}

	remove() {
		this.element.remove();
	}

	destroy() {
		this.remove();
	}
}

class Tooltip {
    elemTooltip;

    mouseOver = event => {
        const elemTooltip = event.target.closest('[data-tooltip]');

        if (elemTooltip) {
            this.render(elemTooltip.dataset.tooltip);

            document.addEventListener('mousemove', this.mouseMove);
        }
    }

    mouseOut = () => {
        this.removeTooltip();
    }

    mouseMove = event => {
        this.elemTooltip.style.top = `${event.clientY + 10}px`;
        this.elemTooltip.style.left = `${event.clientX + 10}px`;
    }

    removeTooltip() {
        if (this.elemTooltip) {
            this.elemTooltip.remove();
            this.elemTooltip = null;
        
            document.removeEventListener('mousemove', this.mouseMove);
        }
    }

    render(html) {
        this.elemTooltip = document.createElement('div');

        this.elemTooltip.className = 'tooltip';
        this.elemTooltip.innerHTML = html;

        document.body.append(this.elemTooltip);
    }

    initialize() {
        document.addEventListener('mouseover', this.mouseOver);
        document.addEventListener('mouseout', this.mouseOut);
    }

    destroy() {
        document.removeEventListener('mouseover', this.mouseOver);
        document.removeEventListener('mouseover', this.mouseOver);

        this.remove();
    }
}

export default Tooltip;

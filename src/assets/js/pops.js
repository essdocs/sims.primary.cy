const lut = [];
for (let i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

function guid() {
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

function subPub() {
    return {
        subscribers: {},
        subscribe: function (subscriber) {
            const key = guid();
            this.subscribers[key] = subscriber;

            return key;
        },
        publish: function (args) {
            for (var sub in this.subscribers) {
                try {
                    this.subscribers[sub](args);
                } catch (ignore) {
                    //ingore
                }
            }
        },
        unsubscribe: function (key) {
            delete this.subscribers[key];
        }
    };
}
const defaultState = {
    activeLink: undefined,
    activeToken: '',
    shouldShow: false,
    isUserDwelling: false
};

let currentState = defaultState;

const events = subPub();

const actions = {
    'LINK_DWELL': 'LINK_DWELL',
    'DISMISS': 'DISMISS',
    'ABANDON_END': 'ABANDON_END',
    'PREVIEW_DWELL': 'PREVIEW_DWELL',
    'ABANDON_START': 'ABANDON_START',
    'PREVIEW': 'PREVIEW'
};

function updateState(state = defaultState, action) {
    switch (action.type) {

        case actions.LINK_DWELL:
            if (action.el !== state.activeLink) {
                return {
                    ...state,
                    activeLink: action.el,
                    activeToken: action.token,
                    shouldShow: false,
                    isUserDwelling: true
                };
            }
            return {
                ...state,
                isUserDwelling: true
            };
        case actions.DISMISS:
            if (action.token === state.activeToken) {
                return {
                    ...state,
                    activeLink: undefined,
                    activeToken: undefined,
                    isUserDwelling: false,
                    shouldShow: false
                };
            }
            return state;

        case actions.ABANDON_END:
            if (action.token === state.activeToken && !state.isUserDwelling) {
                return {
                    ...state,
                    activeLink: undefined,
                    activeToken: undefined,
                    shouldShow: false
                };
            }
            return state;

        case actions.PREVIEW_DWELL:
            return {
                ...state,
                isUserDwelling: true
            };

        case actions.ABANDON_START:
            return {
                ...state,
                isUserDwelling: false
            };
        case actions.PREVIEW:
            if (action.token === state.activeToken) {
                return {
                    ...state,
                    shouldShow: state.isUserDwelling
                };
            }
            return state;
        default:
            return state;
    }
}

function subscribe(handler) {
    return events.subscribe(handler);
}

function unsubscribe(key) {
    return events.unsubscribe(key);
}

function publish(action) {

    const newState = updateState(currentState, action);

    currentState = newState;
    events.publish(currentState);
}


function getState() {
    return currentState;
}

const FETCH_START_DELAY = 150; // ms.

const FETCH_COMPLETE_TARGET_DELAY = 500; // ms.

const ABANDON_END_DELAY = 300; // ms.

function wait(delay) {

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}


const template = `<div class="popover" role="popover">
    <div class="arrow"></div>
    <div class="popover-header"></div>
    <div class="popover-body"></div>
</div>`;

function abandon() {
    const token = getState().activeToken;

    if (!token) {
        return;
    }

    publish({
        type: actions.ABANDON_START,
        token
    });

    wait(ABANDON_END_DELAY)
        .then(() => {

            publish({
                type: actions.ABANDON_END,
                token
            });

        });
}

function dismiss() {
    const token = getState().activeToken;

    if (!token) {
        return;
    }

    publish({
        type: actions.DISMISS,
        token
    });
}

function setupPopover($initiatingElement) {

    if (!$initiatingElement.data('bs.popover')) {

        const popoverOptions = {
            template: template,
            trigger: 'manual',
            animation: false,
            container: 'body',
            
            placement: $initiatingElement.data('placement') || 'auto',
            html: true
        };

        $initiatingElement.popover(popoverOptions);
    }

    $initiatingElement.popover('show');

    return false;
}

function handleUpdate() {

    const localState = getState();
    const $this = $(this);
    const bsPopover = $this.data('bs.popover');
    const isOpen = bsPopover ? bsPopover._popper && bsPopover._popper.state && !bsPopover._popper.state.isDestroyed : false;
    const token = $this.data('popover.token');

    if (isOpen && !localState.shouldShow) {
        $this.popover('hide');
    }

    if (localState.shouldShow && localState.activeToken === token && !isOpen) {

        let hasPopover = true;
        if (!$this.data('bs.popover')) {
            hasPopover = false;
       }
        setupPopover($this);

        if (!hasPopover) {
            const $popover = $($this.data('bs.popover').getTipElement());

            if (!window.USER_IS_TOUCHING) {
                $popover.on('mouseover', function () {
                    publish({
                        type: actions.PREVIEW_DWELL
                    });
                }).on('mouseleave', abandon);
            }

            $this.on('dismiss.bs.popover', dismiss);
        }
    }

}

const selector = '[data-toggle="popover"]';

$("body").on("focus mouseover", selector, function (e) {

    e.preventDefault();
    e.stopPropagation();
    var $initiatingElement = $(this);
    const target = this;

    if (!$initiatingElement.data('popover.subscribeKey')) {
        const key = subscribe(() => {
            handleUpdate.apply(this);
        });
        $initiatingElement.data('popover.subscribeKey', key);
        $initiatingElement.on('remove', function () {
            unsubscribe(key);
        });
    }

    if (!window.USER_IS_TOUCHING) {
        const oldToken = $initiatingElement.data('popover.token');
        const token = oldToken || guid();
        if (oldToken !== token) {
            $initiatingElement.data('popover.token', token);
        }

        const action = {
            type: actions.LINK_DWELL,
            el: target,
            token
        };

        const isNewInteraction = () => getState().activeToken === token;

        publish(action);

        if (!isNewInteraction()) {
            return;
        }

        wait(FETCH_START_DELAY)
            .then(() => {
                if (isNewInteraction()) {

                    wait(FETCH_COMPLETE_TARGET_DELAY - FETCH_START_DELAY)
                        .then(() => {
                            publish({
                                type: actions.PREVIEW,
                                el: target,
                                token
                            });
                        });
                }
            });

        return false;
    }

});

$("body").on("blur mouseleave", selector, abandon);

$("body").on("click", '[data-dismiss="popover"]', function hideThisPopover() {
    const $popover = $(this).closest('.popover');
    const bsPopover = $popover.data('bs.popover');
   
    $(bsPopover.element).trigger('dismiss.bs.popover');
    $popover.popover('hide');   
});
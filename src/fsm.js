class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.currState = config.initial;
        this.states = config.states;
        this.start = config.initial;
        this.story = [];
        this.undoStory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states == false) {
            throw new Error();
        }
        this.story.push(this.currState);
        this.currState = state;
        this.undoStory = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.currState].transitions[event] != undefined){
            this.story.push(this.currState);
            this.currState = this.states[this.currState].transitions[event];
            this.undoStory = [];
        }
        else
            throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial = this.start;
        this.currState = this.start;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event != undefined) {
            let currStates = [];
            for (let key in this.states)
                if (this.states[key].transitions[event] != undefined)
                    currStates.push(key);

            return currStates;
        }
        else {
            let allStates = [];
            for (let key in this.states)
                allStates.push(key);

            return allStates;
        }

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.story.length == 0) {
            return false;
        }
        else {
            let popped = this.story.pop();
            this.undoStory.push(this.currState);
            this.currState = popped;

            return true;
        }
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoStory.length == 0) {
            return false;
        }
        else {
            let popped = this.undoStory.pop();
            this.currState = popped;

            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.story = [];
        this.undoStory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

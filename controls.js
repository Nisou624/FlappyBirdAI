class controls{
    constructor(){
        this.jump = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners(){
        document.onkeydown = (event) =>{
            if (event.key == ' ' || event.key == 'ArrowUp'){
                this.jump = true;
            }
        }

        document.onkeyup = (event) =>{
            if (event.key == ' ' || event.key == 'ArrowUp'){
                this.jump = false;
            }
        }
    }
}
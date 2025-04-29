const buttonIMC = document.querySelector("#button-imc");
const controllerBox = document.querySelector("#controller-imc-box");

const inputs = {
    height: document.querySelector("#value-height"),
    weight: document.querySelector("#value-weight")
}

const boxInformationIMC = document.querySelector("#box-information-imc");
const showIMC = document.querySelector("#imc");
const leaveBoxInformationIMC = document.querySelector("#icon-leave");
const messageError = document.querySelector("#message-error");
const containerResultIMC = document.querySelector("#container-result-imc #imc");
const messageInfoState = document.querySelector("#message-info-state");

function errorValue(nameError) {

    messageError.classList.add("error-show");
    messageError.textContent = nameError;

    if (messageError.textContent === "") {
        messageError.classList.remove("error-show");
        return;
    }

}

function classListAdd(name, value) {
    name.classList.add(value)
}


function removeClassList(value, value2, value3,) {
    boxInformationIMC.classList.remove(value);
    containerResultIMC.classList.remove(value2);
    messageInfoState.classList.remove(value3)
}

class CalculatorIMC {
    constructor(height, weight) {
        this.height = height;
        this.weight = weight;
        this.validationFinished = false;
        this.IMC = 0;
    }

    validation() {

        this.height = Number(this.height);
        this.weight = Number(this.weight);

        if (!this.height || this.height < 1) {
            return errorValue("Height invalid. Height necessary value bigger zero.")
        }

        if (!this.weight || this.weight < 1) {
            return errorValue("Weight invalid. Weight necessary value bigger zero.")
        }

        errorValue("");
        this.validationFinished = true;

    }

    imcResult() {
        if (this.validationFinished) {
            this.IMC = this.weight / Math.pow(this.height, 2);
            return this.IMC;
        }
    }

    imcState() {

        const stateTypes = {
            underWeight: 18.6,
            healthy: [18.7, 23.9],
            overWeight: [24.0, 26.7],
            obese: 26.8
        }

        if (this.validationFinished) {

            this.IMC = this.IMC.toFixed(2);

            if (this.IMC <= stateTypes.underWeight) {
                classListAdd(boxInformationIMC, "shadow-blue");
                classListAdd(containerResultIMC, "imc-border-blue");
                classListAdd(messageInfoState, "blue");
                messageInfoState.textContent = "You are underweight!"

            } else if (this.IMC >= stateTypes.healthy[0] && this.IMC <= stateTypes.healthy[1]) {
                classListAdd(boxInformationIMC, "shadow-green");
                classListAdd(containerResultIMC, "imc-border-green");
                classListAdd(messageInfoState, "green");
                messageInfoState.textContent = "You are healthy!"   

            } else if (this.IMC >= stateTypes.overWeight[0] && this.IMC <= stateTypes.overWeight[1]) {
                classListAdd(boxInformationIMC, "shadow-red");
                classListAdd(containerResultIMC, "imc-border-red");
                classListAdd(messageInfoState, "red");
                messageInfoState.textContent = "You are overweight!"

            } else if (this.IMC >= stateTypes.obese) {
                classListAdd(boxInformationIMC, "shadow-red");
                classListAdd(containerResultIMC, "imc-border-red");
                classListAdd(messageInfoState, "red");
                messageInfoState.textContent = "You are obese!"    
            }

            boxInformationIMC.classList.add("show-box-information");

            showIMC.textContent = this.IMC;

        }

    }

}

buttonIMC.addEventListener("click", () => {
    const imc = new CalculatorIMC(inputs.height.value, inputs.weight.value);
    imc.validation();
    imc.imcResult();
    imc.imcState();
})

leaveBoxInformationIMC.addEventListener("click", (e) => {
    removeClassList("shadow-blue", "imc-border-blue", "blue")
    removeClassList("shadow-green", "imc-border-green", "green")
    removeClassList("shadow-red", "imc-border-red", "red")
    boxInformationIMC.classList.remove("show-box-information")
})


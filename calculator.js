function MyCalculator(formula) {
            this.formula = formula.replace(/[^1234567890+x]/g,'');
            this.histInput = [];
            this.showHistInput = function() {
                document.getElementById('histInput').innerHTML = this.histInput;
            }
            this.showFormula = function() {
                document.getElementById('formula').innerHTML = "The formula is: " + this.formula;
            }
            this.calculate = function() {
                // Instantiate local variables
                var inputStack = [this.formula];
                var preorderStack = [];
                var answerStack = [];
                var precedence = ['+', 'x'];  // this is in reverse order of precedence.
                var splitIndex = ""
                var A = "";
                var B = "";
                var limit = 0;
                var len = "";
                var history = {
                    "answerStack": [],
                    "inputStack": [],
                    "preorderStack": []
                };
                var historyAnswerStack = [];


                // Step 1 ------------------
                while (true) {
                    if (limit > 99) {break;}
                    if (inputStack.length <= 0) {break;}

                    for (var i = 0; i < precedence.length; i++ ) {

                        len = inputStack.length-1;
                        splitIndex = inputStack[len].indexOf(precedence[i]);

                        if (splitIndex >= 0) {
                            A = inputStack[len].slice(0, splitIndex);
                            B = inputStack[len].slice(splitIndex+1);
                            preorderStack.push(inputStack[len].slice(splitIndex, splitIndex+1));
                            inputStack.pop();
                            inputStack.push(B);
                            inputStack.push(A);
                            // this.histInput.push(inputStack);
                        } 
                    }
                    preorderStack.push(inputStack.pop());
                    // function() {document.getElementById('render').innerHTML = "Testing, testing, 123";}
                    limit++;
                }

                // Step 2 ------------------
                for (var i = preorderStack.length-1; i >= 0; i-- ) {

                    len = answerStack.length-1
                    A = preorderStack.pop();
                    
                    if (A == 'x') {
                        // Do Multiplication
                        B = Number(answerStack[len] * answerStack[len-1]);
                    } else if (A == '+') {
                        // Do Addition
                        B = Number(answerStack[len] + answerStack[len-1]);  
                    } else {
                        // Push number to answerStack
                        answerStack.push(Number(A));
                        console.log(answerStack);
                        history["answerStack"].push(answerStack);
                        historyAnswerStack.push(answerStack);
                        // console.log(history["answerStack"]);
                        console.log(historyAnswerStack);
                        continue;
                    }
                    answerStack.pop();
                    answerStack.pop();
                    answerStack.push(B);
                    history["answerStack"].push(answerStack);
                    historyAnswerStack.push(answerStack);
                }
                
            }
        }
        
function doCalculation(formula) {
    var calc = new MyCalculator(formula);
    console.log(formula);
    calc.calculate();
}
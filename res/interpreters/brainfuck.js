function execute(code, input) {
    clearOutput();
    var input = input.split("");
    input.push("\n");
    var tape = [0];
    var loops = {};
    var cell_index = 0;
    var ip = 0;
    
    var loop_stack = [];
    for(const [ip, instruction] of code.split("").entries()) {
        if(instruction == "[") {
            loop_stack.push(ip);
        } else if(instruction == "]") {
            var beginning_index = loop_stack.pop();
            loops[beginning_index] = ip;
            loops[ip] = beginning_index;
        }
    }
    
    while(ip < code.length) {
        instruction = code[ip]
        if(instruction == "+") {
            tape[cell_index]++;
            if(tape[cell_index] == 256)
            tape[cell_index] = 0;
        } else if(instruction == "-") {
            tape[cell_index]--;
            if(tape[cell_index] == -1)
            tape[cell_index] = 255;
        } else if(instruction == "<") {
            cell_index--;
        } else if(instruction == ">") {
            cell_index++;
            if(cell_index == tape.length)
            tape.push(0);
        } else if(instruction == ".") {
            output(String.fromCharCode(tape[cell_index]));
        } else if(instruction == ",") {
            tape[cell_index] = input.shift().charCodeAt(0);
        } else if(instruction == "[") {
            if(!tape[cell_index])
                ip = loops[ip];
        } else if(instruction == "]") {
            if(tape[cell_index])
                ip = loops[ip];
        }
        ip++;
    }
}

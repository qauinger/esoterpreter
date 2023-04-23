function execute(code, input, con) {
    clearOutput();
    var accumulator = 0;
    var ip = 0;

    while(ip < code.length) {
        instruction = code[ip]
        if(instruction == "i")
            accumulator++;
        else if(instruction == "d")
            accumulator--;
        else if(instruction == "s")
            accumulator = Math.pow(accumulator, 2);
        else if(instruction == "o")
            output(accumulator + " ");
        if(accumulator == 256 || accumulator == -1)
            accumulator = 0;
        ip++;
    }
}

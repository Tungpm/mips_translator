/**
 * Created by Son Pham on 10/25/2016.
 */

var nodeArray = new Array();

function convertTextToMips(data) {
    // Split by line
    var line_data = data.split(/\n/);
    var inst_data;
    var res = ""; // Store the resulting string
    var mips;

    // Loop through all the line
    line_data.forEach (function(line) {
        line = line.trim();

        // Loop through all the inst
        if (line.substring(0,2) == "/*") {
            res += line + "\n";
        } else {
            inst_data = line.split(" ");
            inst_data.forEach (function(inst) {
                if (inst[0] == '@') {
                    res += inst + "\n";
                } else try {
                    mips = convertHexToMips(inst);
                    res += inst + " - " + mips + "\n"
                } catch(e) {
                    res += inst + "\n";
                }
            });
        }
        res += "\n";
    });

    return res;
}

function convertTextToHex(data) {
    // Split by line
    var line_data = data.split(/\n/);
    var res = "@00100000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000\n" +
              "@00100008 00000000 00000000 00000000 00000000 "; // Store the resulting string

    var count = 4;
    var line_name = 0x00100008;
    // Loop through all the line
    line_data.forEach (function(line) {
        line = line.trim();
        try {
            res += convertMipsToHex(line) + " ";
        } catch (e) {
            res += line + "\nERROR - Instruction " + line + " at @" + line_name.toString(16) + " is INVALID."
            return res;
        }
        count += 1;
        if (count % 8 == 0) {
            count = 0;
            line_name += 8;
            res += "\n@" + line_name.toString(16) + " "
        }
    });
    return res;
}

dummy_data = "addi t1 t1 0x0"
console.log(convertTextToHex(dummy_data))

function submitHex() {
    input_element = document.getElementById("hex_text").value;
    output_element = convertTextToMips(input_element);
    document.getElementById("mips_text").value = output_element;
}

function submitMips() {
    input_element = document.getElementById("mips_text").value;
    output_element = convertTextToHex(input_element);
    document.getElementById("hex_text").value = output_element;
}

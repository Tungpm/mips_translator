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

function myFunction() {
    input_element = document.getElementById("input_hex").value;
    output_element = convertTextToMips(input_element);
    document.getElementById("output_mips").value = output_element;
}
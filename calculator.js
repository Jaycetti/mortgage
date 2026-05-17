function mortCalc(myform) {
    var price = parseInt(document.Form1.Amount.value, 10);
    if (isNaN(price)) {
        alert("Please enter a number. Do not use a dollar sign or commas.");
        document.Form1.Amount.focus();
        return false;
    }

    var interest = parseFloat(document.Form1.Rate.value);
    if (isNaN(interest)) {
        alert("Please enter an interest rate, like 7.9.");
        document.Form1.Rate.focus();
        return false;
    }

    var numYears = parseInt(document.Form1.Years.value, 10);
    if (isNaN(numYears) || numYears === 0) {
        alert("Please select the number of years.");
        document.Form1.Years.focus();
        return false;
    }

    document.Form1.Payment.value = punctuation(String(monthly(price, interest, numYears)));
    return false;
}

function monthly(price, interest, numYears) {
    var IntRate = interest / 1200;
    var Pmts = numYears * 12;
    var pay = price;
    return pay * (IntRate / (1 - (1 / Math.pow(1 + IntRate, Pmts))));
}

function punctuation(valuein) {
    valuein = String(valuein);
    var formatStr = "";
    var Odollars = "";
    var decpos = valuein.indexOf(".");

    if (decpos === -1) {
        decpos = valuein.length;
    }

    var dollars = valuein.substring(0, decpos);
    var Fdollars = dollars.length;

    if (Fdollars > 3) {
        while (Fdollars > 0) {
            var Tdollars = dollars.substring(Fdollars - 3, Fdollars);
            if (Tdollars.length === 3) {
                Odollars = "," + Tdollars + Odollars;
                Fdollars = Fdollars - 3;
            } else {
                Odollars = Tdollars + Odollars;
                Fdollars = 0;
            }
        }

        if (Odollars.substring(0, 1) === ",") {
            dollars = Odollars.substring(1, Odollars.length);
        } else {
            dollars = Odollars;
        }
    }

    var cents = valuein.substring(decpos + 1, decpos + 3);
    if (cents === "") {
        cents = "00";
    }
    if (cents.length === 1) {
        cents = cents + "0";
    }

    formatStr = "$" + dollars + "." + cents;
    return formatStr;
}

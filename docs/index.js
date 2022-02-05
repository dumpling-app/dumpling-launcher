function setWarning(warningText) {
    document.getElementById("compatibility-text").innerText = warningText;
    document.getElementById("compatibility-warning").hidden = false;
}

function launchExploit() {
    var paths = window.location.pathname.split("/");
    if (paths[paths.length-1].substring(0, 6) == "index." || paths[paths.length-1] == "") {
        paths.pop();
    }
    paths.push(exploit_page);
    window.location.pathname = paths.join("/");
}

function checkCompatibility() {
    if (document.getElementById("ignore-compatibility").checked) {
        return launchExploit();
    }

    var userAgentDetails = navigator.userAgent.match(/\S+ \((.*?)\) .* (?:NintendoBrowser\/(\d+\.\d+\.\d+\.(\d+)\.(\w\w)))?/);
    if (userAgentDetails.length < 2) {
        return setWarning("Couldn't determine what device you're using.");
    }

    if (userAgentDetails[1] == "Nintendo WiiU") {
        if (userAgentDetails.length != 5) {
            return setWarning("Couldn't determine your Wii U's browser version!");
        }
        
        if (userAgentDetails[2].substring(0, 5) == "4.3.2" || userAgentDetails[2].substring(0, 5) == "4.3.1" || userAgentDetails[2].substring(0, 5) == "4.3.0") {
            return launchExploit();
        }
        else {
            // Not using a user agent that would indicate the system firmware is on 5.5.0 - 5.5.2
            const commitVersion = parseInt(userAgentDetails[3]);
            if (commitVersion < 11224) {
                return setWarning("You seem to be using an outdated Wii U firmware version. This launcher is only for 5.5.0 - 5.5.2, so try seeing if you can update to that.");
            }
            else if (commitVersion > 11274) {
                return setWarning("You seem to be using a Wii U firmware version that's newer then the versions that are confirmed to be working with this launcher, which are 5.5.0 - 5.5.2.\n");
            }
            else {
                return setWarning("Couldn't determine the Wii U firmware that you seem to be using.");
            }
        }
    }
    else {
        return setWarning("Couldn't determine whether you're using an actual Wii U. This launcher can only work on Wii U's!");
    }
}
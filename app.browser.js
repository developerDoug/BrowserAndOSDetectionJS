
app.browser = function () {

    var _os = function () {

        var _userAgent = navigator.userAgent;

        return {
            getOSName: function () {

                if (_userAgent.indexOf("Win") >= 0) {

                    var pattern = /Windows NT (\d\.\d)/;

                    if (pattern.test(_userAgent)) {

                        var arr = _userAgent.match(pattern);

                        var versionNumber = parseFloat(arr[1]);

                        switch (versionNumber) {
                            case 6.2:
                                return "Windows 8";
                            case 6.1:
                                return "Windows 7";
                            case 6.0:
                                return "Windows Vista";
                            case 5.2:
                                return "Windows XP 64bit";
                            case 5.1:
                                return "Windows XP";
                            case 5.0:
                                return "Windows 2000";
                            case 4.0:
                                return "Windows NT 4.0";
                        }
                    }

                    return "Windows";
                }
                if (_userAgent.indexOf("Mac") >= 0) {

                    //  This regex will match a mac on intel / ppc and specific version
                    //  JavaScript provides first class support to regex expressions like the following
                    //  The '/' starts the regex and the '/' just before the ';' ends it
                    //  The '(?:xxxxx)' are non-capturing parentheses
                    //  The '(?:Intel|PPC)' and can be rewritten with out non-capturing parentheses '(Intel|PPC)' means
                    //      find either intel or ppc (power pc)
                    //  The next set of parentheses are capturing parentheses
                    //  To make things easier, by removing the capturing parentheses
                    //  Looks like this with out it: '\d\d[._]\d([._]\d+)?'
                    //  The '[._]' is a character class, a regex thing, and looks for either a 'dot' or 'underscore'
                    //  The '\d+' means find at least one digit up to n.
                    //  Basically, find something like this: '10.6.8' or '10_6_8' or '10_6' or '10.6'
                    //  The '(xxx)?' means optional so a '10.6' or '10_6' could be matched and
                    //      '10.6.8' or '10_6_8' could be matched
                    //  Remember \d is for number, well a digit, and our pattern is 'xx.x.x'
                    //  With the capturing parentheses I can get just the number part and append a 'dot' to each set.
                    //  The reason for this is Safari and Chrome have the os version like this 'Intel Mac OS X 10_6_8' but
                    //      Firefox use this 'Intel Mac OS X 10.6.8'

                    var pattern = /(?:Intel|PPC)? Mac OS X (\d\d)[._](\d)(?:[._](\d+))?/;

                    if (pattern.test(_userAgent)) {

                        var arr = _userAgent.match(pattern);

                        var macVersion = arr[1] + "." + arr[2];

                        if (arr[3]) {
                            macVersion += "." + arr[3];
                        }

                        return "Mac OS X " + macVersion;
                    }
                    return "Mac OS X";
                }
                if (_userAgent.indexOf("Lin") >= 0) {
                    return "Linux";
                }

                return "Unknown OS";
            }
        };

    } ();

    var _userAgent = navigator.userAgent;

    return {
        getBrowserName: function () {

            if (_userAgent.indexOf("MSIE") >= 0) {
                return "Internet Explorer";
            }
            if (_userAgent.indexOf("Chrome") >= 0) {
                return "Chrome";
            }
            if (_userAgent.indexOf("Safari") >= 0) {
                return "Safari";
            }
            if (_userAgent.indexOf("Firefox") >= 0) {
                return "Firefox";
            }
            if (_userAgent.indexOf("Opera") >= 0) {
                return "Opera";
            }
            if (_userAgent.indexOf("Netscape") >= 0 || _userAgent.indexOf("Navigator") >= 0) {
                return "Netscape";
            }

            return "Unsupported Browser";
        },
        getBrowserVersion: function () {
            if (this.isIE()) {
                // determine ie version, ie in agent string looks like this:
                // xxxx MSIE 7.0; xxxxxx
                var pattern = /MSIE (\d+\.\d+);/;
                if (pattern.test(_userAgent)) {
                    return _userAgent.match(pattern)[1];
                }
            }
            if (this.isChrome()) {
                // xxxx Chrome/xx.x.xxx.xx
                var pattern = /Chrome\/(\d+)\.(\d+)(?:\.(\d+))?(?:\.(\d+))?/;
                if (pattern.test(_userAgent)) {

                    var arr = _userAgent.match(pattern);

                    var versionNumber = arr[1] + "." + arr[2];

                    if (arr[3]) {
                        versionNumber += "." + arr[3];
                    }

                    if (arr[4]) {
                        versionNumber += "." + arr[4];
                    }

                    return versionNumber;
                }
            }
            if (this.isSafari()) {
                var pattern = /Version\/(\d+\.\d+)/;
                if (pattern.test(_userAgent)) {
                    return _userAgent.match(pattern)[1];
                }
            }
            if (this.isFirefox()) {
                var pattern = /Firefox\/(\d+\.\d+)/;
                if (pattern.test(_userAgent)) {
                    return _userAgent.match(pattern)[1];
                }
            }
            if (this.isOpera()) {
                var pattern = /Opera\/(\d+\.\d+)/;
                if (pattern.test(_userAgent)) {
                    return _userAgent.match(pattern)[1];
                }
            }
            if (this.isNetscape()) {
                var pattern = /Netscape\/(\d+\.\d+)/;
                if (pattern.test(_userAgent)) {
                    return _userAgent.match(pattern)[1];
                }
                else {
                    pattern = /Navigator\/(\d+\.\d+)/;
                    if (pattern.test(_userAgent)) {
                        return _userAgent.match(pattern)[1];
                    }
                }
            }

            return "";
        },
        isChrome: function () {
            return _userAgent.indexOf("Chrome") >= 0;
        },
        isFirefox: function () {
            return _userAgent.indexOf("Firefox") >= 0;
        },
        isIE: function () {
            return _userAgent.indexOf("MSIE") >= 0;
        },
        isMozillaBased: function () {
            var pattern = /Gecko\/(\d+)?/;
            if (pattern.test(_userAgent)) {
                return true;
            }
            return false;
        },
        isNetscape: function () {
            return (_userAgent.indexOf("Netscape") >= 0 || _userAgent.indexOf("Navigator") >= 0)
        },
        isOpera: function () {
            return _userAgent.indexOf("Opera") >= 0;
        },
        isSafari: function () {
            return _userAgent.indexOf("Safari") >= 0;
        },
        isWebkitBased: function () {
            var pattern = /WebKit/;
            if (pattern.test(_userAgent)) {
                return true;
            }
            return false;
        },
        os: _os
    };
} ();
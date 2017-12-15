# AML-Translator
Uses NodeJS, npm, regular expressions, while loops, string parsing, and array manipluation

install dependencies with:
``` bash
npm install
```

Validate functionality with:
``` bash
npm test
```

Introduction

In the year 2018, radiation from a solar flare mutates the Hubble Space Telescope allowing us to receive data being transmitted on the extra-terrestrial Internet. After observing transmissions for some time, we have established that our cosmic neighbors use a markup language that is notably different from HTML. In particular, it is not strictly hierarchical, an element may extend past the closing of the element in which it was opened. We want to build a javascript component that will translate AML into HTML.

About AML

Like HTML, AML has matched pairs of opening and closing elements, indicating that the text between opening and closing elements should have a particular text effect applied. All AML markup elements begin with a caret (^), optionally are followed by an exclamation point indicating it is a closing element, and are followed by a single character effect type indicator. For a string to be valid AML, all elements that are opened must be closed before the end of the document, and bare caret (^) characters (not part of a markup element) are not permitted.

Unlike HTML, AML elements that are opened within a different AML effect do not need to be enclosed by that effect.

**Ok:** ^~ Greetings ^% Earthling. ^!% ^!~

**Also Ok:** ^~ Greetings ^% Earthling. ^!~ How are you? ^!%

However, a single AML tag cannot be opened twice without being closed.

**Not Ok:** ^~ Greetings ^~ Earthling. ^!~ ^!~

The two AML elements identified so far are summarized in the following table:

| **Text Effect** | **Element Opening** | **Element Close** |
| --- | --- | --- |
| **Strong** | ^% | ^!% |
| _Emphasis_ | ^~ | ^!~ |

For example, the AML:

Greetings ^%from ^~Glornix^!% Beta-Nine^!~.

Would be rendered as:

Greetings **from**  **Glornix** _Beta-Nine_.

The Task

Your task is to write a javascript file that defines a global object with a callable method named translate.

translate should take a string of valid AML as its sole argument, and return a valid HTML fragment with no wrapping elements. It is not necessary to validate the provided AML, but valid AML should result valid HTML fragments. So translating the above example into HTML with the desired text effects applied looks like the following:

var myHTML = AMLTranslator.translate("Greetings ^%from ^~Glornix^!% Beta-Nine^!~.")

and myHTML would contain the string:

Greetings <strong>from <em>Glornix</em></strong><em> Beta-Nine</em>.

Other examples:

| **AML String** | **HTML String** |
| --- | --- |
| Hello, Earth! | Hello, Earth! |
| Hello, ^%Earth^!% | Hello, <strong>Earth!</strong> |
| ^~Hello, ^%Earth!^!~ We are pleased ^~to^!% meet you.^!~ | <em>Hello, <strong>Earth!</strong></em><strong>We are pleased <em> to </em></strong><em> meet you.</em> |

We have provided you with a sample Node.js program that can be used for evaluating your translator ( [aml\_tester.js](https://drive.google.com/file/d/0B3TKNcZYei3UaG9icFBWU1hkNm5SZm1pWno3QnM1WmtrdnJN/view?usp=sharing)), read through it, we will test your result by running:

> npm install mock-browser

> node ./aml\_tester.js ./YOUR\_MODULE.js

To get started, create a javascript file that looks like the following:

var AMLTranslator = (function() {

  // YOUR CODE GOES HERE.

}());

// Make translator available via "require" in Node.js

if (module.exports) {

  module.exports = AMLTranslator

}


var AMLTranslator = (function () {
    var translate = function (input) {
        // Known AML tag translations
        var aml_to_html = {
              '^%'  : '<strong>'
            , '^!%' : '</strong>'
            , '^~'  : '<em>'
            , '^!~' : '</em>'
        };


        //  aml_regex       =  (content)(open tag)(closing tag)(remaining string)
        var aml_regex       = /([^\^]+)?(\^[^\^\!])?(\^\![^\^])?(.*)/;
        var remaining_input = input;
        var opened_aml_tags = [];
        var html_result     = "";

        while ( remaining_input !== "" ) {
            var regex_matches = aml_regex.exec(remaining_input);

            var content     = regex_matches[1];
            var open_tag    = regex_matches[2];
            var closing_tag = regex_matches[3];
            remaining_input = regex_matches[4];

            if ( content ) {
                html_result += content;
            }

            if ( open_tag ) {
                html_result += aml_to_html[open_tag];
                opened_aml_tags.push(open_tag);
            }

            if ( closing_tag ) {
                var index          = opened_aml_tags.length - 1;
                var opened_aml_tag = opened_aml_tags[index];

                // In HTML, close the child elements
                while ( opened_aml_tag !== closing_tag.replace('!', "") ) {
                    var child_aml_closing_tag = opened_aml_tag.substr(0, 1) + '!' + opened_aml_tag.substr(1, 2);

                    html_result += aml_to_html[ child_aml_closing_tag ];

                    index--;
                    opened_aml_tag = opened_aml_tags[index];
                }

                // Close target element and remove from stack
                opened_aml_tags.splice(index, 1);
                html_result += aml_to_html[ closing_tag ];

                // In HTML, re-open the child elements
                while ( index < opened_aml_tags.length ) {
                    html_result += aml_to_html[ opened_aml_tags[index] ];
                    index++;
                }
            }
        }

        return html_result;
    };


    return { translate : translate };
})();


if (module.exports) {
    module.exports = AMLTranslator;
}

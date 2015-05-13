
module.exports = {

  /* -------- UTILITY FUNCTIONS -------- */

  // combines js objects to create a single new objext
  extend: function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    });
    return target;
  },

  // returns true if a value is an array
  is_array: function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },


  // returns a date a given number of days from a given date
  future_days: function (theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  },

  // strips dollar sign (future general currency symbols and punctuation) from a given string
  strip_dollars: function (str){
    return str.replace("$","");
  },

  // transform string to uppercase
  uppercase: function (string){
    if (string){
      return string.toUpperCase();
    }else{
      return "";
    }
  },

  // capitalize first character of (every word?) of a given string
  capitalize: function (string){
    if (string){
      return string.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase() });
    }else{
      return "";
    }
  },

  // add commas, i think?
    // prob similar to php's number_format()
  number_format: function (string){
    if (string){
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return "";
    }
  },

  // truncate a given string to a given number of characters
  truncate_string: function (str, length) {
   return str.length > length ? str.substring(0, length - 3) + '...' : str
  },

  // generate url-safe title string from a given text string
  url_title: function (text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')         // replace spaces with -
      .replace(/[^\w\-]+/g, '')     // remove all non-word chars
      .replace(/\-\-+/g, '-')       // replace multiple - with single -
      .replace(/^-+/, '')           // trim from start of text
      .replace(/-+$/, '');          // trim from end of text
  },

  // generate a hash-like alphanumeric token with a given number of characters
  generate_token: function (length){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < length; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  },

  // add http:// if not in string
  url_validate: function (string){
      if (string.indexOf("http://") > -1){
        var o = string;
      }else{
        var o = "http://" + string;
      }
    return o;
  },

  // handle errors
    // future: write to a log or something
  handle_error: function (err){
    console.log(err);
  },





  /* -------- UTILITY FUNCTIONS -------- */

  // return raw date obj as "m/d/YYYY - h:m am/pm"
  format_timestamp: function(date){
    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var o = months[date.getMonth()] +'/'+ date.getDate() +'/'+ date.getFullYear();
    var hr = date.getHours();
    var ampm = hr < 12 ? "am" : "pm";
    if (hr > 12) {
        hr -= 12;
    } else if (hr === 0) {
       hr = 12;
    }
    var min = date.getMinutes();
    if (min < 10){
      min = "0" + min;
    }
    o += ' - '+ hr +':'+ min + ampm;
    return o;
  },

  // return raw date obj as m/d/YYYY
  format_date_edit: function(date){
    if (date){
      var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      var o = months[date.getMonth()] +'/'+ date.getDate() +'/'+ date.getFullYear();
      return o;
    }
    return false;
  },

  // return given number calculated to given number of decimal places
  to_fixed: function (number, decimals){
    // fixit: cast as number
    return number.toFixed(decimals);
  },

  // transform line breaks to "<br />"
  nl2br: function (text){
    var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2');
    return nl2br;
  },

  // return true(/false) if this item is(/is not) in the array
  in_array: function(haystack, needle, options){
    if (haystack.indexOf(needle) > -1) {
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  },

  // return true if the first thing equals either the second or third thing
  if_either: function(v1, v2, v3, options){
    if (v1 === v2 || v1 === v3){
      return options.fn(this);
    }
    return options.inverse(this);
  },

  // basic comparison operators
    // will also show if the first thing is contained within the second thing (even it's CSV)
  is: function(left, operator, right, options){
    var operators, result;
    if (arguments.length < 3) {
      throw new Error("'is' needs 2 parameters");
    }
    if (options === undefined) {
      options = right;
      right = operator;
      operator = "===";
    }
    operators = {
      '==': function (l, r) { return l == r; },
      '===': function (l, r) { return l === r; },
      'not': function (l, r) { return l != r; },
      '!=': function (l, r) { return l != r; },
      '!==': function (l, r) { return l !== r; },
      '<': function (l, r) { return l < r; },
      '>': function (l, r) { return l > r; },
      '<=': function (l, r) { return l <= r; },
      '>=': function (l, r) { return l >= r; },
      'typeof': function (l, r) { return typeof l == r; },
      'in': function (l, r) { if ( ! module.exports.is_array(r)) { r = r.split(','); } return r.indexOf(l) > -1; }
    };
    if (!operators[operator]) {
      throw new Error("Unknown operator " + operator);
    }
    result = operators[operator](left, right);
    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }


};

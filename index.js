module.exports = {

  utilities: {

    extend: function(target) {
      var sources = [].slice.call(arguments, 1);
      sources.forEach(function (source) {
        for (var prop in source) {
          target[prop] = source[prop];
        }
      });
      return target;
    }

  },

  handlebars: {

    ifCond: function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
    },
    if_either: function(v1, v2, v3, options){
      if (v1 === v2 || v1 === v3){
        return options.fn(this);
      }
      return options.inverse(this);
    },
    in_array: function(haystack, needle, options){
      if (haystack.indexOf(needle) > -1) {
        return options.fn(this);
      }else{
        return options.inverse(this);
      }
    },
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

      o+= ' - '+ hr +':'+ min + ampm;

      return o;
    },
    format_date_edit: function(date){
      if (date){
        var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var o = months[date.getMonth()] +'/'+ date.getDate() +'/'+ date.getFullYear();
        return o;
      }
      return false;
    },
    format_date_breeding: function(date){
      if (date){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var o = months[date.getMonth()] +' '+ date.getFullYear();
        return o;
      }
      return false;
    },
    format_date_birthday: function(date){
      if (date){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var o = months[date.getMonth()] +' '+ date.getDate() +', '+ date.getFullYear();
        return o;
      }
      return false;
    },
    to_fixed: function (number, decimals){
      // fixit cast as number
      return number.toFixed(decimals);
    }, nl2br: function (text){
      var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
      return new handlebars.SafeString(nl2br);
    }

  }

};

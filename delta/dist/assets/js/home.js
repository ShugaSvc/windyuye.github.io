function countTo(json,field) {
      let c = $("h4#" + field);
      let w = c.innerWidth();
      let formatter = function(value, options) {
        let fontSize = w/6;
        if (value > 10000000000) {
          fontSize = w/7.3;
        } else if (value > 1000000000) {
          fontSize = w/6.7;
        }
        return '<span style="font-size: '+fontSize+'px">' + value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + "</span>";
      };
      c.data("to",json[field]).countTo({formatter});
    }
    $( document ).ready( function () {
      $.ajax({
        dataType: "json",
        url: 'data/index-numbers.json?_=' + new Date().getTime()
      }).done(function(json) {
         countTo(json,"shuga");
         countTo(json,"candie");
         countTo(json,"walkIn");
      })
    });


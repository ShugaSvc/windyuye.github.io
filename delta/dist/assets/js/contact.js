    $( document ).ready( function () {
      $(".shuga-form").on('submit',function(event) {
        event.preventDefault();
	let form = $(this);
        let url = form.attr('action');
        let data = form.serializeArray().reduce((a,c)=>{
          a[c.name]=c.value;
          return a;
	},{});
        if (data.phone) {
          data.message = 'phone: ' + data.phone + "\n" + data.message;
        }
        $.ajax({
           type: "POST",
           url: url,
           contentType: "application/json; charset=utf-8",
           data: JSON.stringify(data),
         }).done(function(response) {
           console.log(response);
	   window.location='ty.html';
	 });
      });
    });

